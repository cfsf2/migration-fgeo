import React, { Component } from "react";
import "../../../css/farmacias.css";
import { connect } from "react-redux";
import { Col, Row, Container } from "reactstrap";

class MiCuenta extends Component {
  render() {
    const { auth, user_farmageo } = this.props.UsuarioReducer;
    return !user_farmageo || !auth ? null : (
      <Container style={{ backgroundColor: "#F4F4F4" }} className="p-4">
        <Row>
          <Col md="4" align="center">
            INFORMACIÓN DE MI CUENTA
          </Col>
          <Col md="8">
            <Row>
              <Col md="4"></Col>
              <Col md="8" align="left" style={{ lineHeight: 0.8 }}>
                <p>
                  <b>Información de contacto</b>
                </p>
                <p>
                  {user_farmageo.name ? user_farmageo.name.toUpperCase() : null}
                  {user_farmageo.apellido
                    ? " " + user_farmageo.apellido.toUpperCase()
                    : null}
                </p>
                <p>{user_farmageo.email ? user_farmageo.email : null}</p>
                <a
                  href={process.env.PUBLIC_URL + "/#/usuarioconfig"}
                  className="text-info"
                >
                  Editar
                </a>{" "}
                |{" "}
                <a
                  href={process.env.PUBLIC_URL + "/#/usuarioconfig"}
                  className="text-info"
                >
                  Cambiar la contraseña
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UsuarioReducer: state.UsuarioReducer,
  };
};

export default connect(mapStateToProps, null)(MiCuenta);
