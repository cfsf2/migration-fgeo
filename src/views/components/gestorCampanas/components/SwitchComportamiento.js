import React from "react";
import { connect } from "react-redux";
import CapturaWs from "./CapturaWs";

export function SwitchComportamiento(
  { codigo, campana, UsuarioReducer, CampanaReducer },
  props
) {
  const orientados = campana.orientados.map((orientado) => orientado.nombre);
  switch (true) {
    case CampanaReducer.loading:
      return null;

    case codigo === "captura_ws" && orientados.includes("usuario_farmageo_web"):
      if (UsuarioReducer.auth) {
        return <CapturaWs campana={campana} />;
      }
      return null;

    case codigo === "captura_ws" &&
      orientados.includes("usuario_farmageo_noreg"):
      return <CapturaWs campana={campana} />;

    case "nada":
      return null;

    default:
      return null;
  }
}

const mapStateToProps = (state) => {
  return {
    UsuarioReducer: state.UsuarioReducer,
    CampanaReducer: state.CampanaReducer,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchComportamiento);
