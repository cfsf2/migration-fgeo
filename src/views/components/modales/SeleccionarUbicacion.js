import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import UbicacionActual from "../../helpers/UbicacionActual";
import { localidades } from "../../helpers/FarmaciaHelpers";
import { ELEGIR_LOCALIDAD } from "../../../redux/actions/UsuarioActions";

function SeleccionarUbicacion(props) {
  const [modalState, setmodalState] = useState(true);
  const [localidad, setlocalidad] = useState("ROSARIO");

  const handleLocalidad = (event) => {
    setlocalidad(event.nativeEvent.target.value);
  };

  const handleConfirmar = async () => {
    await props.ELEGIR_LOCALIDAD(localidad);
    setmodalState(!modalState);
  };

  useEffect(() => {
    getUbicacionDefault();
  }, []);

  const getUbicacionDefault = async () => {
    var data = await sessionStorage.getItem("ubicacion_default");
    if (data) {
      setmodalState(false);
      props.ELEGIR_LOCALIDAD(data);
    }
  };

  return (
    <div
      className={"modal fade" + (modalState ? " show d-block" : " d-none")}
      tabIndex="-1"
      role="dialog"
      id="alert-seleccionar-ubicacion"
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div style={{ float: "right" }}></div>
          <div className="modal-body" align="left">
            <div className="alerta">
              <h4>
                <b>Elegí tu localidad para obtener una mejor experiencia</b>
              </h4>

              <div className="form-row mt-3">
                <div className="col-md-12 mb-3 pr-3">
                  <label htmlFor="provincia">Provincia</label>
                  <select className="form-control" disabled>
                    <option value="ROSARIO">SANTA FE</option>
                  </select>
                </div>
                <div className="col-md-12 mb-3 pr-3">
                  <label htmlFor="localidad">Localidad</label>
                  <select
                    id="localidad"
                    className="form-control"
                    value={localidad}
                    onChange={handleLocalidad}
                    name="localidad"
                  >
                    <option value="ROSARIO">ROSARIO</option>
                    {localidades.map((localidad, i) => {
                      return (
                        <option value={localidad} key={i}>
                          {localidad}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-row mt-3">
                <div className="col-md-12 mb-3 pr-3">
                  Utilizar mi ubicación actual
                  <UbicacionActual />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleConfirmar}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  ELEGIR_LOCALIDAD,
};

export default connect(null, mapDispatchToProps)(SeleccionarUbicacion);
