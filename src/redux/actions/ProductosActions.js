import axios from "axios";
import { apiFarmageo } from "../../config";

export const GET_PRODUCTOS_PACK_BY_ENTIDAD = (entidad) => {
  return (dispatch) => {
    axios
      .get(apiFarmageo + "/productospack/entidad/" + entidad)
      .then(function (response) {
        dispatch({
          type: "GET_PRODUCTOS_PACK",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_PRODUCTOS_PACK = () => {
  return (dispatch) => {
    axios
      .get(apiFarmageo + "/productospack")
     // .get(apiFarmageo + "/productospack/pruebas") //
      .then(function (response) {
        dispatch({
          type: "GET_PRODUCTOS_PACK",
          payload: response.data,
        });
        console.log("GET_PRODUCTOS_PACK");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_ENTIDADES = () => {
  return (dispatch) => {
    axios
      .get(apiFarmageo + "/entidades")
      .then(function (response) {
        dispatch({
          type: "GET_ENTIDADES",
          payload: response.data.filter((e) => {
            return e._id !== "5f4ad6ef84729400013dbecd";
          }), //Excluyo a mutual
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_CATEGORIAS = () => {
  return (dispatch) => {
    axios
      .get(apiFarmageo + "/categorias")
      .then(function (response) {
        dispatch({
          type: "GET_CATEGORIAS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const SET_CATEGORIA = (categoriaID) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CATEGORIA",
      payload: categoriaID,
    });
  };
};
