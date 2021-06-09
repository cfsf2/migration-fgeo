import React, { Component } from "react";
import { connect } from "react-redux";
import { OBTENER_POSICION_ACTUAL_MAP } from "../../redux/actions/UsuarioActions";

const UbicacionActualFarmacias = (props) => {
  const handleCheckbox = (e) => {
    props.handleActualUbication(e.target.checked)
  }
  return (
    <label className="switch ml-3">
      <input
        checked={props.actualValue}
        type="checkbox"
        onChange={e => handleCheckbox(e)}
      />
      <span className="slider round"></span>
    </label>
  );
}


const mapStateToProps = (state) => { };
const mapDispatchToProps = {
  OBTENER_POSICION_ACTUAL_MAP
};
export default connect(mapStateToProps, mapDispatchToProps)(UbicacionActualFarmacias);
