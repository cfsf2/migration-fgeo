import axios from "axios";
import { apiFarmageo, authFarmageo } from "../../config";
import { RECUPERAR_PEDIDO } from "./PedidosActions";
var geocoder = require("geocoder-fr");

export const LOGIN = (username, password) => {
  return (dispatch) => {
    axios
      .post(
        authFarmageo + "/wp-json/jwt-auth/v1/token",
        {
          username: username.toLowerCase(),
          password,
        },
        { timeout: 10000 }
      )
      .then(function (response) {
        if (response.data.token != null) {
          dispatch(
            VALIDATE_TOKEN(
              response.data.token,
              response.data,
              username,
              password
            )
          );
        } else {
          alert("Ha ocurrido un error");
          dispatch({
            type: "TOKEN_INVALID",
          });
        }
      })
      .catch((error) => {
        if (error.message) {
          alert("Usuario o password incorrectos");
          dispatch({
            type: "TOKEN_INVALID",
          });
        }
      });
  };
};

export const VALIDATE_TOKEN = (token, usuario, username, password) => {
  return (dispatch) => {
    axios
      .post(
        authFarmageo + "/wp-json/jwt-auth/v1/token/validate",
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        if (response.status == "200") {
          var nombreCompleto = usuario.user_display_name.split(" ");
          var _user = {
            email: usuario.user_email,
            first_name: nombreCompleto[0],
            last_name: nombreCompleto[1],
            roles: usuario.user_rol,
            username: usuario.user_email,
          };
          var first_name = _user.first_name;
          storeLogin({ username, password, first_name }, token);
          dispatch(GET_USER_API_FARMAGEO(usuario.user_email, token));
        } else {
          dispatch({
            type: "TOKEN_INVALID",
          });
        }
      })
      .catch((error) => {
        if (error.message) {
          dispatch({
            type: "TOKEN_INVALID",
          });
        }
      });
  };
};

export const GET_USER_API_FARMAGEO = (username, token) => {
  return (dispatch) => {
    var _username = username.toLowerCase();
    axios
      .get(apiFarmageo + "/users/" + _username, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(async function (response) {
        if (response.data.habilitado) {
          dispatch({
            type: "GET_USER_API_FARMAGEO",
            payload: { user: response.data, token },
          });
        } else {
          alert("La cuenta ha sido suspendida");
          //dispatch(LOGOUT(navigation));
        }
      });
  };
};

export const GET_AUTH = () => {
  return async (dispatch) => {
    try {
      var _login = await localStorage.getItem("storeLogin");
      var data = JSON.parse(_login);

      if (data !== null) {
        dispatch(LOGIN(data.username, data.password));
        dispatch(RECUPERAR_PEDIDO());
        return true;
      } else {
        //dispatch(LOGOUT(navigation));
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const ELEGIR_LOCALIDAD = (localidad) => {
  return async (dispatch) => {
    dispatch({
      type: "ELEGIR_LOCALIDAD",
      payload: localidad,
    });
    await sessionStorage.setItem("ubicacion_default", localidad);
  };
};

export const ELEGIR_FARMACIA = (farmacia) => {
  return (dispatch) => {
    dispatch({
      type: "ELEGIR_FARMACIA",
      payload: farmacia,
    });
    console.log(farmacia);
  };
};

export const OBTENER_POSICION_ACTUAL = () => {
  console.log("OBTENER_POSICION_ACTUAL...");
  return (dispatch) => {
    if (!navigator.geolocation) {
      alert("<p>Geolocation is not supported by your browser</p>");
      return;
    }

    async function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      axios
        .get(
          "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
            latitude +
            "&longitude=" +
            longitude +
            "&localityLanguage=es"
        )
        .then(async function (response) {
          dispatch({
            type: "OBTENER_POSICION_ACTUAL",
            payload: response.data,
          });
        });
    }

    function error() {
      return false;
    }
    navigator.geolocation.getCurrentPosition(success, error);
  };
};

const storeLogin = async (data, token) => {
  try {
    await localStorage.setItem("storeLogin", JSON.stringify(data));
    await localStorage.setItem("token", token);
  } catch (error) {
    console.log(error);
  }
};

export const LOGOUT = () => {
  return async (dispatch) => {
    await localStorage.removeItem("storeLogin");
    await localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = `${process.env.PUBLIC_URL}/#/`;
  };
};
