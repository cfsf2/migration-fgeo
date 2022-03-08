import React, { Component } from "react";
import { connect } from "react-redux";

//import grupo507 from "../../../../assets/images/Grupo 507.png";
import grupo379 from "../../../../assets/images/Grupo 379.png";
import presion from "../../../../assets/images/presion.png";
import grupo9 from "../../../../assets/images/Grupo 9.png";
import inyeccion from "../../../../assets/images/inyeccion.png";

import grupo41 from "../../../../assets/images/Trazado 41.png";

import alarmaRoja from "../../../../assets/images/Grupo 294.png";
import alarmaVerde from "../../../../assets/images/Grupo 293.png";

import { GET_FARMACIAS } from "../../../../redux/actions/FarmaciasActions";
import Pagination from "react-js-pagination";

import {
  checkServicio,
  checkFranjaHoraria,
  checkIsOpen,
} from "../../../helpers/FarmaciaHelpers";

class ItemFarmacia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: { msg: "...", status: false },
    };
    this.handleIsOpen = this.handleIsOpen.bind(this);
  }

  async componentDidMount() {
    this.handleIsOpen();
  }

  async handleIsOpen() {
    const { info } = this.props;
    var isOpen = await checkIsOpen(info.horarios);
    this.setState({ isOpen });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.info !== this.props.info) {
      this.handleIsOpen();
    }
  }

  render() {
    const { info } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="col-md-4 my-2">
        <div className="container-fluid sombreado">
          <div className="row">
            <div className="col" align="left">
              {checkServicio("deturno", info.servicios) ? (
                <img
                  src={alarmaVerde}
                  style={{ width: "20px" }}
                  alt="de turno"
                />
              ) : (
                <img src={alarmaRoja} style={{ width: "20px" }} />
              )}
            </div>
            <div className="col" align="right">
              <p className="d-inline">{isOpen.msg + " "}</p>
              {isOpen.status ? (
                <img src={grupo41} style={{ width: "20px" }} />
              ) : (
                <div className="isclosed"></div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col" align="center">
              <h1>Farmacia</h1>
              <h2>{info.nombre}</h2>
              <p style={{ fontSize: 10 }}>
                {info.calle +
                  " " +
                  info.numero +
                  ", " +
                  info.localidad +
                  ", SANTA FÉ"}
              </p>
            </div>
          </div>

          <div className="row centrado-2">
            <div className="col"></div>
            <div className="col">
              <img
                src={grupo379}
                className="icons-listado"
                style={{
                  opacity: checkServicio("whatsapp", info.servicios) ? 1 : 0.2,
                }}
              />
            </div>
            <div className="col">
              <img
                src={presion}
                className="icons-listado"
                style={{
                  opacity: checkServicio("presion", info.servicios) ? 1 : 0.2,
                }}
              />
            </div>
            <div className="col">
              <img
                src={grupo9}
                className="icons-listado"
                style={{
                  opacity: checkServicio("violeta", info.servicios) ? 1 : 0.2,
                }}
              />
            </div>
            <div className="col">
              <img
                src={inyeccion}
                className="icons-listado"
                style={{
                  opacity: checkServicio("inyeccion", info.servicios) ? 1 : 0.2,
                }}
              />
            </div>
            <div className="col"></div>
          </div>

          <div
            className="row centrado-2 mt-3 pt-3"
            style={{ borderTop: "solid 1px #7a7a7a", fontSize: 10 }}
          >
            <div className="col-3">{info.distancia} </div>
            {info.tiempotardanza === "15 minutos" ? null : (
              <div className="col-5">{info.tiempotardanza} tiempo entrega</div>
            )}

            {info.costoenvio === 0 ? null : (
              <div className="col-4">${info.costoenvio} costo de envío</div>
            )}
          </div>
          <div className="row mt-3 pt-2" align="center">
            <div className="col px-0">
              <a
                className="btn btn-ir-a-farmacia"
                href={
                  /* this.props.nextPage === "farmprodcat"
                    ? process.env.PUBLIC_URL +
                      "/#/farmprodcat?u=" +
                      info.usuario
                    : process.env.PUBLIC_URL +
                      "/#/farmaciaperfil?u=" +
                      info.usuario*/
                  process.env.PUBLIC_URL +
                  `/#/${this.props.nextPage}` +
                  info.usuario
                }
              >
                Ver farmacia
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ListadoFarmacias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 6,
      activePage: 1,
      farmacias: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.props.GET_FARMACIAS();
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber,
      max: pageNumber * 6,
      min: pageNumber * 6 - 6,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { farmacias } = this.props.FarmaciasReducer;
    const {
      filtroServicio,
      filtroHorario,
      localidad,
      search_farmacia,
      filtroPerfilFarmageo,
    } = this.props;
    if (
      farmacias !== prevProps.FarmaciasReducer.farmacias ||
      filtroServicio !== prevProps.filtroServicio ||
      filtroHorario !== prevProps.filtroHorario ||
      localidad !== prevProps.localidad ||
      search_farmacia !== prevProps.search_farmacia ||
      filtroPerfilFarmageo !== prevProps.filtroPerfilFarmageo
    ) {
      this.setState({
        farmacias: farmacias.filter((f) => {
          return (
            checkServicio(filtroServicio, f.servicios) &&
            checkFranjaHoraria(filtroHorario, f.horarios) &&
            f.localidad == localidad &&
            f.nombre.toLowerCase().includes(search_farmacia.toLowerCase()) &&
            f.perfil_farmageo.includes(filtroPerfilFarmageo)
          );
        }).sort((a, b) => a.perfil_farmageo > b.perfil_farmageo ? -1 : (a.perfil_farmageo < b.perfil_farmageo ? 1 : 0)),
        min: 0,
        max: 6,
        activePage: 1,
      });
    }
  }

  render() {
    //const { farmacias } = this.props.FarmaciasReducer;
    const { min, max, farmacias, loading } = this.state;
    return (
      <>
        <div
          className="row centrado-2 listado"
          onLoad={() => this.setState({ loading: false })}
        >
          {loading ? (
            <div className="col text-center my-5 py-5">
              <div className="loader">Loading...</div>
            </div>
          ) : null}
          {farmacias.slice(min, max).map((farmacia, index) => {
            return (
              <ItemFarmacia
                info={farmacia}
                key={index}
                nextPage={this.props.nextPage}
              />
            );
          })}
        </div>
        <div className="row centrado-2">
          <div className="col">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={6}
              totalItemsCount={farmacias.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    FarmaciasReducer: state.FarmaciasReducer,
  };
};

const mapDispatchToProps = {
  GET_FARMACIAS,
};
export default connect(mapStateToProps, mapDispatchToProps)(ListadoFarmacias);
