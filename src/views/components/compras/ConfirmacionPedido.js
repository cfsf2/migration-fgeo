import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { apiFarmageo } from "../../../config";
import "../../../css/farmacias.css";
import FooterHome from "../footers/FooterHome";
import Suscribite from "../home/Suscribite";
import { checkServicio } from "../../helpers/FarmaciaHelpers";
import whatsapp from "../../../assets/images/whatsapp.png";
import personas from "../../../assets/images/Grupo 110.png";

function ConfirmacionPedido() {
  const [farmaciaSelected, setfarmaciaSelected] = useState(null);

  const handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  useEffect(() => {
    getFarmacia();
  });

  const getFarmacia = async () => {
    var farmacia = handlequery().get("u");
    if (farmacia) {
      try {
        const result = await axios.get(apiFarmageo + "/farmacias/" + farmacia);
        if (result.data) {
          setfarmaciaSelected(result.data);
        }
      } catch (error) {
        setfarmaciaSelected(null);
      }
    } else {
      setfarmaciaSelected(null);
    }
  };

  return (
    <>
      <div>
        <div className="container-fluid my-5 ">
          <div className="row">
            <div className="col">
              <h3 align="center" style={{ fontWeight: "lighter" }}>
                Carrito de compras {">"} Detalles de pago {">"}{" "}
                <b style={{ fontWeight: "bold" }}> Pedido completado</b>
              </h3>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col" align="center">
              <h4 className="d-inline">
                <b>Se ha enviado tu formulario </b>
              </h4>
              <p className="mt-3">
                A la brevedad tu farmacia se pondrá en contacto contigo
              </p>
            </div>
          </div>
          <div className="row" align="center">
            <div className="col">
              <a
                className="btn btn-add-to-car"
                href={process.env.PUBLIC_URL + "/#/"}
              >
                Volver al inicio
              </a>
            </div>
          </div>
          <div
            className="container-fluid mt-2"
            id="servicios-nav"
            style={{ width: "30vw" }}
          >
            <div className="row">
              <div className="col-4 pt-3" align="center">
                <img src={personas} alt="" />
              </div>
              <div className="col pt-3" align="left">
                <small>
                  Cualquier consulta ponete en contacto con tu farmacéutico
                </small>
              </div>
              {farmaciaSelected === null ? null : (
                <div className="row nuestros-servicios-icons " align="center">
                  <div
                    className="col bg-verde pt-4"
                    style={
                      checkServicio("whatsapp", farmaciaSelected.servicios)
                        ? { filter: "none", opacity: 1 }
                        : { filter: "grayscale(100%)", opacity: 0.3 }
                    }
                  >
                    <a
                      href={
                        checkServicio("whatsapp", farmaciaSelected.servicios)
                          ? `https://api.whatsapp.com/send?phone=+549${farmaciaSelected.whatsapp}`
                          : null
                      }
                      target="_blank"
                      rel="noopener"
                    >
                      <img src={whatsapp} className="w-50 mb-4" alt="" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Suscribite />
      </div>
      <FooterHome />
    </>
  );
}

export default ConfirmacionPedido;
