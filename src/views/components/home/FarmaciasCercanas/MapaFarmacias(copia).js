import React, { Component } from "react";
import Map from "./Map";
import { connect } from "react-redux";
import "../../../../css/mapa.css";
import {
  checkServicio,
  checkFranjaHoraria,
  // checkIsOpen,
} from "../../../helpers/FarmaciaHelpers";
import { GET_FARMACIAS } from "../../../../redux/actions/FarmaciasActions";

function ItemMapList(props) {
  const { farmacia, handleCentrarFarmacia, bold, nextPage } = props;
  return (
    <div className="col-sm-12 itemMapList py-2">
      {/*<a href={process.env.PUBLIC_URL + "/#/farmaciaperfil?u=" + farmacia.usuario}>
        <h5>{farmacia.nombre}</h5>
      </a>*/}
      <button
        // onClick={() => handleCentrarFarmacia(farmacia)}
        onClick={() =>
          //(window.location.href = `${process.env.PUBLIC_URL}/#/farmaciaperfil?u=${farmacia.usuario}`)
          (window.location.href = `${process.env.PUBLIC_URL}/#/${nextPage}${farmacia.usuario}`)
        }
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
        }}
      >
        <h5
          style={{ fontWeight: bold ? 800 : "normal" }}
          className="p-0 hover-bold"
        >
          {farmacia.nombre}
        </h5>
      </button>
      <br />
      <p
        onClick={() => handleCentrarFarmacia(farmacia)}
        className="btn btn-sm mb-0 p-0 hover-bold"
      >
        {farmacia.calle +
          " " +
          farmacia.numero +
          ", " +
          farmacia.localidad +
          ", " +
          farmacia.provincia}
      </p>
      <div className="row mt-4">
        <div className="col-3">
          <p>
            <b>x m</b>
          </p>{" "}
          <p style={{ fontWeight: "lighter" }}>distancia</p>
        </div>
        {farmacia.tiempotardanza === "15 minutos" ? null : (
          <div className="col-5">
            <p>
              <b>{farmacia.tiempotardanza} </b>
            </p>
            <p style={{ fontWeight: "lighter" }}>tiempo de entrega</p>
          </div>
        )}
        {farmacia.costoenvio === 0 ? null : (
          <div className="col-4">
            <p>
              <b>${farmacia.costoenvio}</b>
            </p>{" "}
            <p style={{ fontWeight: "lighter" }}>Costo de envío</p>
          </div>
        )}
      </div>
    </div>
  );
}
class MapaFarmacias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatLng: {
        lat: -32.949693,
        lng: -60.681875,
      },
      centerMap: {
        lat: -32.949693,
        lng: -60.681875,
      },
      centrarFarmacia: "",
      farmacias: [],
      isMarkerShown: false,
    };
    this.handleFiltrosFarmacias = this.handleFiltrosFarmacias.bind(this);
    this.handleCentrarFarmacia = this.handleCentrarFarmacia.bind(this);
  }

  handleCentrarFarmacia(farmacia) {
    this.setState({
      centrarFarmacia: farmacia.usuario,
      centerMap: {
        lat: farmacia.lat,
        lng: farmacia.log,
      },
    });
  }

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState((prevState) => ({
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          isMarkerShown: true,
        }));
        console.log(position);
      });
    } else {
      console.log("error al obtener geolocación");
    }
  };

  componentDidMount() {
    this.showCurrentLocation();
    this.handleFiltrosFarmacias();
    this.props.GET_FARMACIAS();
  }

  handleFiltrosFarmacias() {
    const { farmacias } = this.props.FarmaciasReducer;
    const {
      filtroServicio,
      filtroHorario,
      localidad,
      search_farmacia,
      filtroPerfilFarmageo,
    } = this.props;
    this.setState({
      farmacias: farmacias.filter((f) => {
        return (
          checkServicio(filtroServicio, f.servicios) &&
          checkFranjaHoraria(filtroHorario, f.horarios) &&
          f.localidad == localidad &&
          f.nombre.toLowerCase().includes(search_farmacia) &&
          f.perfil_farmageo.includes(filtroPerfilFarmageo)
        );
      }).sort((a, b) => a.perfil_farmageo > b.perfil_farmageo ? -1 : (a.perfil_farmageo < b.perfil_farmageo ? 1 : 0)),
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
      this.handleFiltrosFarmacias();
    }
  }

  render() {
    // const { farmacias } = this.props.FarmaciasReducer;
    const { farmacias, centrarFarmacia } = this.state;
    return (
      <div className="row centrado-2">
        <div
          className="col-sm-4 p-0 mb-3"
          style={{
            height: "70vh",
            overflowY: "scroll",
            border: "solid 1px #bbb4b4",
            borderRadius: "13px",
          }}
        >
          <div className="container">
            <div className="row">
              {farmacias
                ? farmacias.map((f, index) => {
                    return (
                      <ItemMapList
                        farmacia={f}
                        key={index}
                        handleCentrarFarmacia={this.handleCentrarFarmacia}
                        bold={f.usuario === centrarFarmacia}
                        nextPage={this.props.nextPage}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        <div className="col-sm p-0" style={{ height: "70vh" }}>
          <Map
            myposition={this.state.currentLatLng}
            farmacias={farmacias}
            centrarFarmacia={centrarFarmacia}
            centerMap={this.state.centerMap}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    FarmaciasReducer: state.FarmaciasReducer,
  };
};

const mapDispatchToProps = { GET_FARMACIAS };
export default connect(mapStateToProps, mapDispatchToProps)(MapaFarmacias);
//export default MapaFarmacias;
