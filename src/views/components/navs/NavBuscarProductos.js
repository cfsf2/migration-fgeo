import React, { useEffect, useState } from "react";
import {
  GET_CATEGORIAS,
  SET_CATEGORIA
} from "../../../redux/actions/ProductosActions";

import { connect } from "react-redux";
import logoFarmageo from "../../../assets/images/Grupo 57.png";
import iconCarrito from "../../../assets/images/carrito.png";
import iconMaps from "../../../assets/images/Icono.png";
import logo from "../../../assets/images/logo.png";

import forma1 from "../../../assets/images/Forma 1.png";
import iconFarmacia from "../../../assets/images/Grupo 79.png";
import Trazado230 from "../../../assets/images/Trazado 230.png";
import lupa from "../../../assets/images/Lupa.png";

import Login from "../modales/Login";
import Registro from "../modales/Registro";
import SeleccionarUbicacion from "../modales/SeleccionarUbicacion";
import { GET_AUTH } from "../../../redux/actions/UsuarioActions";
import Carrito from "../compras/Carrito";

import ReactGA from "react-ga";

function NavBuscarProductos(props) {
  const [categoria, setcategoria] = useState("all");
  const [farmacia, setfarmacia] = useState(null);
  const [ubicacion_default, setubicacion_default] = useState("");
  const [showCarrito, setshowCarrito] = useState(false);
  const [search, setsearch] = useState("producto");
  const [txtbusqueda, settxtbusqueda] = useState(props.txtbusqueda);
  const [showcategorias, setshowcategorias] = useState(false);
  const { categorias, categoriaFiltro } = props.ProductosReducer;
  const { auth, user_farmageo } = props.UsuarioReducer;
  const { carrito } = props.PedidosReducer;

  useEffect(() => {
    props.GET_AUTH();
    googleAnalytics();
    props.GET_CATEGORIAS();
    getUbicacionDefault();
  }, []);

  const googleAnalytics = () => {
    ReactGA.initialize("G-6DDCQD6XV5");
    ReactGA.pageview(window.location.href);
  };

  const handleSearch = () => {
    if (search === "farmacia") {
      window.location.href =
        `${process.env.PUBLIC_URL}/#/buscarfarmacia?f=` + txtbusqueda;
    } else if (search === "producto") {
      window.location.href =
        `${process.env.PUBLIC_URL}/#/buscarproductos?p=` + txtbusqueda;
    }
  };

  const getUbicacionDefault = async () => {
    var _ubicacion_default = await sessionStorage.getItem("ubicacion_default");
    if (_ubicacion_default) {
      setubicacion_default(_ubicacion_default + ", Santa Fe");
    }
  };

  const handleCategoria = event => {
    const value = event.nativeEvent.target.value;
    setcategoria(value);
    SET_CATEGORIA(value);
  };

  const handleSeccionCategorias = async categoria => {
    await props.SET_CATEGORIA(categoria);
    window.location.href = `${process.env.PUBLIC_URL}/#/seleccionarfarmacia`;
  };

  const handleCarrito = () => {
    setshowCarrito(!showCarrito);
  };

  return (
    <>
      {/*<!-- nav cuando scrollea-->*/}
      <div className="row hide-mobile">
        <div
          className="col-md-12"
          style={{
            position: "fixed",
            zIndex: 10,
            backgroundColor: "rgb(43 52 85)"
          }}
        >
          <div className="container-fluid">
            <div className="row " align="center">
              <div className="col-4 py-1">
                <a href={process.env.PUBLIC_URL + "/#/"}>
                  <img alt="" src={logoFarmageo} style={{ width: "130px" }} />
                </a>
              </div>
              <div className="col-4 pt-3">
                <a
                  className="nav-farmageo-back"
                  href={process.env.PUBLIC_URL + "/#/"}
                >
                  {props.farms_cerca_cant + " Farmacias cerca"}
                </a>
              </div>
              <div className="col-4 py-1">
                <a
                  className="nav-link nav-farmageo-item"
                  onClick={handleCarrito}
                >
                  <p className="only-desktop">Mi carrito </p>
                  <img alt="" src={iconCarrito} className="icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- FIN nav cuando scrollea -->*/}

      {/*<!-- nav parte superior-->*/}
      <div className="row">
        <div
          className="col-md-12"
          style={{ zIndex: 20, backgroundColor: "rgb(43 52 85)" }}
        >
          <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed-top m-0">
            <div className="container-fluid">
              <a className="nav-farmageo-back" href="#">
                <img alt="" src={iconMaps} style={{ width: "1em" }} />{" "}
                {ubicacion_default}
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  {showcategorias ? (
                    <>
                      <li
                        className="nav-item hide-desktop"
                        style={{ fontSize: 11 }}
                      >
                        <select
                          value={categoriaFiltro}
                          onChange={handleCategoria}
                          style={{
                            backgroundColor: "transparent",
                            color: "#ababa1"
                          }}
                        >
                          <option
                            value="all"
                            style={{
                              backgroundColor: "transparent",
                              color: "#ababa1",
                              fontSize: 11
                            }}
                          >
                            Todas las categorías
                          </option>
                          {categorias
                            ? categorias.map((cat, i) => {
                              return (
                                <option
                                  value={cat._id}
                                  key={i}
                                  style={{
                                    backgroundColor: "transparent",
                                    color: "#ababa1",
                                    fontSize: 11
                                  }}
                                >
                                  {cat.nombre}
                                </option>
                              );
                            })
                            : null}
                        </select>
                      </li>
                      {categorias
                        ? categorias.map((cat, i) => {
                          return cat.destacada ? (
                            <li className="nav-item hide-desktop" key={i}>
                              <a
                                className="nav-link"
                                onClick={() =>
                                  handleSeccionCategorias(cat._id)
                                }
                                key={i}
                                style={{ color: "#ababa1", fontSize: 11 }}
                              >
                                {cat.nombre}
                              </a>
                            </li>
                          ) : null;
                        })
                        : null}
                    </>
                  ) : null}

                  {auth && user_farmageo ? (
                    <li className="nav-item">
                      <a
                        className="nav-link nav-farmageo-item"
                        href={process.env.PUBLIC_URL + "/#/usuarioconfig"}
                      >
                        {user_farmageo.usuario.split("@")[0]}
                      </a>
                    </li>
                  ) : (
                    <>
                      <li className="nav-item">
                        <a
                          className="nav-link nav-farmageo-item"
                          data-toggle="modal"
                          data-target="#alert-registro"
                        >
                          Registrarme
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link nav-farmageo-item"
                          data-toggle="modal"
                          data-target="#alert-login"
                        >
                          Ingresar
                        </a>
                      </li>
                    </>
                  )}
                  <li className="nav-item">
                    <a
                      className="nav-link nav-farmageo-item"
                      href="https://play.google.com/store/apps/details?id=com.santiagoalarcon.farmageo"
                      target="_blank"
                      rel="noopener"
                    >
                      Descargar App
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link nav-farmageo-item"
                      href="https://www.farmageo.com.ar/novedades/"
                      target="_blank"
                      rel="noopener"
                    >
                      Blog{" "}
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link nav-farmageo-item"
                      href={process.env.PUBLIC_URL + "/mi-farmacia"}
                      target="_blank"
                      rel="noopener"
                    >
                      Mi Farmacia
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <a href={process.env.PUBLIC_URL + "/#/"} id="logo-mobile">
            <img alt="" src={logo} className="w-75" />
          </a>
          <button onClick={handleCarrito} className="btn-carrito-mob">
            <img alt="" src={iconCarrito} className="icon" />
            <p className="d-inline">{carrito.length}</p>
          </button>
        </div>
      </div>
      {/*<!-- FIN nav parte superior -->*/}

      {/*<!-- nav parte central -->*/}
      <div className="row pt-4 pb-2 nav-central">
        <div className="col-md-4">
          <a href={process.env.PUBLIC_URL + "/#/"}>
            <img alt="" src={logo} className="logo-farmageo" />
          </a>
        </div>
        <div className="col-md-5">
          <div className="buscador-background">
            <div className="d-inline">
              <div className="dropdown d-inline">
                <a href="#" id="imageDropdown" data-toggle="dropdown">
                  <img
                    alt=""
                    src={search === "farmacia" ? iconFarmacia : forma1}
                    className="search-select-icons mr-1"
                  />
                  <img alt="" src={Trazado230} style={{ width: "10px" }} />
                </a>
                <ul
                  className="dropdown-menu mt-3"
                  role="menu"
                  aria-labelledby="imageDropdown"
                  style={{ border: "solid 1px #bab8b8", borderRadius: 13 }}
                  align="center"
                >
                  <li role="presentation" align="left">
                    <button
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => {
                        setsearch("farmacia");
                        settxtbusqueda("");
                      }}
                      style={{ border: "none", background: "none" }}
                    >
                      <img
                        alt=""
                        src={iconFarmacia}
                        className="search-select-icons mr-3"
                      />
                      Farmacia
                    </button>
                  </li>
                  <li
                    style={{ borderBottom: "solid 0.8px #bab8b8" }}
                    className="mx-2 my-2"
                  ></li>
                  <li role="presentation" align="left">
                    <button
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => {
                        setsearch("producto");
                        settxtbusqueda("");
                      }}
                      style={{ border: "none", background: "none" }}
                    >
                      <img
                        alt=""
                        src={forma1}
                        className="search-select-icons mr-3"
                      />
                      Producto
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-inline search-input">
              <input
                type="text"
                placeholder={`¿Qué ${search} estás buscando?`}
                className="input-search"
                onChange={e => settxtbusqueda(e.nativeEvent.target.value)}
                name="txtbusqueda"
                value={txtbusqueda}
                style={{ backgroundColor: "transparent" }}
              />
            </div>
            <div className="d-inline search-lupa" onClick={handleSearch}>
              <img alt="" src={lupa} alt="" id="icono-lupa" />
            </div>
          </div>
        </div>
        <div className="col-md-3 hide-mobile" align="center">
          <button className="carrito" onClick={handleCarrito}>
            Mi carrito <img alt="" src={iconCarrito} id="icon-carrito" />
          </button>
        </div>
      </div>
      {/*<!-- FIN nav central -->*/}

      <div className="row d-flex   py-0 nav-inferior">
            <div className="col-md-2   hide-mobile" align="center">
              <select
                className="categoria-select py-3"
                value={categoriaFiltro}
                onChange={handleCategoria}
              >
                <option className="categoria-icons-select col-md-2" value="all">
                  {`Buscá por 
                    Categorías`}
                </option>
                {categorias
                  ? categorias.map((cat, i) => {
                      return (
                        <option
                          className="categoria-icons-select"
                          value={cat._id}
                          key={i}
                        >
                          {cat.nombre}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div style={{borderLeft:"solid 1px #4f9cb5"}} className="col-md-2 px-0 hide-mobile hover-bg-4f9cb5" align="center">
                <button
                style={{width:"100%", height:"100%"}}
                  className="nav-inferior-link"
                >

                  Pedí tus recetas
                        </button>
              </div>
            {categorias
              ? categorias.map((cat, i) => {
                  let styleMenu={
                    borderLeft:"solid 1px #4f9cb5",
                    
                  }
                  return cat.destacada ? (
                    <div style={styleMenu} className="col-md-2 px-0 hide-mobile hover-bg-4f9cb5"  align="center">
                      <button
                      style={{width:"100%", height:"100%"}}
                        className="nav-inferior-link"
                        onClick={() => handleSeccionCategorias(cat._id)}
                        key={i}
                      >
                        {cat.nombre}
                      </button>
                    </div>
                  ) : null;
                })
              : null}
          </div>
      <Carrito show={showCarrito} />
      <Login />
      <Registro />
      <SeleccionarUbicacion />
    </>
  );
}

const mapStateToProps = state => {
  return {
    ProductosReducer: state.ProductosReducer,
    UsuarioReducer: state.UsuarioReducer,
    farms_cerca_cant: state.FarmaciasReducer.farms_cerca_cant,
    PedidosReducer: state.PedidosReducer
  };
};

const mapDispatchToProps = {
  GET_CATEGORIAS,
  SET_CATEGORIA,
  GET_AUTH
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBuscarProductos);
