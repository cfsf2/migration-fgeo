import React, { Component } from "react";
import "../../../css/farmacias.css";
import { connect } from "react-redux";
import { Col, Row, Container } from "reactstrap";

class MiPanelDeControl extends Component {
  render() {
    const { auth, user_farmageo } = this.props.UsuarioReducer;
    return !user_farmageo || !auth ? null : (
      <Container style={{ backgroundColor: "#F4F4F4" }} className="p-4">
        <Row>
          <Col md="4" align="center">
            PANEL DE CONTROL
          </Col>
          <Col md="8">
            <Row>
              <Col md="4"></Col>
              <Col md="8" align="left" style={{ lineHeight: 0.8 }}>
                <Row>
                  <Col sm="6">
                    <label for="nombre">
                      Nombre<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      style={{
                        display: "block",
                        backgroundColor: "transparent",
                      }}
                      value={user_farmageo.name ? user_farmageo.name : null}
                    />
                  </Col>
                  <Col sm="6">
                    <label for="apellido">
                      Apellido<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="apellido"
                      style={{
                        display: "block",
                        backgroundColor: "transparent",
                      }}
                      value={
                        user_farmageo.apellido
                          ? " " + user_farmageo.apellido
                          : null
                      }
                    />
                  </Col>
                </Row>
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

export default connect(mapStateToProps, null)(MiPanelDeControl);
