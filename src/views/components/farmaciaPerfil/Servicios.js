import _ from "lodash";
import { checkServicio } from "../../helpers/FarmaciaHelpers";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiFarmageoSql } from "../../../config";
import BotonWhatsapp from "../BotonWhatsapp";

function Servicios(props) {
  const { servicios, wapp } = props;
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
            {/* <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio("recetas-magistrales", servicios)
                  ? { filter: "none", opacity: 1 }
                  : { filter: "grayscale(100%)", opacity: 0.3 }
              }
            >
              <img src={magistrales} className="icons-md" alt="" />{" "}
              <p>Recetas Magistrales</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio("violeta", servicios)
                  ? { filter: "none", opacity: 1 }
                  : { filter: "grayscale(100%)", opacity: 0.3 }
              }
            >
              <img src={grupo287} className="icons-lg" alt="" />
              <p>Farmacia violeta</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio("presion", servicios)
                  ? { filter: "none", opacity: 1 }
                  : { filter: "grayscale(100%)", opacity: 0.3 }
              }
            >
              <img src={presion} className="icons-md" alt="" />{" "}
              <p>Toma de presión</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio("amarillos", servicios)
                  ? { filter: "none", opacity: 1 }
                  : { filter: "grayscale(100%)", opacity: 0.3 }
              }
            >
              <img src={amarillos} className="icons-md" alt="" />
              <p>Puntos amarillos</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio("inyectables", servicios)
                  ? { filter: "none", opacity: 1 }
                  : { filter: "grayscale(100%)", opacity: 0.3 }
              }
            >
              <img src={inyeccion} className="icons-md" alt="" />
              <p>Inyectables</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio("testcovid", servicios)
                  ? { filter: "none", opacity: 1 }
                  : { filter: "grayscale(100%)", opacity: 0.3 }
              }
            >
              <img src={testcovid} className="icons-md" alt="" />
              <p>Test de Covid</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio("pañalespami", servicios)
                  ? { filter: "none", opacity: 1 }
                  : { filter: "grayscale(100%)", opacity: 0.3 }
              }
            >
              <img
                src={panales_pami}
                className="icons-md"
                alt=""
                style={{ width: "60px", height: "30px" }}
              />
              <p>Pañales PAMI</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio("farmaciasolidaria", servicios)
                  ? { filter: "none", opacity: 1 }
                  : { filter: "grayscale(100%)", opacity: 0.3 }
              }
            >
              <img
                src={corazon}
                className="icons-md"
                alt=""
                style={{ width: "40px" }}
              />
              <p>Farmacia Solidaria</p>
            </div>
            <div
              className="col-sm col-6 bg-verde p-3 pt-4"
              style={
                checkServicio("whatsapp", servicios)
                  ? { filter: "none", opacity: 1 }
                  : { filter: "grayscale(100%)", opacity: 0.3 }
              }
            >
              <a
                href={
                  checkServicio("whatsapp", servicios)
                    ? `https://api.whatsapp.com/send?phone=+549${wapp}`
                    : null
                }
                target="_blank"
                rel="noopener"
              >
                <img src={whatsapp} className="icons-md" alt="" />
              </a>
            </div> */}
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
      <BotonWhatsapp />
    </div>
  );
}

export default Servicios;
