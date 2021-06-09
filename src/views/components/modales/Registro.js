import React, { Component, useState } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import { ALTA_USUARIO } from "../../../redux/actions/RegistroActions";

function Registro(props) {
  const [newsletter, setnewsletter] = useState(false);
  const [user, setuser] = useState({});
  const [validacion_ok, setvalidacion_ok] = useState(false);
  const [error, seterror] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user.password === user.password_repeat) {
      await props.ALTA_USUARIO({ ...user, newsletter: newsletter });
    } else {
      seterror("La contraseña no coincide");
    }
  };

  const handleInputChange = async (event) => {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    await setuser({ ...user, [target.name]: value });
    validarCampos();
  };

  const validarCampos = () => {
    if (
      user.first_name !== "" &&
      user.lastname !== "" &&
      user.password !== "" &&
      user.password_repeat !== "" &&
      user.fechaNac !== "" &&
      user.dni !== "" &&
      user.email !== "" &&
      user.terminos !== false
    ) {
      setvalidacion_ok(true);
    } else {
      setvalidacion_ok(false);
    }
  };

  return (
    <div className="modal" id="alert-registro">
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
                <b>Registrarme</b>
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="form-row mt-3">
                  <div className="col-md-6 mb-3 pr-3">
                    Nombre<span className="text-danger">*</span>
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3 pr-3">
                    Apellido<span className="text-danger">*</span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                      name="last_name"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 mb-3 pr-3">
                    DNI<span className="text-danger">*</span>
                    <NumberFormat
                      format="########"
                      className="form-control"
                      onChange={handleInputChange}
                      name="dni"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3 pr-3">
                    Fecha de nacimiento<span className="text-danger">*</span>
                    <input
                      type="date"
                      className="form-control"
                      onChange={handleInputChange}
                      name="fechaNac"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 mb-3 pr-3">
                    Correo electrónico<span className="text-danger">*</span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                      name="email"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3 pr-3">
                    Contraseña<span className="text-danger">*</span>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleInputChange}
                      name="password"
                      minLength="7"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 mb-3 pr-3">
                    Confirmar contraseña<span className="text-danger">*</span>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleInputChange}
                      name="password_repeat"
                      style={{
                        backgroundColor:
                          user.password && user.password_repeat
                            ? user.password === user.password_repeat
                              ? "#b3feb3"
                              : "#ffd4d4"
                            : null,
                      }}
                      minLength="7"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3 pr-3">
                    <div className="row">
                      <div className="col-1">
                        <input
                          type="checkbox"
                          className="mx-1"
                          name="terminos"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col">
                        Aceptar los Términos de uso y Políticas de privacidad
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-info"
                  //data-dismiss={state.validacion_ok ? "modal" : ""}
                  disabled={!validacion_ok}
                >
                  Crear cuenta
                </button>
                <p align="right">
                  Si tenes una cuenta <span style={{cursor:"pointer",color:'#138496'}} data-toggle="modal" data-dismiss="modal" data-target="#alert-login" > Ingresá acá </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = { ALTA_USUARIO };

export default connect(null, mapDispatchToProps)(Registro);
