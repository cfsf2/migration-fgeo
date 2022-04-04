import React, { Component } from "react";
import { connect } from "react-redux";

import grupo2 from "../../../../assets/images/Grupo 2.png";
import grupo1 from "../../../../assets/images/Grupo 1.png";
import grupo3 from "../../../../assets/images/Grupo 3.png";
import pharmacy from "../../../../assets/images/mas-icon.png";
//import forma1 from "../../../../assets/images/Forma 1.png";
import iconFarmacia from "../../../../assets/images/Grupo 79.png";
import covid from "../../../../assets/images/covidtest.png";

//import Trazado230 from "../../../../assets/images/Trazado 230.png";
import lupa from "../../../../assets/images/Lupa.png";

import ListadoFarmacias from "./ListadoFarmacias";
import MapaFarmacias from "./MapaFarmacias";
import { localidades } from "../../../helpers/FarmaciaHelpers";
import UbicacionActualFarmacias from "../../../helpers/UbicacionActualFarmacias";
import {
  ELEGIR_LOCALIDAD,
  OBTENER_POSICION_ACTUAL,
} from "../../../../redux/actions/UsuarioActions";
import SelectFarm from "./SelectFarm";
import { getLatLong } from "../../../../DataFetcher/DFUbicationMap";

class FarmaciasCercanas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ver: "mapa",
      localidad: this.props.UsuarioReducer.localidad_default,
      geo: {
        lat: -32.949693,
        lng: -60.681875,
      },
      statusActualUbication: false,
      servicio: "all",
      horario: "all",
      search_farmacia: "",
      listado: true,
    };
    this.handleFiltros = this.handleFiltros.bind(this);
    this.handlequery = this.handlequery.bind(this);
  }

  handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  handleFiltros(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    if (name == "localidad") {
      this.props.ELEGIR_LOCALIDAD(value);
    }
  }

  handleSelect = (e, geo) => {
    this.setState({
      localidad: e.target.value,
      geo: {
        lat: geo.lat,
        lng: geo.lon,
      },
      statusActualUbication: false,
    });
  };

  handleActualPosition = (localidad) => {
    this.setState({
      localidad,
    });
  };

  handleActualUbication = (value) => {
    this.setState({
      statusActualUbication: value,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { localidad_default } = this.props.UsuarioReducer;
    var search_farmacia = await this.handlequery().get("f");

    if (search_farmacia === "") {
      if (prevState.search_farmacia !== search_farmacia) {
        this.setState({ search_farmacia });
      }
    }

    if (prevProps.UsuarioReducer.localidad_default !== localidad_default) {
      this.setState({ localidad: localidad_default });
    }

    if (search_farmacia && search_farmacia !== this.state.search_farmacia) {
      this.setState({ search_farmacia });
    }
    const search = this.handlequery().get("s");
    if (search) {
      setTimeout(() => {
        document.getElementById("cercanas-y-de-turno-banner").scrollIntoView();
      }, 3000);

      if (prevState.servicio !== search) {
        this.setState({ servicio: search });
      }
    }
  }

  async componentDidMount() {
    var search_farmacia = await this.handlequery().get("f");
    if (search_farmacia) {
      this.setState({ search_farmacia });
    }
    const search = this.handlequery().get("s");
    if (search) {
      setTimeout(() => {
        document.getElementById("cercanas-y-de-turno-banner").scrollIntoView();
      }, 3000);
      this.setState({ servicio: search });
    }
  }

  render() {
    const { ver, servicio, horario, localidad, search_farmacia, geo } =
      this.state;
    return (
      <>
        <div className="row centrado-2 mt-3">
          <div className="form-group col-md-3 pl-0" align="left">
            <SelectFarm state={this.state} handleSelect={this.handleSelect} />
          </div>

          <div className="form-group col-md-2 pl-0" align="left">
            <select
              id="inputState"
              className="form-control"
              onChange={this.handleFiltros}
              value={this.state.servicio}
              defaultValue={this.state.servicio}
              name="servicio"
            >
              <option value="all" selected>
                Servicios...
              </option>
              <option
                style={{ color: "#CD0A0A", fontWeight: "bold" }}
                value="campanaantigripal"
              >
                Campaña Antigripal 2022
              </option>
              <option value="deturno">De turno</option>
              <option value="violeta">Farmacia Violeta</option>
              <option value="inyectables">Inyectables</option>
              <option value="amarillos">Puntos Amarillos</option>
              <option
                value="testcovid"
                style={{ color: "#CD0A0A", fontWeight: "bold" }}
              >
                Test de Covid
              </option>
              <option value="presion">Toma de presión</option>
              <option value="whatsapp">Whatsapp</option>
            </select>
          </div>

          <div className="col pt-4 pr-0" align="right"></div>

          <div className="form-group col-md-3 pl-0" align="right">
            Ver{" "}
            <div
              className="d-inline p-2 rounded ml-3"
              style={{ border: "solid 0.5px #5c5959" }}
            >
              <img
                alt=""
                src={pharmacy}
                className="border-right px-2 btn"
                onClick={() => this.setState({ listado: !this.state.listado })}
                style={{ opacity: this.state.listado ? 1 : 0.4, width: "40px" }}
              />
              <img
                alt=""
                src={grupo3}
                className="p-1 border-right px-2 btn"
                onClick={() => this.setState({ ver: "listado" })}
                style={{ opacity: ver === "listado" ? 1 : 0.4 }}
              />
              <img
                alt=""
                src={grupo2}
                className="pb-2 pt-1 px-2 btn"
                onClick={() => this.setState({ ver: "mapa" })}
                style={{ opacity: ver === "mapa" ? 1 : 0.4 }}
              />
            </div>
          </div>

          <div className="col-12 pt-4 pr-0" align="right">
            {ver === "mapa" ? (
              <>
                "Utilizar mi ubicación actual"{" "}
                <UbicacionActualFarmacias
                  actualValue={this.state.statusActualUbication}
                  handleActualUbication={this.handleActualUbication}
                />
              </>
            ) : null}
          </div>
        </div>
        {ver === "listado" ? (
          <ListadoFarmacias
            filtroServicio={servicio}
            filtroHorario={horario}
            localidad={localidad}
            nextPage={this.props.nextPage}
            search_farmacia={this.state.search_farmacia}
            filtroPerfilFarmageo={this.props.filtroPerfilFarmageo}
          />
        ) : (
          <MapaFarmacias
            handleActualPosition={this.handleActualPosition}
            actualUbication={this.state.statusActualUbication}
            geo={this.state.geo}
            localidad={localidad}
            filtroServicio={servicio}
            filtroHorario={horario}
            nextPage={this.props.nextPage}
            search_farmacia={this.state.search_farmacia}
            filtroPerfilFarmageo={this.props.filtroPerfilFarmageo}
            listado={this.state.listado}
          />
        )}
      </>
    );
  }
}

FarmaciasCercanas.defaultProps = {
  filtroPerfilFarmageo: "",
};

const mapStateToProps = (state) => {
  return {
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = { ELEGIR_LOCALIDAD, OBTENER_POSICION_ACTUAL };
export default connect(mapStateToProps, mapDispatchToProps)(FarmaciasCercanas);
