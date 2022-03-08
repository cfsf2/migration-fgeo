import React from "react";
import { InputBuscador } from "./InputBuscador";
import { useHistory } from "react-router-dom";
import "./inputbuscador.css";

export const Buscador = (props) => {
  const { iconFarmacia, forma1, lupa, className } = props;
  const history = useHistory();
  const handleSearch = (search, txtbusqueda) => {
    // const { search, txtbusqueda } = this.state;
    if (search === "farmacia") {
      history.push(`/buscarfarmacia?f=` + txtbusqueda.toLowerCase());
    } else if (search === "producto") {
      history.push(`/buscarproductos?p=` + txtbusqueda);
    }
  };
  return (
    <div className={className + " " + "home_buscador"}>
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
