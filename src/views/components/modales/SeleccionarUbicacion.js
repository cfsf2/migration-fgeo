import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import UbicacionActual from "../../helpers/UbicacionActual";
import { localidades } from "../../helpers/FarmaciaHelpers";
import {
  ELEGIR_LOCALIDAD,
  USAR_MAPA,
} from "../../../redux/actions/UsuarioActions";

function SeleccionarUbicacion(props) {
  const [localidad, setlocalidad] = useState("ROSARIO");
  const [currentLoc, setCurrentLoc] = useState(false);

  const handleLocalidad = (event) => {
    setlocalidad(event.nativeEvent.target.value);
  };

  const handleConfirmar = async (e) => {
    console.log(currentLoc);
    if (!currentLoc) {
      props.setmodalState(!props.modalState);
      console.log("lalalala");
    } else {
      await props.ELEGIR_LOCALIDAD(localidad);
      await props.USAR_MAPA(true);
      props.setmodalState(!props.modalState);
    }
  };

  useEffect(() => {
    getUbicacionDefault();
  }, []);
  useEffect(() => {
    document.getElementById("alert-seleccionar-ubicacion").focus();
  }, [props.currentLoc]);

  const getUbicacionDefault = async () => {
    var data = await sessionStorage.getItem("ubicacion_default");
    if (data) {
      props.setmodalState(false);
      props.ELEGIR_LOCALIDAD(data);
    }
  };

  return (
    <div
      className={
        "modal fade" + (props.modalState ? " show d-block" : " d-none")
      }
      tabIndex="1"
      role="dialog"
      id="alert-seleccionar-ubicacion"
      tabIndex="0"
      onKeyDown={(e) => (e.which === 27 ? props.setmodalState(false) : "")}
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
                  <UbicacionActual
                    currentLoc={currentLoc}
                    setCurrentLoc={setCurrentLoc}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                aria-label="Close"
                onClick={(e) => handleConfirmar(e)}
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
  USAR_MAPA,
};

export default connect(null, mapDispatchToProps)(SeleccionarUbicacion);
