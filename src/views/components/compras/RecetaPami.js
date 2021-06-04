import React, { Component } from "react";
import axios from "axios";
import { apiFarmageo, image_path_server } from "../../../config";

import "../../../css/farmacias.css";
import FooterHome from "../footers/FooterHome";
import Suscribite from "../home/Suscribite";
import {
  AGREGAR_ITEM_CARRITO,
  CREATE_PEDIDO,
  CONFIRMAR_PEDIDO,
} from "../../../redux/actions/PedidosActions";
import { connect } from "react-redux";
import ImgUploader from "./ImgUploader";

class RecetaPami extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      farmaciaSelected: null,
      uFarmacia: "",
      comentarios: "",
    };
  }

  handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    var farmacia = this.handlequery().get("u");
    if (farmacia) {
      try {
        const result = await axios.get(apiFarmageo + "/farmacias/" + farmacia);
        if (result.data) {
          this.setState({ farmaciaSelected: result.data, uFarmacia: farmacia });
        }
      } catch (error) {
        this.setState({ farmaciaSelected: null, uFarmacia: farmacia });
      }
    }
  }

  handleImg = (img, name, nombreArchivo) => {
    this.setState({
      [name]: { img, nombre: nombreArchivo },
    });
  };

  handleInputChange = (event) => {
    const target = event.nativeEvent.target;
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSiguiente = async () => {
    const { user_farmageo } = this.props.UsuarioReducer;
    const { farmaciaSelected, frente, dorso, receta, comentarios } = this.state;

    this.props.CONFIRMAR_PEDIDO({
      username: user_farmageo.usuario,
      descripcion: "recetaPami",
      comentarios: comentarios,
      idfarmacia: farmaciaSelected.farmaciaid,
      idsocio: user_farmageo._id,
      envio: false,
      costoenvio: 0,
      pago_online: false,
      gruposproductos: [
        {
          receta: image_path_server + receta.img,
        },
      ],
      domicilioenvio: "",
      nombrefarmacia: farmaciaSelected.nombre,
      whatsapp: user_farmageo.telephone,
      emailFarmacia: farmaciaSelected.email,
    });
  };

  render() {
    const { farmaciaSelected, uFarmacia, receta } = this.state;
    return farmaciaSelected === null ? null : (
      <>
        <div>
          <div className="container-fluid  centrado my-5 ">
            <div className="row">
              <div className="col" align="left">
                <p className="d-inline">
                  Farmacia {farmaciaSelected.nombre} {" > "}
                  <b>Receta pami</b>
                </p>
                <h4 className="mt-3">
                  <b>Para presupuestar tu pedido completá el formulario</b>
                </h4>
              </div>
            </div>

            <div className="row my-5" align="left">
              <div className="col-sm-6">
                <p className="d-inline text-info">Agrega una imagen</p>
                <br />
                <h4 className="d-inline">
                  <b>Receta</b>
                </h4>
                <small className="d-block">
                  Subí una foto (legible) de la receta(máx 2MB)
                </small>

                <div className="mt-4">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-sm-6 ">
                        Subir receta<span className="text-danger">*</span>
                        <ImgUploader
                          value={receta ? receta.nombre : ""}
                          name="receta"
                          handleImg={this.handleImg}
                        />
                      </div>
                      <div className="col-sm-6 ">
                        ¿Querés aclarar algo?
                        <span className="text-danger">*</span>
                        <input
                          type="text"
                          className="form-control"
                          name="comentarios"
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row my-4">
                      <div align="right">
                        <a
                          className="btn btn-add-to-car mx-2"
                          style={{ color: "white" }}
                          href={
                            process.env.PUBLIC_URL +
                            "/#/farmaciaperfil?u=" +
                            uFarmacia
                          }
                        >
                          Volver
                        </a>
                        <button
                          className="btn btn-add-to-car mx-2"
                          style={{ color: "white" }}
                          onClick={this.handleSiguiente}
                          disabled={!receta}
                        >
                          Siguiente
                        </button>
                      </div>
                    </div>
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
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {
  AGREGAR_ITEM_CARRITO,
  CREATE_PEDIDO,
  CONFIRMAR_PEDIDO,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecetaPami);
