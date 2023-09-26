import React from "react";
import { connect } from "react-redux";
import Modal from "../../modales/Modal";
import "./capturaws.css";

import { NUEVO_REQUERIMIENTO } from "../../../../redux/actions/CampanaActions";
import {
  UPDATE_USER,
  UPDATE_LOCAL_USER,
} from "../../../../redux/actions/UsuarioActions";

const Formulario = (props) => {
  const [mostrar, setMostrar] = React.useState(false);
  const [state, setState] = React.useState({
    caracteristica: "",
    telefono: "",
    documento: null,
    nombre: null,
  });

  const [error, setError] = React.useState(false);
  const campana = props.campana;
  const farmacia = props.farmacia;

  const [capturaExitosa, setCapturaExitosa] = React.useState(false);

  const pideDocumento =
    campana.atributos.find((a) => a.codigo === "solicitar_documento")?.valor ===
    "s";

  const pideNombre =
    campana.atributos.find((a) => a.codigo === "solicitar_nombre")?.valor ===
    "s";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "caracteristica" || name === "telefono") {
      const rexExp = new RegExp(
        /[a-z]|\s|\.|\+|\*|\?|\^|\$|\(|\)|\[|\]|\{|\}|\|\\|,|=|;|'|:|-|\/|\\|\||!|@|#|%|&|_|"/,
        "gi"
      );
      const esNumero = rexExp.test(value);
      if (esNumero) {
        return;
      }

      if (
        state.caracteristica.length + value.length > 10 &&
        name !== "caracteristica"
      )
        return;

      if (state.telefono.length + value.length > 10 && name !== "telefono")
        return;
    }
    setState({
      ...state,
      [name]: value,
    });
  };

  const validacion = () => {
    if (
      state.caracteristica.trim() === "" ||
      state.telefono.trim() === "" ||
      state.caracteristica.length + state.telefono.length !== 10
    ) {
      setError(true);
      return false;
    }
    if (pideNombre) {
      if (!state.nombre || state.nombre.trim() === "") {
        setError(true);
        return false;
      }
    }
    if (pideDocumento) {
      if (!state.documento || state.documento.trim() === "") {
        setError(true);
        return false;
      }
    }
    setError(false);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state, validacion());
    if (validacion()) {
      props
        .NUEVO_REQUERIMIENTO({
          id_campana: campana._id ?? campana.id ?? campana.$extras._id,
          id_farmacia: farmacia ? farmacia._id : null,
          celular: unirTelefono(),
          documento: state.documento,
          nombre: state.nombre,
        })
        .then((res) => {
          setCapturaExitosa(true);

          setTimeout(() => {
            setMostrar(false);
          }, 2000);

          if (campana.funcion_callback) {
            props[campana.funcion_callback]();
          }
        })
        .catch((err) => {
          alert("Ha ocurrido un error viejo, proba de nuevo cuando te pinte");
        });
    }
  };

  const unirTelefono = () => {
    const inputSeparado = [state.caracteristica, state.telefono];
    const inputUnico = inputSeparado.join("");

    return inputUnico;
  };

  React.useEffect(() => {
    setMostrar(true);
  }, [props.UsuarioReducer.auth]);

  return (
    <Modal
      open={mostrar}
      handleClose={setMostrar}
      style={{ position: "fixed", left: "50%", minwidth: "500px" }}
    >
      <div className="modal-dialog modal-md ">
        <div className="modal-content">
          <div style={{ float: "right" }}></div>
          <div className="modal-body" align="left">
            {capturaExitosa ? (
              <div> En Breve nos comunicaremos con usted</div>
            ) : (
              <div className="alerta">
                <h3 style={{ textAlign: "center" }}>
                  <b>{campana.titulo}</b>
                </h3>
                <div className="div-imagen">
                  {campana.url_imagen_principal && (
                    <img
                      className="style-imagen"
                      src={campana.url_imagen_principal}
                      alt="imagen_promocional"
                    />
                  )}
                </div>
                <div className="form-row mt-1 pr-3 pl-3 form-position">
                  <div className="col-md-12 mb-1 pr-3">
                    <p style={{ textAlign: "center" }}>{campana.descripcion}</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row col-md-12 mb-1 pr-3 input-position">
                      <input
                        className="col-4 h-100 registro"
                        // type="number"
                        name="caracteristica"
                        placeholder="Sin 0"
                        value={state.caracteristica}
                        onChange={handleChange}
                      />
                      <input
                        className="col-7 h-100 registro"
                        // type="number"
                        name="telefono"
                        placeholder="Celular (sin 15)"
                        value={state.telefono}
                        onChange={handleChange}
                      />
                      {campana.atributos.find(
                        (a) => a.codigo === "solicitar_nombre"
                      )?.valor === "s" && (
                        <input
                          className="col-7 h-100 registro"
                          name="nombre"
                          placeholder="Nombre y Apellido"
                          value={state.nombre}
                          onChange={handleChange}
                        />
                      )}
                      {campana.atributos.find(
                        (a) => a.codigo === "solicitar_documento"
                      )?.valor === "s" && (
                        <input
                          className="col-7 h-100 registro"
                          type="number"
                          name="documento"
                          placeholder="Documento sin puntos"
                          value={state.documento}
                          onChange={handleChange}
                        />
                      )}
                    </div>
                    {error || (state.telefono && state.telefono !== "") ? (
                      <p className="registro-alert">
                        Revise los datos ingresados &#128070;
                      </p>
                    ) : null}
                    <div className="form-row justify-content-center pt-3">
                      <button
                        type="submit"
                        className="btn btn-info"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Confirmar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    CampanaReducer: state.CampanaReducer,
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {
  NUEVO_REQUERIMIENTO,
  UPDATE_USER,
  UPDATE_LOCAL_USER,
};

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
