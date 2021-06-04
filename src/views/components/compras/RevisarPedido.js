import React, { Component } from "react";
import { image_path_server } from "../../../config";

import "../../../css/farmacias.css";
import FooterHome from "../footers/FooterHome";
import Suscribite from "../home/Suscribite";
import imgBorrar from "../../../assets/images/Grupo 115.png";
import { BORRAR_ITEM_CARRITO } from "../../../redux/actions/PedidosActions";
import { connect } from "react-redux";

class RevisarPedido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtotal: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { carrito } = this.props.PedidosReducer;
    if (prevProps.PedidosReducer.carrito != carrito) {
      this.calcularTotal();
    }
  }

  componentDidMount() {
    this.calcularTotal();
  }

  calcularTotal = async () => {
    const { carrito } = this.props.PedidosReducer;
    let subtotal = 0;
    await carrito.map((linea) => {
      return (subtotal += linea.precio * linea.cantidad);
    });
    this.setState({ subtotal: subtotal.toFixed(2) });
  };

  render() {
    const { pedido, carrito } = this.props.PedidosReducer;
    return (
      <>
        <div>
          <div className="container-fluid my-5 titles-compras-mob">
            <div className="row">
              <div className="col">
                <h3 align="center" style={{ fontWeight: "lighter" }}>
                  <b style={{ fontWeight: "bold" }}>Carrito de compras</b> {">"}{" "}
                  Detalles de pago {">"} Pedido completado
                </h3>
              </div>
            </div>

            <div className="row centrado my-5 revisar-pedido-mobile">
              <div className="col-md-9 ">
                <div className="container-fluid sombreado ">
                  <div className="row p-1">
                    <div className="col-6">Producto</div>
                    <div className="col-2">Precio</div>
                    <div className="col-2">Cant.</div>
                    <div className="col-2">Subtotal</div>
                  </div>
                  {carrito.map((linea, i) => {
                    return (
                      <div
                        className="row mt-5 p-1"
                        style={{ fontWeight: "bold" }}
                        key={i}
                      >
                        <div className="col-6">
                          <img
                            src={imgBorrar}
                            alt=""
                            style={{ width: 20, margin: 5 }}
                            onClick={() => this.props.BORRAR_ITEM_CARRITO(i)}
                          />
                          <img
                            src={image_path_server + linea.imagen}
                            alt=""
                            style={{ width: 50, margin: 5 }}
                          />
                          <p
                            style={{
                              display: "inline",
                              fontSize: 12,
                            }}
                          >
                            {linea.nombre}
                          </p>
                        </div>
                        <div className="col-2">
                          <br />${linea.precio}
                        </div>
                        <div className="col-2">
                          <br />
                          {linea.cantidad}
                        </div>
                        <div className="col-2">
                          <br />${linea.subtotal}
                        </div>
                      </div>
                    );
                  })}
                  <div className="row p-2 pb-5">
                    <div className="col" align="right">
                      <a
                        className="btn btn-add-to-car"
                        style={{ color: "white" }}
                        //href={'javascript:history.back()'}
                        href={`${process.env.PUBLIC_URL}/#/farmaciaperfil?u=${pedido.uFarmacia}`}
                      >
                        Continuar comprando
                      </a>
                    </div>
                    <div className="col " align="left">
                      <button
                        className="btn btn-add-to-car "
                        onClick={this.calcularTotal}
                      >
                        Actualizar carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-2 px-4 sombreado" align="left">
                <b style={{ fontSize: 15 }}>
                  Resumen de tu pedido en{" "}
                  <p style={{ color: "#51A8C4" }}>
                    Farmacia {pedido ? pedido.nombrefarmacia : ""}
                  </p>
                </b>
                <div className="row mt-4" style={{ fontSize: 20 }}>
                  <div className="col">Subtotal</div>
                  <div className="col">
                    <b>${this.state.subtotal}</b>
                  </div>
                </div>
                <div className="row" style={{ fontSize: 20 }}>
                  <div className="col">
                    <p style={{ color: "#51A8C4" }}>Total</p>
                  </div>
                  <div className="col">
                    <b>${this.state.subtotal}</b>
                  </div>
                </div>
                <div className="row px-2">
                  <div className="col px-5 " align="center">
                    <a
                      className="btn btn-add-to-car mx-4"
                      href={
                        process.env.PUBLIC_URL +
                        "/#/detallespago?u=" +
                        pedido.uFarmacia
                      }
                    >
                      Realizar pedido
                    </a>
                  </div>
                </div>
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

const mapStateToProps = (state) => {
  return {
    PedidosReducer: state.PedidosReducer,
  };
};

const mapDispatchToProps = {
  BORRAR_ITEM_CARRITO,
};

export default connect(mapStateToProps, mapDispatchToProps)(RevisarPedido);
