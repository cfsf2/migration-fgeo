import _ from "lodash";
import { checkServicio } from "../../helpers/FarmaciaHelpers";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiFarmageoSql } from "../../../config";
import BotonWhatsapp from "../BotonWhatsapp";

function Servicios(props) {
  const { servicios, farmacia } = props;
  const [todosServicios, setTodosServicios] = useState([]);
  const [whatsapp, setWhatsapp] = useState(null);

  useEffect(() => {
    axios.post(apiFarmageoSql + "/farmacias/servicios/").then((res) => {
      setTodosServicios(res.data.filter((d) => d.nombre !== "whatsapp"));
      setWhatsapp(res.data.filter((d) => d.nombre === "whatsapp").pop());
    });
  }, []);

  if (servicios.length === 0) return <></>;
  return (
    <div //className="row"
      align="center"
      style={{ display: "grid" }}
    >
      <div className="col-md-3"></div>
      <div
        className="col-md-6 nuestros-servicios"
        style={{
          width: "fit-content",
          justifySelf: "center",
          maxWidth: "unset",
        }}
      >
        <h4>Nuestros servicios</h4>
        <div className="container-fluid mt-2" id="servicios-nav">
          <div className="row nuestros-servicios-icons " align="center">
            {todosServicios.map((s) => {
              let imagePath;
              try {
                imagePath = s.url_img.replace(/\.\.\//g, "");
              } catch (error) {
                imagePath = null; // Imagen no encontrada
              }
              return (
                <div
                  key={s.id}
                  className="col-sm col-6 pt-4"
                  style={
                    checkServicio(s.nombre, servicios)
                      ? { filter: "none", opacity: 1 }
                      : {
                          display: "none",
                          filter: "grayscale(100%)",
                          opacity: 0.3,
                        }
                  }
                >
                  <img
                    src={imagePath}
                    alt={s.nombre_corto}
                    className="icons-md"
                  />{" "}
                  <p>{s.nombre_corto}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
      {whatsapp ? <BotonWhatsapp nroContacto={farmacia.whatsapp} /> : <></>}
    </div>
  );
}

export default Servicios;
