import React, { useEffect, useState } from "react";
import Map from "./Map";
import { connect } from "react-redux";
import "../../../../css/mapa.css";
import {
  checkServicio,
  checkFranjaHoraria,
} from "../../../helpers/FarmaciaHelpers";
import { GET_FARMACIAS } from "../../../../redux/actions/FarmaciasActions";
import { getCurrentCity } from "../../../../DataFetcher/DFUbicationMap";

function ItemMapList({
  farmacia,
  handleCentrarFarmacia,
  bold,
  nextPage,
  distancia,
}) {
  return (
    <div className="col-sm-12 itemMapList py-2">
      <button
        onClick={() =>
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
            <b>{distancia}x m</b>
          </p>
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
            </p>
            <p style={{ fontWeight: "lighter" }}>Costo de envío</p>
          </div>
        )}
      </div>
    </div>
  );
}

const calcularDistancia = (punto, farmacia) => {
  const lat1 = Number(farmacia.lat);
  const lat2 = Number(punto.lat);
  const lon1 = Number(farmacia.log);
  const lon2 = Number(punto.lng);

  const R = 6371; //km

  const toRad = (deg) => {
    return deg * (Math.PI / 180);
  };

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return Math.trunc(d * 1000); //m
};

function MapaFarmacias(props) {
  const { listado } = props;
  const [currentLatLng, setcurrentLatLng] = useState({
    lat: -32.949693,
    lng: -60.681875,
  });
  const [centerMap, setcenterMap] = useState({
    lat: -32.949693,
    lng: -60.681875,
  });

  const [centrarFarmacia, setcentrarFarmacia] = useState("");
  const [farmacias, setfarmacias] = useState([]);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const handleCentrarFarmacia = (farmacia, centered) => {
    setcentrarFarmacia(farmacia.usuario);

    setcenterMap({
      lat: farmacia.lat,
      lng: farmacia.log,
    });
  };

  const showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getCurrentCity(
          position.coords.latitude,
          position.coords.longitude
        ).then((city) => {
          if (city.ubicacion.provincia.id === "82") {
            if (city.ubicacion.municipio.nombre === null) {
              props.handleActualPosition("ROSARIO");
              sessionStorage.setItem("ubicacion_default", "ROSARIO");
            } else {
              props.handleActualPosition(
                removeAccents(city.ubicacion.municipio.nombre).toUpperCase()
              );
              sessionStorage.setItem(
                "ubicacion_default",
                removeAccents(city.ubicacion.municipio.nombre).toUpperCase()
              );
            }
            setcurrentLatLng({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setcenterMap({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          } else {
            setcurrentLatLng({
              lat: -32.949693,
              lng: -60.681875,
            });
            setcenterMap({
              lat: -32.949693,
              lng: -60.681875,
            });
            props.handleActualPosition("ROSARIO");
          }
        });
      });
    } else {
      console.log("error al obtener geolocación");
    }
  };
  const setGettedUbic = () => {
    setcurrentLatLng({
      lat: props.geo.lat,
      lng: props.geo.lng,
    });
    setcenterMap({
      lat: props.geo.lat,
      lng: props.geo.lng,
    });
  };
  const handleFiltrosFarmacias = () => {
    const { farmacias } = props.FarmaciasReducer;
    const {
      filtroServicio,
      filtroHorario,
      localidad,
      search_farmacia,
      filtroPerfilFarmageo,
    } = props;
    setfarmacias(() =>
      farmacias
        .filter((f) => {
          return (
            checkServicio(filtroServicio, f.servicios) &&
            checkFranjaHoraria(filtroHorario, f.horarios) &&
            f.localidad?.includes(localidad) &&
            f.nombre.toLowerCase()?.includes(search_farmacia) &&
            f.perfil_farmageo?.includes(filtroPerfilFarmageo)
          );
        })
        .sort((a, b) => {
          const distA = calcularDistancia(currentLatLng, a);
          const distB = calcularDistancia(currentLatLng, b);

          return distA - distB;
        })
    );
  };
  useEffect(() => {
    props.GET_FARMACIAS();
  }, []);

  useEffect(() => {
    const f = window.location.hash.split("?")[1];

    if (f && farmacias.length > 0) {
      console.log("entre");
      handleCentrarFarmacia(farmacias[0]);
    }
  }, [farmacias]);

  useEffect(() => {
    if (props.actualUbication) {
      showCurrentLocation();
    }
  }, [props.actualUbication]);

  useEffect(() => {
    setGettedUbic();
  }, [props.geo]);

  useEffect(() => {
    setfarmacias(() =>
      farmacias.sort((a, b) => {
        const distA = calcularDistancia(currentLatLng, a);
        const distB = calcularDistancia(currentLatLng, b);

        return distA - distB;
      })
    );
    handleFiltrosFarmacias();
  }, [props, currentLatLng.lat, currentLatLng.lng]);

  return (
    <div className="row centrado-2" style={{ position: "relative" }}>
      {listado ? (
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
                    const distancia = calcularDistancia(currentLatLng, f);
                    return (
                      <ItemMapList
                        farmacia={f}
                        key={index}
                        handleCentrarFarmacia={handleCentrarFarmacia}
                        bold={f.usuario === centrarFarmacia}
                        nextPage={props.nextPage}
                        distancia={distancia}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      ) : null}
      <div className="col-sm p-0" style={{ height: "70vh" }}>
        <Map
          myposition={currentLatLng}
          farmacias={farmacias}
          centrarFarmacia={centrarFarmacia}
          centerMap={centerMap}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    FarmaciasReducer: state.FarmaciasReducer,
  };
};

const mapDispatchToProps = { GET_FARMACIAS };
export default connect(mapStateToProps, mapDispatchToProps)(MapaFarmacias);
