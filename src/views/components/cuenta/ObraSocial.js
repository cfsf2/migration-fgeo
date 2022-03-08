import React, { Component } from "react";
import "../../../css/farmacias.css";
import { connect } from "react-redux";

class ObraSocial extends Component {
  render() {
    return <div>Obra Social</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ObraSocial);
