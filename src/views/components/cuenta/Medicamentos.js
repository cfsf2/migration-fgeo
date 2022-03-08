import React, { Component } from "react";
import "../../../css/farmacias.css";
import { connect } from "react-redux";

class Medicamentos extends Component {
  render() {
    return <div>Medicamentos ?</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Medicamentos);
