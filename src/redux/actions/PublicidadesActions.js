import axios from "axios";
import { apiFarmageo } from "../../config";

export const GET_PUBLICIDADES = () => {
  return (dispatch) => {
    axios
      .get(apiFarmageo + "/publicidades")
      .then(function (response) {
        dispatch({
          type: "GET_PUBLICIDADES",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

