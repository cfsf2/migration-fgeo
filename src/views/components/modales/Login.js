import React, { useState } from "react";
import { connect } from "react-redux";
import { LOGIN } from "../../../redux/actions/UsuarioActions";
import ReactGA from "react-ga";

function Login(props) {
  const [usuario, setusuario] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = () => {
    props.LOGIN(usuario, password);
    ClickHandler();
  };

  const ClickHandler = () => {
    ReactGA.event({
      category: "Login",
      action: "Nuevo login",
    });
  };

  const { auth } = props.UsuarioReducer;

  return auth ? null : (
    <div className="modal" id="alert-login">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div style={{ float: "right" }}>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" align="left">
            <div className="alerta">
              <h4>
                <b>Ingresar</b>
              </h4>
              <p>
                Si tiene una cuenta, inicie sesión con su correo electrónico
              </p>
              <div className="row">
                <div className="col-sm-6">
                  Correo electrónico<span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    onChange={(e) => setusuario(e.nativeEvent.target.value)}
                    value={usuario}
                  />
                </div>
                <div className="col-sm-6">
                  Contraseña<span className="text-danger">*</span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    onChange={(e) => setpassword(e.nativeEvent.target.value)}
                    value={password}
                  />
                  <a href="" align="right">
                    olvidó su contraseña
                  </a>
                </div>
              </div>
              <button
                className="btn btn-info"
                onClick={handleSubmit}
                disabled={usuario == "" || password == ""}
                data-dismiss="modal"
                aria-label="Close"
              >
                Iniciar sesión
              </button>
              <p align="right">
                ¿Sos nuevo?
                <a onClick={{}} href="">Registrate acá</a>
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {
  LOGIN,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
