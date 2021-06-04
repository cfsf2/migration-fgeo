import React, { Component } from "react";
import { connect } from "react-redux";

import grupo2 from "../../../../assets/images/Grupo 2.png";
import grupo1 from "../../../../assets/images/Grupo 1.png";
import grupo3 from "../../../../assets/images/Grupo 3.png";
//import forma1 from "../../../../assets/images/Forma 1.png";
import iconFarmacia from "../../../../assets/images/Grupo 79.png";

//import Trazado230 from "../../../../assets/images/Trazado 230.png";
import lupa from "../../../../assets/images/Lupa.png";

import ListadoFarmacias from "./ListadoFarmacias";
import MapaFarmacias from "./MapaFarmacias";
import { localidades } from "../../../helpers/FarmaciaHelpers";
import UbicacionActual from "../../../helpers/UbicacionActual";
import {
  ELEGIR_LOCALIDAD,
  OBTENER_POSICION_ACTUAL,
} from "../../../../redux/actions/UsuarioActions";
class FarmaciasCercanas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ver: "mapa",
      localidad: this.props.UsuarioReducer.localidad_default,
      servicio: "all",
      horario: "all",
      search_farmacia: "",
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

  async componentDidUpdate(prevProps, prevState) {
    const { localidad_default } = this.props.UsuarioReducer;
    var search_farmacia = await this.handlequery().get("f");
    if (search_farmacia) {
      if (prevState.search_farmacia !== search_farmacia) {
        this.setState({ search_farmacia });
      }
    }

    if (prevProps.UsuarioReducer.localidad_default !== localidad_default) {
      this.setState({ localidad: localidad_default });
    }
  }

  async componentDidMount() {
    var search_farmacia = await this.handlequery().get("f");
    if (search_farmacia) {
      this.setState({ search_farmacia });
    }
  }

  render() {
    const { ver, servicio, horario, localidad, search_farmacia } = this.state;
    return (
      <>
        <div className="row centrado-2 mt-3">
          <div className="form-group col-md-3 pl-0" align="left">
            <select
              id="localidad"
              className="form-control"
              value={this.state.localidad}
              defaultValue={this.state.localidad}
              onChange={this.handleFiltros}
              name="localidad"
            >
              <option value="">Cualquier localidad...</option>
              <option value="ROSARIO">ROSARIO</option>
              {localidades.map((localidad, i) => {
                return (
                  <option value={localidad} key={i}>
                    {localidad}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group col-md-2 pl-0" align="left">
            <select
              id="inputState"
              className="form-control"
              onChange={this.handleFiltros}
              value={this.state.horario}
              defaultValue={this.state.horario}
              name="horario"
            >
              <option value="all" selected>
                Horario...
              </option>
              <option value="manana">Mañana</option>
              <option value="tarde">Tarde</option>
              <option value="noche">Noche</option>
            </select>
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
              <option value="deturno">De turno</option>
              <option value="presion">Toma de presión</option>
              <option value="inyectables">Inyectables</option>
              <option value="violeta">Farmacia Violeta</option>
              <option value="amarillos">Puntos Amarillos</option>
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
            Utilizar mi ubicación actual
            <UbicacionActual />
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
            localidad={localidad}
            filtroServicio={servicio}
            filtroHorario={horario}
            nextPage={this.props.nextPage}
            search_farmacia={this.state.search_farmacia}
            filtroPerfilFarmageo={this.props.filtroPerfilFarmageo}
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
