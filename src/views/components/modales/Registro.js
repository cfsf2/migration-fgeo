import React, { Component, useState } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import { ALTA_USUARIO_SUBMIT } from "../../../redux/actions/RegistroActions";
import "./formularios.css";

const userInit = {
  first_name: "",
  last_name: "",
  password: "",
  password_repeat: "",
  fechaNac: "",
  dni: "",
  email: "",
  terminos: false,
  caracteristica: "",
  telefono: "",
};

function Registro(props) {
  const [newsletter, setnewsletter] = useState(false);
  const [user, setUser] = useState(userInit);
  const [validacion_ok, setvalidacion_ok] = useState(false);
  const [error, setError] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitted(true);

    if (validarCampos()) {
      props
        .ALTA_USUARIO_SUBMIT({ ...user, newsletter: newsletter })
        .then(() => {
          document.getElementById("alert-registro").classList.add("fadeout");
          setTimeout(() => {
            setUser(userInit);
            setSubmitted(false);
            setError([]);
            document
              .getElementById("alert-registro")
              .classList.remove("fadeout");
            document.querySelector("#cerrar-registro").click();
          }, [800]);
        });
    } else {
      // setError("La contraseña no coincide");
    }
  };

  const handleInputChange = async (event) => {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setUser({ ...user, [target.name]: value });
  };

  const validarCampos = React.useCallback(() => {
    const campos = Object.keys(userInit);
    let errores = Object.keys(userInit);

    campos.forEach((campo) => {
      if (typeof user[campo] === "boolean" && user[campo] === true) {
        errores.splice(errores.indexOf(campo), 1);
      }
      if (typeof user[campo] === "string" && user[campo].trim() !== "") {
        errores.splice(errores.indexOf(campo), 1);

        if (user.caracteristica.length + user.telefono.length !== 10) {
          if (errores.indexOf("telefono") === -1) {
            errores.push("telefono");
          }
          if (errores.indexOf("caracteristica") === -1) {
            errores.push("caracteristica");
          }
        }

        if (user.password !== user.password_repeat) {
          if (errores.indexOf("password") === -1) {
            errores.push("password");
          }
          if (errores.indexOf("password_repeat") === -1) {
            errores.push("password_repeat");
          }
        }
      }
    });
    setError(errores);

    if (errores.length === 0) {
      return true;
    }
    return false;
  }, [user]);

  React.useEffect(() => {
    if (submitted) {
      validarCampos();
    }
  }, [submitted, user, validarCampos]);

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
              id="cerrar-registro"
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
                  <div className="col-md-6 mb-4 pr-3">
                    Nombre<span className="text-danger">*</span>
                    <input
                      type="text"
                      className={`form-control ${
                        error.includes("first_name") ? "registro_error" : null
                      }`}
                      name="first_name"
                      value={user.first_name}
                      onChange={handleInputChange}
                      // //required
                    />
                  </div>
                  <div className="col-md-6 mb-4 pr-3">
                    Apellido<span className="text-danger">*</span>
                    <input
                      type="text"
                      className={`form-control ${
                        error.includes("last_name") ? "registro_error" : null
                      }`}
                      onChange={handleInputChange}
                      name="last_name"
                      value={user.last_name}
                      // required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 mb-4 pr-3">
                    DNI<span className="text-danger">*</span>
                    <NumberFormat
                      format="########"
                      className={`form-control ${
                        error.includes("dni") ? "registro_error" : null
                      }`}
                      onChange={handleInputChange}
                      name="dni"
                      value={user.dni}
                      // required
                    />
                  </div>
                  <div className="col-md-6 mb-4 pr-3">
                    Fecha de nacimiento<span className="text-danger">*</span>
                    <input
                      type="date"
                      className={`form-control ${
                        error.includes("fechaNac") ? "registro_error" : null
                      }`}
                      onChange={handleInputChange}
                      name="fechaNac"
                      value={user.fechaNac}
                      // required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-6 mb-4 pr-3">
                    Correo electrónico<span className="text-danger">*</span>
                    <input
                      type="text"
                      className={`form-control ${
                        error.includes("email") ? "registro_error" : null
                      }`}
                      onChange={handleInputChange}
                      name="email"
                      value={user.email}
                      // required
                    />
                  </div>
                  <div className="col-md-6 mb-4 pr-3 position-relative">
                    Numero de Celular<span className="text-danger">*</span>
                    <div className="form-row">
                      <div className="col-4">
                        <input
                          type="number"
                          className={`form-control ${
                            error.includes("caracteristica")
                              ? "registro_error"
                              : null
                          }`}
                          onChange={handleInputChange}
                          name="caracteristica"
                          value={user.caracteristica}
                          placeholder="Caract."
                          // required
                        />
                      </div>
                      <div className="col-8">
                        <input
                          type="number"
                          className={`form-control ${
                            error.includes("telefono") ? "registro_error" : null
                          }`}
                          onChange={handleInputChange}
                          name="telefono"
                          value={user.telefono}
                          placeholder="Celular (sin 15)"
                          // required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row ">
                  <div className="col-md-6 mb-4 pr-3">
                    Contraseña<span className="text-danger">*</span>
                    <input
                      type="password"
                      className={`form-control ${
                        error.includes("password") ? "registro_error" : null
                      }`}
                      onChange={handleInputChange}
                      name="password"
                      value={user.password}
                      minLength="7"
                      //required
                    />
                  </div>
                  <div className="col-md-6 mb-4 pr-3">
                    Confirmar contraseña<span className="text-danger">*</span>
                    <input
                      type="password"
                      className={`form-control ${
                        error.includes("password_repeat")
                          ? "registro_error"
                          : null
                      }`}
                      onChange={handleInputChange}
                      name="password_repeat"
                      value={user.password_repeat}
                      style={{
                        backgroundColor:
                          user.password && user.password_repeat
                            ? user.password === user.password_repeat
                              ? "#b3feb3"
                              : "#ffd4d4"
                            : null,
                      }}
                      minLength="7"
                      //required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-6"></div>
                  <div className="col-md-6 mb-4 pr-3">
                    <div className="row">
                      <div className="col-1">
                        <input
                          type="checkbox"
                          className={`mx-1 ${
                            error.includes("terminos") ? "registro_error" : null
                          }`}
                          name="terminos"
                          onChange={handleInputChange}
                          value={user.terminos}
                          checked={user.terminos}
                          //required
                        />
                      </div>
                      <div className="col position-relative">
                        Aceptar los Términos de uso y Políticas de privacidad
                        {error.includes("terminos") ? (
                          <span
                            className="text-danger position-absolute"
                            style={{
                              top: "100%",
                              left: "15px",
                            }}
                          >
                            Debe aceptar los terminos de uso
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-info"
                  disabled={error.length !== 0}
                >
                  Crear cuenta
                </button>
                <p align="right">
                  Si tenes una cuenta{" "}
                  <span
                    style={{ cursor: "pointer", color: "#138496" }}
                    data-toggle="modal"
                    data-dismiss="modal"
                    data-target="#alert-login"
                  >
                    {" "}
                    Ingresá acá{" "}
                  </span>
                </p>
                {error.includes("telefono") ||
                error.includes("caracteristica") ? (
                  <div
                    id="celular_error"
                    className="registro_error_alert"
                    style={{ whiteSpace: "pre" }}
                  >
                    * La (caracteristica + numero) del celular deben ser 10
                    caracteres. <br />
                    * La caracteristica debe ser sin 0 <br />
                    * El numero no debe tener 015 <br />
                    * Ingrese solo numeros. <br />* Si su telefono no es
                    correcto no tendremos forma de contactarlo!
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = { ALTA_USUARIO_SUBMIT };

export default connect(null, mapDispatchToProps)(Registro);
