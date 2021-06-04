import React, { Component } from "react";

import trazado5 from "../../../assets/images/Trazado 5.png";
import trazado276 from "../../../assets/images/Trazado 276.png";
import Icono2 from "../../../assets/images/Icono2.png";
import star from "../../../assets/images/star.png";
import tel from "../../../assets/images/tel.png";
import map from "../../../assets/images/map.png";
import reloj from "../../../assets/images/reloj.png";
import camion from "../../../assets/images/camion.png";

import alarmaRoja from "../../../assets/images/Grupo 294.png";
import alarmaVerde from "../../../assets/images/Grupo 293.png";

import { checkIsOpen, checkServicio } from "../../helpers/FarmaciaHelpers";
import Horarios from "./components/Horarios";
import { image_path_server } from "../../../config";

class HeaderFarmacia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: { msg: "", status: false },
      showHorarios: false,
    };
  }

  async componentDidMount() {
    const { farmaciaSelected } = this.props;
    var isOpen = await checkIsOpen(farmaciaSelected.horarios);
    this.setState({ isOpen });
  }

  handleShowHorarios = () => {
    this.setState((prevState) => ({
      showHorarios: !prevState.showHorarios,
    }));
  };

  getImgPerfil = (img) => {
    var i = `url(${image_path_server + img})`;
    if (img !== "") {
      return `url(${image_path_server + img})`;
    } else {
      return `url(${image_path_server + "farmacias/1615324307351-lg.jpg"})`;
    }
  };

  render() {
    const { farmaciaSelected } = this.props;
    const { isOpen, showHorarios } = this.state;
    return (
      <div className="row">
        <div className="col-md-12 p-0">
          <div className="container-fluid">
            <div
              className="row header-farmacia"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), ${this.getImgPerfil(
                  farmaciaSelected.imagen
                )}`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="col-md-6">
                {checkServicio("deturno", farmaciaSelected.servicios) ? (
                  <img src={alarmaVerde} id="icon-alarma" />
                ) : (
                  <img src={alarmaRoja} id="icon-alarma" alt="" />
                )}
                <h1>{farmaciaSelected.nombre}</h1>
                <div className="estado-farmacia">
                  {isOpen.status ? (
                    <img
                      src={trazado5}
                      className="d-inline estado-icon"
                      alt=""
                    />
                  ) : (
                    <div className="isclosed mr-3"></div>
                  )}
                  <h3 className="d-inline" onClick={this.handleShowHorarios}>
                    {isOpen.msg}
                  </h3>
                  <img
                    src={trazado276}
                    className="d-inline"
                    alt=""
                    onClick={this.handleShowHorarios}
                  />
                </div>
                {!showHorarios ? null : (
                  <Horarios horarios={farmaciaSelected.horarios} />
                )}
                <div className="row">
                  <div className="col-2">
                    <img src={Icono2} className="d-inline icon-avatar" alt="" />
                  </div>
                  <div className="col pt-3 titular-farmacia" align="left">
                    <span>{farmaciaSelected.nombrefarmaceutico}</span>
                    <span className="d-block">
                      Farmacéutico MAT. {farmaciaSelected.matricula}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-2 pb-4">
                    {/*<a href="#" className="link-habla">
                      Hablá con {farmaciaSelected.nombrefarmaceutico}
                      </a>*/}
                    <br />
                  </div>
                </div>
              </div>
              <div className="col-md-3"></div>
              <div className="col-md-2 hide-mobile">
                <img src={star} id="icon-star" alt="" />
              </div>
            </div>

            <div
              className="row pt-0 bg-claro centrado"
              align="left"
              id="info-header-farmacia"
            >
              <div className="col-3 py-4 ">
                <img src={tel} className="icon-info" alt="" />{" "}
                {farmaciaSelected.telefonofijo}
              </div>
              <div className="col-3 py-4 ">
                <img src={map} className="icon-info" />{" "}
                {farmaciaSelected.calle + " " + farmaciaSelected.numero}
              </div>
              <div className="col-3 py-4 ">
                <img src={reloj} className="icon-info" alt="" />{" "}
                {farmaciaSelected.tiempotardanza}
              </div>
              <div className="col-3 py-4 ">
                <img src={camion} className="icon-info-md" alt="" /> $
                {farmaciaSelected.costoenvio} envío
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderFarmacia;
