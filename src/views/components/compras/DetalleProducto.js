import React, { Component } from "react";
import axios from "axios";
import { apiFarmageo, image_path_server } from "../../../config";

import "../../../css/farmacias.css";
import FooterHome from "../footers/FooterHome";
import Suscribite from "../home/Suscribite";
import TabsProductosRelacionados from "../farmaciaPerfil/TabsProductosRelacionados";
import {
  AGREGAR_ITEM_CARRITO,
  CREATE_PEDIDO
} from "../../../redux/actions/PedidosActions";
import { connect } from "react-redux";
import FarmaciasCercanas from "../home/FarmaciasCercanas/FarmaciasCercanas";
import { FarmaciaVendeElProducto } from "../../helpers/FarmaciaHelpers";

class DetalleProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      farmaciaSelected: null,
      productoSelected: null,
      cantidad: 1,
      ufarmacia: null,
      p: null
    };
  }

  handleCantidad = i => {
    if (i === "+") {
      this.setState(prevState => ({
        cantidad: prevState.cantidad + 1
      }));
    } else {
      this.setState(prevState => ({
        cantidad:
          prevState.cantidad > 1 ? prevState.cantidad - 1 : prevState.cantidad
      }));
    }
  };

  handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  componentDidMount() {
    this.handleGetFarmacia();
  }
  componentDidUpdate(prevProps, prevState) {
    var farmacia = this.handlequery().get("u");
    var productoSelected = this.handlequery().get("p");
    if (prevState.ufarmacia !== farmacia) {
      this.handleGetFarmacia();
    }
    if (prevState.p !== productoSelected) {
      this.handleGetProducto();
    }
  }
  handleGetFarmacia = async () => {
    var farmacia = this.handlequery().get("u");
    if (farmacia) {
      try {
        const result = await axios.get(apiFarmageo + "/farmacias/" + farmacia);
        if (result.data) {
          await this.setState({
            farmaciaSelected: result.data,
            ufarmacia: farmacia
          });
          this.handleGetProducto();
        }
      } catch (error) {
        this.setState({ farmaciaSelected: null, ufarmacia: farmacia });
      }
    } else {
      this.setState({ farmaciaSelected: null, ufarmacia: null });
    }
  };

  handleGetProducto = async () => {
    var productoSelected = this.handlequery().get("p");
    if (productoSelected) {
      try {
        const result = await axios.get(
          apiFarmageo + "/productospack/" + productoSelected
        );
        if (result.data) {
          await this.setState({
            productoSelected: result.data,
            p: productoSelected
          });
        } else {
          var productos_propios = await this.state.farmaciaSelected.productos.filter(
            p => p._id === productoSelected
          );
          if (productos_propios.length > 0) {
            await this.setState({
              productoSelected: productos_propios[0],
              p: productoSelected
            });
          }
        }
      } catch (error) {
        console.log(console.error);
      }
    }
  };

  handleAddItem = async () => {
    const { cantidad, productoSelected, farmaciaSelected } = this.state;
    const { pedido } = this.props.PedidosReducer;
    if (farmaciaSelected && productoSelected) {
      if (pedido === null || pedido.idfarmacia !== farmaciaSelected.matricula) {
        await this.props.CREATE_PEDIDO(farmaciaSelected, "productos");
        this.props.AGREGAR_ITEM_CARRITO(productoSelected, cantidad);
      } else {
        this.props.AGREGAR_ITEM_CARRITO(productoSelected, cantidad);
      }
    }
  };

  parseDescripcion(txt) {
    if (txt) {
      return txt;
    }
  }

  render() {
    const { farmaciaSelected, productoSelected, cantidad } = this.state;
    return farmaciaSelected === null || productoSelected === null ? (
      <>
        <h4 className="text-center my-3">
          Selecciona la farmacia donde quieres comprar el producto
        </h4>
        <FarmaciasCercanas
          nextPage={`detalleprod?p=${this.handlequery().get("p")}&u=`}
          filtroPerfilFarmageo={"vender_online"}
        />
      </>
    ) : (
      <>
        <div>
          <div className="container-fluid  centrado my-5 ">
            <div className="row">
              <div className="col" align="left">
                <p>
                  <a
                    href={
                      process.env.PUBLIC_URL +
                      "/#/farmaciaperfil?u=" +
                      farmaciaSelected.usuario
                    }
                    className="text-info"
                  >
                    Farmacia {farmaciaSelected.nombre}
                  </a>
                </p>
              </div>
            </div>
            {!FarmaciaVendeElProducto(farmaciaSelected, productoSelected) ? (
              <div className="row ">
                <div className="col" align="center">
                  <p className="text-danger">
                    La farmacia no vende este producto
                  </p>
                  <a
                    className="btn btn-add-to-car"
                    style={{ color: "white" }}
                    href={"javascript:history.back()"}
                  >
                    Volver
                  </a>
                </div>
              </div>
            ) : (
              <div className="row ">
                <div className="col-md-4 col-4" align="right">
                  <img
                    src={image_path_server + productoSelected.imagen}
                    alt=""
                    style={{ height: "25vw", maxWidth: "100%" }}
                  />
                </div>
                <div className="col-md-4 col-8 detalle-producto">
                  <p id="nombre">{productoSelected.nombre}</p>
                  <p id="precio">${productoSelected.precio}</p>
                  <p id="descripcion">Descripción</p>
                  <small>
                    {this.parseDescripcion(productoSelected.descripcion)}
                  </small>
                  <p className="mt-3">Cantidad</p>
                  <div className="row">
                    <div className="col-lg-5 mt-1">
                      <div className="cantidades-control btn" align="center">
                        <button onClick={() => this.handleCantidad("-")}>
                          -
                        </button>
                        <span style={{ width: "50px" }}>{cantidad}</span>
                        <button onClick={() => this.handleCantidad("+")}>
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <button
                        className="d-inline btn btn-add-to-car "
                        onClick={this.handleAddItem}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
            )}

            <div className="row">
              <div className="col">
                <TabsProductosRelacionados
                  excepcionesEntidadesFarmageo={
                    farmaciaSelected.excepcionesEntidadesFarmageo
                  }
                  excepcionesProdFarmageo={
                    farmaciaSelected.excepcionesProdFarmageo
                  }
                  farmacia={farmaciaSelected.usuario}
                  textbuscador={productoSelected.nombre.split(" ")[0]}
                />
              </div>
            </div>
          </div>

          <Suscribite />
        </div>
        <FooterHome />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    PedidosReducer: state.PedidosReducer
  };
};

const mapDispatchToProps = {
  AGREGAR_ITEM_CARRITO,
  CREATE_PEDIDO
};

export default connect(mapStateToProps, mapDispatchToProps)(DetalleProducto);
