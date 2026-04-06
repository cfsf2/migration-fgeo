import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { apiFarmageo } from "../../../config";
import { connect } from "react-redux";
import "../../../css/farmacias.css";

// import carnet from "../../../assets/images/icon-carnet.png";
// import iconparticular from "../../../assets/images/icon-particular.png";
// import iconproductos from "../../../assets/images/icon-productos.png";
// import iconpami from "../../../assets/images/icon-pami.png";
import FooterHome from "../footers/FooterHome";
import HeaderFarmacia from "./HeaderFarmacia";
import Servicios from "./Servicios";
// import BuscadorCentral from "./BuscadorCentral";
// import Suscribite from "../home/Suscribite";
// import BannersFinal from "./BannersFinal";
// import TabsProductos from "./TabsProductos";
// import { ModalBasico } from "../modales/ModalBasico";
// import SliderBannersPromocionesFarmacia from "./components/SliderBannersPromocionesFarmacia";
// import SliderPromocionesFarmacia from "./components/SliderPromocionesFarmacia";

function FarmaciaPerfil(props) {
  // const [data, setData] = useState(null);
  const [farmaciaSelected, setfarmaciaSelected] = useState(null);
  // const [modalMsj, setmodalMsj] = useState("");
  // const [farmacia, setfarmacia] = useState("");
  // const [textbuscador, settextbuscador] = useState("");
  // const [uFarmacia, setuFarmacia] = useState(null);

  const handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  useEffect(() => {
    getFarmacia();
  }, []);

  const getFarmacia = async () => {
    var farmacia = handlequery().get("u");
    if (farmacia) {
      try {
        const result = await axios.get(apiFarmageo + "/farmacias/" + farmacia);
        if (result.data) {
          setfarmaciaSelected(result.data);
          // setuFarmacia(farmacia);
        }
      } catch (error) {
        setfarmaciaSelected(null);
        // setuFarmacia(farmacia);
      }
    }
  };

  const normalizarUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  // const handleCompras = tipoCompra => {
  //   window.location.href = `${process.env.PUBLIC_URL}/#/${tipoCompra}?u=${uFarmacia}`;
  // };

  // const handleTextBuscador = txt => {
  //   settextbuscador(txt);
  // };

  // const { auth } = props.UsuarioReducer;
  return farmaciaSelected === null ? null : (
    <>
      {/* <ModalBasico /> */}
      <div>
        <HeaderFarmacia farmaciaSelected={farmaciaSelected} />

        <Servicios
          servicios={farmaciaSelected.servicios}
          wapp={farmaciaSelected.whatsapp}
          farmacia={farmaciaSelected}
        />

        {(farmaciaSelected.facebook ||
          farmaciaSelected.instagram ||
          farmaciaSelected.web) && (
          <div className="cta-presion__social" role="contentinfo">
            <div className="cta-presion__social-inner">
              <div className="cta-presion__social-icons">
                {farmaciaSelected.instagram && (
                  <a
                    className="social-btn"
                    href={normalizarUrl(farmaciaSelected.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="white"
                        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.8a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4zm0 2a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zM18.2 6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"
                      />
                    </svg>
                  </a>
                )}

                {farmaciaSelected.facebook && (
                  <a
                    className="social-btn"
                    href={normalizarUrl(farmaciaSelected.facebook)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="white"
                        d="M13 22v-7h2.5l.5-3H13V9.5c0-.9.3-1.5 1.6-1.5H16V5.2c-.3 0-1.2-.2-2.3-.2-2.3 0-3.7 1.3-3.7 3.8V12H7v3h3v7h3z"
                      />
                    </svg>
                  </a>
                )}

                {farmaciaSelected.web && (
                  <a
                    className="social-btn"
                    href={normalizarUrl(farmaciaSelected.web)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Página web"
                    title="Página web"
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="white"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm6.93 6h-3.17a15.48 15.48 0 0 0-1.38-3.27A8.03 8.03 0 0 1 18.93 8zM12 4.04c.83 1.2 1.55 2.52 2.1 3.96H9.9A15.92 15.92 0 0 1 12 4.04zM4.26 14A8.14 8.14 0 0 1 4 12c0-.69.09-1.36.26-2h3.48c-.08.66-.14 1.32-.14 2s.05 1.34.14 2H4.26zm.81 2h3.17c.34 1.15.81 2.25 1.38 3.27A8.03 8.03 0 0 1 5.07 16zM8.24 8H5.07a8.03 8.03 0 0 1 4.55-3.27A15.48 15.48 0 0 0 8.24 8zM12 19.96A13.9 13.9 0 0 1 9.9 16h4.2A13.9 13.9 0 0 1 12 19.96zM14.54 14H9.46c-.1-.65-.16-1.32-.16-2s.06-1.35.16-2h5.08c.1.65.16 1.32.16 2s-.06 1.35-.16 2zM14.38 19.27A15.48 15.48 0 0 0 15.76 16h3.17a8.03 8.03 0 0 1-4.55 3.27zM16.26 14c.08-.66.14-1.32.14-2s-.05-1.34-.14-2h3.48c.17.64.26 1.31.26 2s-.09 1.36-.26 2h-3.48z"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* <div className="row centrado mt-4 que-necesitas pr-5" align="left">
          {farmaciaSelected.perfil_farmageo !== "vender_online" ? (
            <div className="col-md-12" align="center">
              <b className="text-danger">
                La farmacia no realiza ventas online
              </b>
            </div>
          ) : (
            <>
              <div className="col-md-6">
                <SliderBannersPromocionesFarmacia
                  productos={farmaciaSelected.productos}
                  farmacia={farmaciaSelected.usuario}
                />
                <SliderPromocionesFarmacia
                  productos={farmaciaSelected.productos}
                  farmacia={farmaciaSelected.usuario}
                />
              </div>
              <div className="col-md-5 icons-que-necesitas">
                <h2>¿Qué necesitas comprar?</h2>
                <div className="container-fluid" align="center">
                  <div className="row">
                    <button
                      className="col-sm col-5 m-1 rounded border bg-light"
                      onClick={() =>
                        auth ? handleCompras("recetaObraSocial") : null
                      }
                      data-toggle={!auth ? "modal" : null}
                      data-target="#alert-modal"
                    >
                      <img src={carnet} id="icon-carnet" alt="" />
                      <p>Receta con obra social</p>
                    </button>
                    <button
                      className="col-sm col-5 m-1 rounded border  bg-light"
                      onClick={() =>
                        auth ? handleCompras("recetaParticular") : null
                      }
                      data-toggle={!auth ? "modal" : null}
                      data-target="#alert-modal"
                    >
                      <img src={iconparticular} id="icon-particular" alt="" />
                      <p>Receta particular</p>
                    </button>
                  </div>
                  <div className="row">
                    <button
                      className="col-sm col-5 m-1 rounded border  bg-light"
                      onClick={() => handleCompras("farmprodcat")}
                      data-toggle={null}
                      data-target="#alert-modal"
                    >
                      <img src={iconproductos} id="icon-productos" alt="" />
                      <p>Productos</p>
                    </button>
                    <button
                      className="col-sm col-5 m-1 rounded border  bg-light"
                      onClick={() =>
                        auth ? handleCompras("recetaPami") : null
                      }
                      data-toggle={!auth ? "modal" : null}
                      data-target="#alert-modal"
                    >
                      <img src={iconpami} id="icon-pami" alt="" />
                      <p>Pami</p>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div> */}
        {/* {farmaciaSelected !== null &&
        farmaciaSelected.perfil_farmageo !== "vender_online" ? null : (
          <>
            <BuscadorCentral handleTextBuscador={handleTextBuscador} />
            <TabsProductos
              excepcionesEntidadesFarmageo={
                farmaciaSelected.excepcionesEntidadesFarmageo
              }
              excepcionesProdFarmageo={farmaciaSelected.excepcionesProdFarmageo}
              farmacia={farmaciaSelected}
              textbuscador={textbuscador}
              productos_propios={farmaciaSelected.productos}
            />
          </>
        )} */}
        {/* <BannersFinal /> */}
        {/* <Suscribite /> */}
      </div>
      <FooterHome />
    </>
  );
}

const mapStateToProps = state => {
  return {
    UsuarioReducer: state.UsuarioReducer
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(FarmaciaPerfil);