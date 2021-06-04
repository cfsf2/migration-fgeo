import React, { Component } from "react";
import { connect } from "react-redux";
import { OBTENER_POSICION_ACTUAL } from "../../redux/actions/UsuarioActions";

class UbicacionActual extends Component {
  render() {
    return (
      <label className="switch ml-3">
        <input
          type="checkbox"
          onChange={() => this.props.OBTENER_POSICION_ACTUAL()}
        />
        <span className="slider round"></span>
      </label>
    );
  }
}

const mapStateToProps = (state) => {};
const mapDispatchToProps = {
  OBTENER_POSICION_ACTUAL,
};
export default connect(mapStateToProps, mapDispatchToProps)(UbicacionActual);
