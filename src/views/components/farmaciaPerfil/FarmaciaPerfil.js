import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { apiFarmageo } from "../../../config";
import { connect } from "react-redux";
import "../../../css/farmacias.css";

import carnet from "../../../assets/images/icon-carnet.png";
import iconparticular from "../../../assets/images/icon-particular.png";
import iconproductos from "../../../assets/images/icon-productos.png";
import iconpami from "../../../assets/images/icon-pami.png";
import FooterHome from "../footers/FooterHome";
import HeaderFarmacia from "./HeaderFarmacia";
import Servicios from "./Servicios";
import BuscadorCentral from "./BuscadorCentral";
import Suscribite from "../home/Suscribite";
import BannersFinal from "./BannersFinal";
import TabsProductos from "./TabsProductos";
import { ModalBasico } from "../modales/ModalBasico";
import SliderBannersPromocionesFarmacia from "./components/SliderBannersPromocionesFarmacia";
import SliderPromocionesFarmacia from "./components/SliderPromocionesFarmacia";

function FarmaciaPerfil(props) {
  // const [data, setData] = useState(null);
  const [farmaciaSelected, setfarmaciaSelected] = useState(null);
  // const [modalMsj, setmodalMsj] = useState("");
  // const [farmacia, setfarmacia] = useState("");
  const [textbuscador, settextbuscador] = useState("");
  const [uFarmacia, setuFarmacia] = useState(null);

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
          setuFarmacia(farmacia);
        }
      } catch (error) {
        setfarmaciaSelected(null);
        setuFarmacia(farmacia);
      }
    }
  };
  const handleCompras = tipoCompra => {
    window.location.href = `${process.env.PUBLIC_URL}/#/${tipoCompra}?u=${uFarmacia}`;
  };

  const handleTextBuscador = txt => {
    settextbuscador(txt);
  };

  const { auth } = props.UsuarioReducer;
  return farmaciaSelected === null ? null : (
    <>
      <ModalBasico />
      <div>
        <HeaderFarmacia farmaciaSelected={farmaciaSelected} />
        <Servicios
          servicios={farmaciaSelected.servicios}
          wapp={farmaciaSelected.whatsapp}
          farmacia={farmaciaSelected}
        />

        <div className="row centrado mt-4 que-necesitas pr-5" align="left">
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
        </div>
        {farmaciaSelected !== null &&
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
        )}
        <BannersFinal />
        <Suscribite />
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
