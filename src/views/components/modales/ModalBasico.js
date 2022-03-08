import React from "react";
import advertencia from "../../../assets/images/advertencia (1) Imagen.png";

export function ModalBasico(props) {
  return (
    <div className="modal" id="alert-modal">
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
          <div className="modal-body" align="center">
            <div className="alerta">
              <img src={advertencia} style={{ width: "50px" }} alt="" />
              <h6>
                Para poder acceder a{" "}
                <b>Receta con obra social / Receta particular / Pami </b>
              </h6>
              <a type="button" data-dismiss="modal" aria-label="Close">
                Debe registrarse o ingresar con su cuenta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
