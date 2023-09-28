import axios from "axios";
import { apiFarmageo } from "../../config";

export const GET_CAMPANAS = (idUsuario) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    return axios
      .get(apiFarmageo + "/campana/activas", {
        params: {
          idUsuario: idUsuario,
        },
      })
      .then((response) => {
        dispatch({
          type: "CAMPANAS_ACTIVAS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const NUEVO_REQUERIMIENTO = (body) => {
  return (dispatch) => {
    return axios
      .post(apiFarmageo + "/campana/nuevoRequerimiento", body)
      .then((res) => null)
      .catch((err) => console.log(err));
  };
};
