import axios from "axios";
import { apiFarmageo, apiFarmageoSql } from "../../config";


import "../../helpers/requestParser";

export const GET_FARMACIAS = (token) => {
  return (dispatch) => {
    axios
      .get(apiFarmageo + "/farmacias", {})
      .then(function (response) {
        dispatch({
          type: "GET_FARMACIAS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const SOLICITUD_REGISTRO_FARMACIA = (solicitud) => {
  var emailFarmacia = solicitud.email;
  var html = `
      <p>Farmacia:<b> ${solicitud.nombre}</b></p>
      <p>Farmacéutico: <b> ${solicitud.nombrefarmaceutico}</b></p>
      <p>Matrícula: <b> ${solicitud.matricula}</b></p>
      <p>Dirección: <b> ${solicitud.calle} ${solicitud.numero} ${solicitud.localidad} </b></p>
      <p>CP: <b> ${solicitud.cp}</b></p>
      <p>Teléfono: <b> ${solicitud.telefono}</b></p>
      <p>Email: <b> ${solicitud.email}</b></p>
      `;

  return axios
    .post(apiFarmageoSql + "/pedidos/email", {
      destinatario:
        emailFarmacia + ";" +
        process.env.REACT_APP_EMAIL_COORDINADOR + ";" +
        process.env.REACT_APP_EMAIL_COMERCIAL,
      asunto: "Solicitud de registro Farmageo",
      html: html,
      titulo: "Nueva solicitud de registro de farmacia"
    })
    .then(function (response) {
      console.log(response);
      return true;
    })
    .catch(function (error) {
      console.log(error);
      alert("Ha ocurrido un error, intente por favor más tarde.");
      return false;
    });
};

export const ARREPENTIMIENTO_COMPRA = (solicitud) => {
  var emailFarmacia = solicitud.email;
  var html = `
      <p>Email: <b> ${solicitud.email}</b></p>
      <p>Nombre: <b> ${solicitud.nombre}</b></p>
      <p>Apellido: <b> ${solicitud.apellido}</b></p>
      <p>N° pedido: <b> ${solicitud.pedido}</b></p>
      <p>CP: <b> ${solicitud.razonarrepentimiento}</b></p>
      `;

  return axios
    .post(apiFarmageoSql + "/pedidos/email", {
      destinatario:
        emailFarmacia + ";" +
        process.env.REACT_APP_EMAIL_COORDINADOR + ";" +
        process.env.REACT_APP_EMAIL_COMERCIAL,
      asunto: "Arrepentimiento de compra",
      html: html,
      titulo: 'Arrepentimiento de compra',
    })
    .then(function (response) {
      console.log(response);
      return true;
    })
    .catch(function (error) {
      console.log(error);
      alert("Ha ocurrido un error, intente por favor más tarde.");
      return false;
    });
};