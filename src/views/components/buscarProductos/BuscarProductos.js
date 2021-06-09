import React, { useEffect, useState } from "react";
import "../../../css/farmacias.css";
import FooterHome from "../footers/FooterHome";
import Suscribite from "../home/Suscribite";
import TabsProductosBuscador from "./TabsBuscadorProductos";
import NavBuscarProductos from "../navs/NavBuscarProductos";

function BuscarProductos(props) {
  const [txtbusqueda, settxtbusqueda] = useState("");

  const handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  useEffect(() => {
    settxtbusqueda(handlequery().get("p"));
  }, [handlequery().get("p")]);

  return (
    <>
      <NavBuscarProductos setmodalState={props.setmodalState} modalState={props.modalState}  txtbusqueda={txtbusqueda.toUpperCase()} />
      <div>
        <div className="container-fluid  centrado my-5 ">
          <TabsProductosBuscador txtbusqueda={txtbusqueda.toUpperCase()} />
        </div>
        <Suscribite />
      </div>
      <FooterHome />
    </>
  );
}

export default BuscarProductos;
