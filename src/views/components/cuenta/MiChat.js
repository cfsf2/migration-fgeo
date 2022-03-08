import React, { Component } from "react";
import "../../../css/farmacias.css";
import { connect } from "react-redux";

class MiChat extends Component {
  render() {
    return <div>Mi chat ?</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MiChat);
