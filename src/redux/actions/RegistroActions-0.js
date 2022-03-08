import axios from "axios";
import { apiFarmageo, authFarmageo } from "../../config";
import { LOGIN } from "./UsuarioActions";

export const ALTA_USUARIO = (user) => {
  return (dispatch) => {
    axios
      .post(apiFarmageo + "/users/token", {}, { timeout: 5000 })
      .then((response) => {
        if (response.data.token != null) {
          dispatch(ALTA_USUARIO_SUBMIT(response.data.token, user));
          //  console.log(response.data);
        }
      })
      .catch((error) => {
        //console.log(error);
        if (error.message) {
          dispatch({
            type: "ALTA_USUARIO_ERROR",
          });
        }
      });
  };
};

export const ALTA_USUARIO_SUBMIT = (token, user) => {
  return (dispatch) => {
    axios
      .post(
        authFarmageo + "/wp-json/wp/v2/users",
        {
          username: user.email.toLowerCase(),
          password: user.password,
          name: user.first_name,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          roles: ["usuario"],
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*"
          },
        }
      )
      .then((response) => {
        // console.log(response)
        if (response.status == "201") {
          dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: {
              token,
              user: {
                email: response.data.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                id_wp: response.data.id,
                roles: response.data.roles,
                username: response.data.username,
                password: user.password,
              },
            },
          });
          dispatch(
            ALTA_USER_API_FARMAGEO({
              ...user,
              password: user.password,
              id_wp: response.data.id,
            })
          );
          //alert("Se ha registrado con éxito");
        } else {
          dispatch({
            type: "ALTA_USUARIO_ERROR",
          });
          alert("Ha ocurrido un error");
        }
      })
      .catch((error) => {
        if (error.message) {
          dispatch({
            type: "ALTA_USUARIO_ERROR",
          });
          alert("Ha ocurrido un error");
        }
      });
  };
};

export const ALTA_USER_API_FARMAGEO = (_user) => {
  return (dispatch) => {
    axios
      .post(
        apiFarmageo + "/users",
        {
          name: _user.first_name,
          usuario: _user.email.toLowerCase(),
          email: _user.email,
          dni: _user.dni,
          telephone: "",
          esfarmacia: false,
          newsletter: _user.newsletter,
          obras_sociales: [],
          password: _user.password,
          id_wp: _user.id_wp,
          fechaNac: _user.fechaNac,
        },
        { timeout: 10000 }
      )
      .then((response) => {
        if (response.status == "200") {
          dispatch(LOGIN(_user.email, _user.password));
          console.log("se dió de alta en api farmageo");
          window.location.href = `${process.env.PUBLIC_URL}`;
        } else {
          console.log("No se dió de alta en api farmageo");
        }
      })
      .catch((error) => {
        if (error.message) {
          console.log(error.message);
        }
      });
  };
};
