import axios from 'axios';
import { apiFarmageo } from '../../config';

export const GET_CAMPANAS = () => {
  return (dispatch) => {
    axios
      .get(apiFarmageo + '/campana/activas')
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
