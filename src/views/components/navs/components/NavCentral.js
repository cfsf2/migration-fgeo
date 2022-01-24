import React from "react";
import { Buscador } from "./Buscador";

export function NavCentral(props) {
  const {
    iconFarmacia,
    forma1,
    lupa,
    iconCarrito,
    handleCarrito,
    carrito,
    logo,
  } = props;

  return (
    <div className="row pt-4 pb-2 nav-central">
      <div className="col-md-3 hide-mobile">
        <a href={process.env.PUBLIC_URL + "/#/"}>
          <img alt="farmageo_logo" src={logo} className="logo-farmageo" />
        </a>
      </div>
      <Buscador
        iconFarmacia={iconFarmacia}
        forma1={forma1}
        lupa={lupa}
        className="d-flex col-md-6"
      />
      <div className="col-md-3 hide-mobile" align="center">
        <button className="carrito" onClick={handleCarrito}>
          Mi carrito <img alt="" src={iconCarrito} id="icon-carrito" />{" "}
          {carrito.length}
        </button>
      </div>
    </div>
  );
}
