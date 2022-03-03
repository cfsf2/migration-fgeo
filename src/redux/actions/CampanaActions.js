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
