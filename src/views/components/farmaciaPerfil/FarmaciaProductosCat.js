import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { apiFarmageo } from "../../../config";
import "../../../css/farmacias.css";
import FooterHome from "../footers/FooterHome";
import BuscadorCentral from "./BuscadorCentral";
import Suscribite from "../home/Suscribite";
import BannersFinal from "./BannersFinal";
import TabsProductos from "./TabsProductos";

function FarmaciaProductosCat() {
  const [farmaciaSelected, setfarmaciaSelected] = useState(null);
  const [textbuscador, setextbuscador] = useState("");

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
        var result = await axios.get(apiFarmageo + "/farmacias/" + farmacia);
        if (result.data) {
          setfarmaciaSelected(result.data);
        }
      } catch (error) {
        setfarmaciaSelected(null);
      }
    }
  };

  const handleTextBuscador = _textbuscador => {
    setextbuscador(_textbuscador);
  };

  return farmaciaSelected === null ? null : (
    <>
      <div>
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
        <BannersFinal />
        <Suscribite />
      </div>
      <FooterHome />
    </>
  );
}

export default FarmaciaProductosCat;
