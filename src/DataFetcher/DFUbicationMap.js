import axios from "axios";

import { apiFarmageoSql } from "../config";

const apiClientInstance = axios.create({
    baseURL: apiFarmageoSql,
    timeout: 10000,
})

export const getAllCitys = () =>
    apiClientInstance.post('farmacia/localidades').then((r) => {
        return r.data
    })

export const getLatLong = async (id) => {
    return await apiClientInstance.get(`localidades?id=${id}&campos=estandar&max=1`).then((r) => {
        return r.data
    })
}
export const getCurrentCity = (lat,lon) =>
    apiClientInstance.get(`ubicacion?lat=${lat}&lon=${lon}`).then((r) => {
        return r.data
    })

// export const getActualUbicationMap = () => {

//     {
//       if (!navigator.geolocation) {
//         alert("<p>Geolocation is not supported by your browser</p>");
//         return;
//       }

//       async function success(position) {
//         var latitude = position.coords.latitude;
//         var longitude = position.coords.longitude;
//         axios
//           .get(
//             "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
//             latitude +
//             "&longitude=" +
//             longitude +
//             "&localityLanguage=es"
//           )
//           .then(async function (response) {
//             if(response.data.city){
//               // localStorage.setItem("ubicacion_maps", response.data);
//             }

//             dispatch({
//               type: "OBTENER_POSICION_ACTUAL",
//               payload: response.data,
//             });
//           });
//       }

//       function error() {
//         return false;
//       }
//       navigator.geolocation.getCurrentPosition(success, error);
//     };
//   };
