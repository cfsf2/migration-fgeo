import React, { Component } from "react";
import axios from "axios";
import { apiFarmageo } from "../../../config";
import "../../../css/farmacias.css";
import FooterHome from "../footers/FooterHome";
import Suscribite from "../home/Suscribite";
import { CONFIRMAR_PEDIDO } from "../../../redux/actions/PedidosActions";
import { connect } from "react-redux";
import naranja from "../../../assets/images/naranja.png";
import american from "../../../assets/images/american.png";
import visa from "../../../assets/images/visa.png";
import mastercard from "../../../assets/images/mastercard.png";
import todopago from "../../../assets/images/todopago.png";
import mercadopago from "../../../assets/images/mercadopago.png";
import pluspagos from "../../../assets/images/pluspagos.png";
import cabal from "../../../assets/images/cabal.png";

class DetallesDePago extends Component {
  constructor(props) {
    super(props);
    const { user_farmageo, auth } = this.props.UsuarioReducer;
    this.state = {
      subtotal: 0,
      user: user_farmageo
        ? {
            name: user_farmageo.name ? user_farmageo.name : "",
            apellido: user_farmageo.apellido ? user_farmageo.apellido : "",
            localidad: user_farmageo.localidad ? user_farmageo.localidad : "",
            telephone: user_farmageo.telephone ? user_farmageo.telephone : "",
            email: user_farmageo.email ? user_farmageo.email : "",
            pais: user_farmageo.pais ? user_farmageo.pais : "Argentina",
            provincia: user_farmageo.provincia
              ? user_farmageo.provincia
              : "Santa Fe",
            username: user_farmageo.usuario
              ? user_farmageo.usuario
              : "No Registrado",
            _id: user_farmageo._id,
            mediopago: null,
          }
        : {
            name: "",
            apellido: "",
            localidad: "",
            telephone: "",
            email: "",
            pais: "Argentina",
            provincia: "Santa Fe",
            username: "No Registrado",
            _id: "No Registrado",
            mediopago: null,
          },
    };
    this.calcularTotal = this.calcularTotal.bind(this);
    this.handlequery = this.handlequery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getIconTarjeta = this.getIconTarjeta.bind(this);
  }

  handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  }

  handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  async componentDidMount() {
    this.calcularTotal();
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

  async componentDidUpdate(prevProps, prevState) {
    const { carrito } = this.props.PedidosReducer;
    const { user_farmageo } = this.props.UsuarioReducer;
    if (prevProps.PedidosReducer.carrito != carrito) {
      this.calcularTotal();
    }
    if (prevProps.UsuarioReducer.user_farmageo != user_farmageo) {
      this.setState({
        user: user_farmageo
          ? {
              name: user_farmageo.name ? user_farmageo.name : "",
              apellido: user_farmageo.apellido ? user_farmageo.apellido : "",
              localidad: user_farmageo.localidad ? user_farmageo.localidad : "",
              telephone: user_farmageo.telephone ? user_farmageo.telephone : "",
              email: user_farmageo.email ? user_farmageo.email : "",
              pais: user_farmageo.pais ? user_farmageo.pais : "Argentina",
              provincia: user_farmageo.provincia
                ? user_farmageo.provincia
                : "Santa Fe",
              username: user_farmageo.usuario
                ? user_farmageo.usuario
                : "No Registrado",
              _id: user_farmageo._id,
            }
          : {
              name: "",
              apellido: "",
              localidad: "",
              telephone: "",
              email: "",
              pais: "Argentina",
              provincia: "Santa Fe",
              username: "No Registrado",
              _id: "No Registrado",
            },
      });
    }
  }

  async calcularTotal() {
    const { carrito } = this.props.PedidosReducer;
    let subtotal = 0;
    await carrito.map((linea) => {
      return (subtotal += linea.precio * linea.cantidad);
    });
    this.setState({ subtotal: subtotal.toFixed(2) });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user_farmageo, auth } = this.props.UsuarioReducer;
    const { farmaciaSelected, user, subtotal } = this.state;
    const { carrito } = this.props.PedidosReducer;

    this.props.CONFIRMAR_PEDIDO({
      username: user.username,
      descripcion: "productos",
      comentarios: "",
      idfarmacia: farmaciaSelected.farmaciaid,
      idsocio: user._id,
      envio: user.envio,
      costoenvio: 0,
      pago_online: false,
      gruposproductos: [
        {
          productos: carrito,
          precio: subtotal,
        },
      ],
      domicilioenvio:
        user.direccion +
        " " +
        user.piso +
        ", " +
        user.localidad +
        ", " +
        user.provincia,
      nombrefarmacia: farmaciaSelected.nombre,
      whatsapp: user.telephone,
      emailFarmacia: farmaciaSelected.email,
      es_invitado: auth ? false : true,
      datos_cliente: [
        {
          nombre: user.name,
          apellido: user.apellido,
          email: user.email,
        },
      ],
      ufarmacia: farmaciaSelected.usuario,
    });
  }

  getIconTarjeta(tarjeta) {
    switch (tarjeta) {
      case "naranja":
        return naranja;
      case "american":
        return american;
      case "mercadopago":
        return mercadopago;
      case "pluspagos":
        return pluspagos;
      case "visa":
        return visa;
      case "mastercard":
        return mastercard;
      case "cabal":
        return cabal;
      case "todopago":
        return todopago;
      default:
        return naranja;
    }
  }
  render() {
    const { pedido, carrito } = this.props.PedidosReducer;
    const { user, farmaciaSelected } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div className="container-fluid my-5 titles-compras-mob">
            <div className="row">
              <div className="col ">
                <h3 align="center" style={{ fontWeight: "lighter" }}>
                  Carrito de compras {">"}{" "}
                  <b style={{ fontWeight: "bold" }}> Detalles de pago</b> {">"}{" "}
                  Pedido completado
                </h3>
              </div>
            </div>

            <div className="row centrado my-5">
              <div className="col-md-6">
                <h1 id="Numerogris" className="d-inline">
                  1.
                </h1>
                <div className="d-inline">
                  <h4 className="d-inline">
                    <b>DETALLES DE FACTURACIÓN</b>
                  </h4>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-sm-6 my-1">
                        Nombre<span className="text-danger">*</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="name"
                          value={user.name}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-sm-6 my-1">
                        Apellido<span className="text-danger">*</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="apellido"
                          value={user.apellido}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      {/*} <div className="col-sm-3 my-1">
                        País
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="pais"
                          value={user.pais}
                          onChange={this.handleInputChange}
                        />
                      </div>*/}
                      <div className="col-sm-4 my-1">
                        Provincia
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="provincia"
                          value={user.provincia}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="col-sm-4 my-1">
                        Ciudad
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="localidad"
                          value={user.localidad}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-sm-4 my-1">
                        cp <span className="text-danger">*</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="cp"
                          value={user.cp}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-sm-6 my-1">
                        Dirección de la calle{" "}
                        <span className="text-danger">*</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="direccion"
                          value={user.direccion}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-sm-6 my-1">
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Departamento, piso, etc"
                          name="piso"
                          value={user.piso}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="col-sm-6 my-1">
                        Teléfono<span className="text-danger">*</span>
                        <input
                          type="text"
                          className="form-control"
                          name="telephone"
                          value={user.telephone}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-sm-6 my-1">
                        Email
                        <span className="text-danger">*</span>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          value={user.email}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-sm-12 my-1">
                        <a
                          className="btn btn-add-to-car "
                          style={{ color: "white" }}
                          href={
                            process.env.PUBLIC_URL +
                            "/#/revisarpedido?u=" +
                            farmaciaSelected?.usuario
                          }
                        >
                          Paso anterior
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div align="left"></div>
              </div>
              <div className="col-md-4">
                <h1 id="Numerogris" className="d-inline">
                  2.
                </h1>
                <div className="d-inline ml-3">
                  <p className="d-inline">
                    Estás comprando en {pedido ? pedido.nombrefarmacia : ""}
                  </p>

                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <h4 className="d-inline">
                          <b>TU PEDIDO</b>
                        </h4>
                      </div>
                    </div>
                    {carrito.map((linea, i) => {
                      return (
                        <div
                          className="row"
                          key={i}
                          style={{
                            fontSize: 12,
                            marginTop: 5,
                            fontWeight: "bold",
                          }}
                        >
                          <div className="col">
                            ({linea.cantidad}) {linea.nombre}
                          </div>
                          <div className="col" align="right">
                            ${linea.precio}
                          </div>
                        </div>
                      );
                    })}
                    <div
                      className="row mt-4"
                      style={{
                        fontSize: 12,
                        marginTop: 5,
                        fontWeight: "bold",
                      }}
                    >
                      <div className="col">Subotal</div>
                      <div className="col" align="right">
                        ${this.state.subtotal}
                      </div>
                    </div>

                    <div
                      className="row mt-4"
                      style={{
                        fontSize: 12,
                        marginTop: 5,
                        fontWeight: "bold",
                      }}
                    >
                      <div className="col-12">Envío</div>

                      <div className="col-12">
                        {farmaciaSelected ? (
                          farmaciaSelected.nohagoenvios ? null : (
                            <>
                              <input
                                type="radio"
                                name="envio"
                                value={true}
                                className="mx-2 mt-3"
                                onChange={this.handleInputChange}
                                required
                              />
                              <label>Con envío</label>
                            </>
                          )
                        ) : null}
                        <br />
                        <input
                          type="radio"
                          name="envio"
                          value={false}
                          className="mx-2"
                          onChange={this.handleInputChange}
                          required
                        />
                        <label>Retiro en farmacia</label>
                        <br />
                      </div>
                    </div>

                    <div
                      className="row mt-4"
                      style={{
                        fontSize: 18,
                        marginTop: 5,
                        fontWeight: "bold",
                        color: "#51A8C4",
                      }}
                    >
                      <div className="col-6">Total</div>
                      <div className="col-6" align="right">
                        ${this.state.subtotal}
                      </div>
                    </div>
                    <div
                      className="row mt-2 pt-2"
                      style={{
                        fontSize: 18,
                        marginTop: 5,
                        fontWeight: "bold",
                        borderTop: "solid 1px black",
                      }}
                    >
                      <div className="col-12">¿Cómo lo querés pagar?</div>
                    </div>
                    <div
                      className="row mt-2"
                      style={{
                        fontSize: 12,
                        marginTop: 5,
                        fontWeight: "bold",
                      }}
                    >
                      <div className="col-12">
                        <input
                          type="radio"
                          name="mediopago"
                          value="transferencia"
                          className="mx-2 mt-3"
                          onChange={this.handleInputChange}
                          required
                        />
                        <label>Transferencia</label>
                      </div>
                      <div className="col-12">
                        <input
                          type="radio"
                          name="mediopago"
                          value="efectivo"
                          className="mx-2 mt-3"
                          onChange={this.handleInputChange}
                          required
                        />
                        <label>Efectivo</label>
                      </div>
                      <div className="col-12">
                        <input
                          type="radio"
                          name="mediopago"
                          value="tarjetas"
                          className="mx-2 mt-3"
                          onChange={this.handleInputChange}
                          required
                        />
                        <label>Pagá con el método que prefieras</label>
                      </div>
                    </div>
                    {user.mediopago != "tarjetas" ? null : (
                      <div
                        className="row mt-2"
                        style={{
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        <div className="col-12">
                          <div className="row">
                            {farmaciaSelected
                              ? !farmaciaSelected.mediospagos
                                ? null
                                : farmaciaSelected.mediospagos.map((m, i) => {
                                    return (
                                      <div className="col-sm-3">
                                        <input
                                          type="radio"
                                          name="tarjetas"
                                          value={m}
                                          className="mx-2 mt-3"
                                          onChange={this.handleInputChange}
                                          required
                                        />
                                        <img
                                          src={this.getIconTarjeta(m)}
                                          alt=""
                                          className="w-100"
                                        />
                                      </div>
                                    );
                                  })
                              : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div align="right">
                  {/*  
                    <a
                      className="btn btn-add-to-car"
                      style={{ color: "white" }}
                      //href={process.env.PUBLIC_URL + "/#/confirmacionpedido"}
                      onClick={() => alert("falta terminar")}
                    >
                      Realizar pedido
                    </a>
                  */}
                  <button
                    className="btn btn-add-to-car"
                    type="submit"
                    disabled={carrito.length < 1}
                  >
                    FINALIZAR COMPRA
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Suscribite />
        </div>
        <FooterHome />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PedidosReducer: state.PedidosReducer,
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {
  CONFIRMAR_PEDIDO,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetallesDePago);
