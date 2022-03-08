import React, { Component } from "react";
import "../../../css/farmacias.css";
import FooterHome from "../footers/FooterHome";
import Suscribite from "../home/Suscribite";

import { connect } from "react-redux";
import MiCuenta from "./MiCuenta";
import MiChat from "./MiChat";
import MiPanelDeControl from "./MiPanelDeControl";
import MisPedidos from "./MisPedidos";
import Direcciones from "./Direcciones";
import Medicamentos from "./Medicamentos";
import ObraSocial from "./ObraSocial";

import { LOGOUT } from "../../../redux/actions/UsuarioActions";

const navItems = [
  "Mi cuenta",
  "Mi chat",
  "Panel de control",
  "Mis pedidos",
  "Mis direcciones",
  "Medicamentos",
  "Obra Social",
];

class UsuarioConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navActive: 0,
    };
    this.handleNav = this.handleNav.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleNav = () => {
    switch (this.state.navActive) {
      case 0:
        return <MiCuenta />;
      case 1:
        return <MiChat />;
      case 2:
        return <MiPanelDeControl />;
      case 3:
        return <MisPedidos />;
      case 4:
        return <Direcciones />;
      case 5:
        return <Medicamentos />;
      case 6:
        return <ObraSocial />;
      default:
        return <MiCuenta />;
    }
  };
  handleLogout() {
    this.props.LOGOUT();
  }

  render() {
    const { navActive } = this.state;
    const { auth } = this.props.UsuarioReducer;
    return auth ? (
      <>
        <div className="container-fluid my-5 ">
          <div className="row centrado">
            <div className="col-sm-3" align="left">
              <h4 className="text-info">Mi Panel de Control</h4>
              {navItems.map((item, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => this.setState({ navActive: i })}
                    style={{
                      display: "block",
                      backgroundColor: "transparent",
                      border: "none",
                      outlineStyle: "none",
                      fontWeight: navActive === i ? "bold" : "normal",
                      padding: 0,
                    }}
                  >
                    {item}
                  </button>
                );
              })}
              <button
                onClick={this.handleLogout}
                style={{
                  display: "block",
                  backgroundColor: "transparent",
                  border: "none",
                  outlineStyle: "none",
                  padding: 0,
                }}
              >
                Salir
              </button>
            </div>
            <div className="col-sm-8">{this.handleNav()}</div>
          </div>
        </div>
        <Suscribite />
        <FooterHome />
      </>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {
  LOGOUT,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioConfig);
