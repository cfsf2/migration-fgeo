import React, { Component } from "react";
import {
  GET_CATEGORIAS,
  SET_CATEGORIA
} from "../../../redux/actions/ProductosActions";

import { connect } from "react-redux";
import logoFarmageo from "../../../assets/images/Grupo 57.png";
import iconCarrito from "../../../assets/images/carrito.png";
import iconCarritoWhite from "../../../assets/images/carritoWhite.png";
import iconMaps from "../../../assets/images/Icono.png";
import logo from "../../../assets/images/logo.png";

import forma1 from "../../../assets/images/Forma 1.png";
import iconFarmacia from "../../../assets/images/Grupo 79.png";

import Trazado230 from "../../../assets/images/Trazado 230.png";
import lupa from "../../../assets/images/Lupa.png";

import Login from "../modales/Login";
import Registro from "../modales/Registro";
import { GET_AUTH } from "../../../redux/actions/UsuarioActions";
import Carrito from "../compras/Carrito";

import axios from "axios";
import { apiFarmageo } from "../../../config";
import ReactGA from "react-ga";

class NavPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria: "all",
      farmacia: null,
      ubicacion_default: "",
      showCarrito: false,
      search: "producto",
      txtbusqueda: this.props.txtbusqueda
    };
    this.handleCategoria = this.handleCategoria.bind(this);
    this.handleSeccionCategorias = this.handleSeccionCategorias.bind(this);
    this.handlequery = this.handlequery.bind(this);
    this.handleCarrito = this.handleCarrito.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.props.GET_AUTH();
    this.googleAnalytics = this.googleAnalytics.bind(this);
  }

  googleAnalytics() {
    ReactGA.initialize("G-6DDCQD6XV5");
    ReactGA.pageview(window.location.href);
  }

  handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  handleSearch() {
    const { search, txtbusqueda } = this.state;
    if (search === "farmacia") {
      window.location.href =
        `${process.env.PUBLIC_URL}/#/buscarfarmacia?f=` + txtbusqueda;
    } else if (search === "producto") {
      window.location.href =
        `${process.env.PUBLIC_URL}/#/buscarproductos?p=` + txtbusqueda;
    }
  }

  handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async componentDidMount() {
    this.googleAnalytics();

    var farmacia = this.handlequery().get("u");
    this.props.GET_CATEGORIAS();
    var ubicacion_default = await sessionStorage.getItem("ubicacion_default");
    if (ubicacion_default) {
      this.setState({
        ubicacion_default: ubicacion_default,
        farmacia
      });
    }
    var farmacia = this.handlequery().get("u");
    if (farmacia) {
      try {
        const result = await axios.get(apiFarmageo + "/farmacias/" + farmacia);
        if (result.data) {
          this.setState({ farmaciaSelected: result.data });
        }
      } catch (error) {
        this.setState({ farmaciaSelected: null });
      }
    }
  }

  handleCategoria(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    this.setState({
      categoria: value
    });
    this.handleSeccionCategorias(value);
  }

  handleSeccionCategorias(categoria) {
    const { farmacia } = this.state;
    this.props.SET_CATEGORIA(categoria);
    if (farmacia) {
      window.location.href = `${process.env.PUBLIC_URL}/#/farmprodcat?u=${farmacia}`;
    }
  }

  handleCarrito() {
    this.setState(prevState => ({
      showCarrito: !prevState.showCarrito
    }));
  }

  render() {
    const { categorias, categoriaFiltro } = this.props.ProductosReducer;
    const { auth, user_farmageo } = this.props.UsuarioReducer;
    const { carrito } = this.props.PedidosReducer;
    const { showCarrito, farmaciaSelected, search } = this.state;

    return (
      <>
        {/*<!-- nav cuando scrollea-->*/}
        <div className="row hide-mobile">
          <div
            className="col-md-12"
            style={{
              position: "fixed",
              zIndex: 100,
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
                    {farmaciaSelected
                      ? "Farmacia " +
                      farmaciaSelected.nombre +
                      ", " +
                      farmaciaSelected.localidad +
                      ", Santa Fe"
                      : ""}
                  </a>
                </div>
                <div className="col-4 py-1">
                  <a
                    className="nav-link nav-farmageo-item"
                    onClick={this.handleCarrito}
                  >
                    <p className="only-desktop">Mi carrito </p>
                    <img alt="" src={iconCarritoWhite} className="icon" />
                    <p className="d-inline">{carrito.length}</p>
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
                  {this.state.ubicacion_default}
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
                    {farmaciaSelected ? (
                      farmaciaSelected.perfil_farmageo !==
                        "vender_online" ? null : this.state.showcategorias ? (
                          <>
                            <li
                              className="nav-item hide-desktop"
                              style={{ fontSize: 11 }}
                            >
                              <select
                                value={categoriaFiltro}
                                onChange={this.handleCategoria}
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
                                        key={"a" + i}
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
                                        this.handleSeccionCategorias(cat._id)
                                      }
                                      key={"b" + i}
                                      style={{ color: "#ababa1", fontSize: 11 }}
                                    >
                                      {cat.nombre}
                                    </a>
                                  </li>
                                ) : null;
                              })
                              : null}
                          </>
                        ) : null
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
                        Blog
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
            <button onClick={this.handleCarrito} className="btn-carrito-mob">
              <img alt="" src={iconCarrito} className="icon" />
              <p className="d-inline">{carrito.length}</p>
            </button>
          </div>
        </div>
        {/*<!-- FIN nav parte superior -->*/}

        {/*<!-- nav parte central -->*/}
        <div className="row pt-4 pb-2 nav-central">
          <div className="col-md-4 hide-mobile">
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
                        onClick={() =>
                          this.setState({ search: "farmacia", txtbusqueda: "" })
                        }
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
                        onClick={() =>
                          this.setState({ search: "producto", txtbusqueda: "" })
                        }
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
                  onChange={this.handleInputChange}
                  name="txtbusqueda"
                  value={this.state.txtbusqueda}
                />
              </div>
              <div className="d-inline search-lupa" onClick={this.handleSearch}>
                <img alt="" src={lupa} alt="" id="icono-lupa" />
              </div>
            </div>
          </div>
          <div className="col-md-3 hide-mobile" align="center">
            <button className="carrito" onClick={this.handleCarrito}>
              Mi carrito <img alt="" src={iconCarrito} id="icon-carrito" />
            </button>
          </div>
        </div>
        {/*<!-- FIN nav central -->*/}

        {farmaciaSelected ? (
          farmaciaSelected.perfil_farmageo !== "vender_online" ? null : (
            <div className="row d-flex   py-0 nav-inferior">
            <div className="col-md-2   hide-mobile" align="center">
              <select
                className="categoria-select py-3"
                value={categoriaFiltro}
                onChange={this.handleCategoria}
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
                        onClick={() => this.handleSeccionCategorias(cat._id)}
                        key={i}
                      >
                        {cat.nombre}
                      </button>
                    </div>
                  ) : null;
                })
              : null}
          </div>
          )
        ) : null}
        <Carrito show={showCarrito} />
        <Login />
        <Registro />
        {/*<SeleccionarUbicacion />*/}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ProductosReducer: state.ProductosReducer,
    UsuarioReducer: state.UsuarioReducer,
    PedidosReducer: state.PedidosReducer
  };
};

const mapDispatchToProps = {
  GET_CATEGORIAS,
  SET_CATEGORIA,
  GET_AUTH
};

export default connect(mapStateToProps, mapDispatchToProps)(NavPerfil);

//export default Nav;