import axios from 'axios';
import { apiFarmageo } from '../../config';

export const GET_CAMPANAS = (idUsuario) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    return axios
      .get(apiFarmageo + '/campana/activas', {
        params: {
          idUsuario: idUsuario,
        },
      })
      .then((response) => {
        dispatch({
          type: 'CAMPANAS_ACTIVAS',
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const NUEVO_REQUERIMIENTO = ({
  id_campana,
  id_usuario,
  id_farmacia,
  celular,
}) => {
  return (dispatch) => {
    return axios
      .post(apiFarmageo + '/campana/nuevoRequerimiento', {
        id_campana,
        id_usuario,
        id_farmacia,
        celular,
      })
      .then((res) => null)
      .catch((err) => console.log(err));
  };
};
