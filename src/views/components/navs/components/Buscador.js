import React from "react";
import { InputBuscador } from "./InputBuscador";

export const Buscador = (props) => {
  const { iconFarmacia, forma1, lupa, className } = props;
  const handleSearch = (search, txtbusqueda) => {
    // const { search, txtbusqueda } = this.state;
    if (search === "farmacia") {
      window.location.href =
        `${process.env.PUBLIC_URL}/#/buscarfarmacia?f=` +
        txtbusqueda.toLowerCase();
    } else if (search === "producto") {
      window.location.href =
        `${process.env.PUBLIC_URL}/#/buscarproductos?p=` + txtbusqueda;
    }
  };
  return (
    <div className={className}>
      <InputBuscador
        iconFarmacia={iconFarmacia}
        forma1={forma1}
        lupa={lupa}
        handleSearch={handleSearch}
        farmacia
      />
      <InputBuscador
        forma1={forma1}
        lupa={lupa}
        handleSearch={handleSearch}
        producto
      />
    </div>
  );
};
