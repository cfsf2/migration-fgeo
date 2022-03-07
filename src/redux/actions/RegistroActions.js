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

export const ALTA_USUARIO_SUBMIT = (user) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiFarmageo + "/users/alta-usuario-web", {
          username: user.email.toLowerCase(),
          password: user.password,
          name: user.first_name,
          apellido: user.last_name,
          email: user.email,
          usuario: user.email,
          telefono: user.telefono,
          caracteristica: user.caracteristica,
        })
        .then((response) => {
          if (response.status === 201) {
            dispatch({
              type: "USER_LOGIN_SUCCESS",
              payload: {
                user: {
                  email: response.data.email,
                  first_name: response.data.first_name,
                  last_name: response.data.last_name,
                  roles: response.data.roles,
                  username: response.data.username,
                  password: user.password,
                  token: response.data.token,
                  telefono:
                    user.telefono.toString() + user.caracteristica.toString(),
                },
              },
            });
            dispatch(LOGIN(response.data.email, user.password));

            resolve();

            //window.location.href = `${process.env.PUBLIC_URL}`;
            //alert("Se ha registrado con éxito");
          }
        })
        .catch((error) => {
          if (error.response?.status === 409) {
            dispatch({
              type: "ALTA_USUARIO_ERROR",
            });

            return alert(error.response.data);
          }
          console.log(error);
          alert("Ha ocurrido un error");
        });
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

          window.location.href = `${process.env.PUBLIC_URL}`;
        } else {
        }
      })
      .catch((error) => {
        if (error.message) {
          console.log(error.message);
        }
      });
  };
};
