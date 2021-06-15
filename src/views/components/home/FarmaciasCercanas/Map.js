/* global google */
import React, { Component, useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import icon from "../../../../assets/images/mas-icon.png";
import grupo41 from "../../../../assets/images/Trazado 41.png";

import alarmaRoja from "../../../../assets/images/Grupo 294.png";
import alarmaVerde from "../../../../assets/images/Grupo 293.png";
import { checkServicio, checkIsOpen } from "../../../helpers/FarmaciaHelpers";

function ItemInfoMarker(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2" align="left">
                    {checkServicio("deturno", props.info.servicios) ? (
                        <img src={alarmaVerde} style={{ width: "20px" }} alt="de turno" />
                    ) : (
                        <img src={alarmaRoja} style={{ width: "20px" }} />
                    )}
                </div>
                <div className="col" align="right">
                    <p className="d-inline">{props.isOpen.msg + " "}</p>
                    {props.isOpen.status ? (
                        <img src={grupo41} style={{ width: "20px" }} />
                    ) : (
                        <div className="isclosed"></div>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col" align="left">
                    <p style={{ color: "#51a8c4", fontSize: 20, marginTop: 20 }}>
                        Farmacia {props.info.nombre}
                    </p>
                    <p>{props.info.calle + " " + props.info.numero}</p>
                </div>
            </div>

            <div className="row mt-3 py-2" align="center">
                <div className="col px-0">
                    <a
                        className="btn btn-info"
                        href={
                            process.env.PUBLIC_URL +
                            "/#/farmaciaperfil?u=" +
                            props.info.usuario
                        }
                    >
                        Ver farmacia
                    </a>
                </div>
            </div>
        </div>
    );
}

export function MapContainer(props) {
    const [farmacias, setFarmacias] = useState([]);
    const [centerMap, setcenterMap] = useState(props.centerMap);
    const [activeMarker, setactiveMarker] = useState({});
    const [selectedPlace, setselectedPlace] = useState({});
    const [showingInfoWindow, setshowingInfoWindow] = useState({});
    const [isOpen, setisOpen] = useState({ msg: "...", status: false });

    useEffect(() => {
        setFarmacias(props.farmacias);
        setcenterMap(props.centerMap);
    }, [props.farmacias, props.centerMap]);

    const onMarkerClick = async (props, marker) => {
        var _isOpen = await checkIsOpen(props.place_.horarios);
        setactiveMarker(marker);
        setselectedPlace(props.place_);
        setshowingInfoWindow(true);
        setisOpen(_isOpen);
    };

    const onInfoWindowClose = () => {
        setactiveMarker(null);
        setshowingInfoWindow(false);
    };

    const onMapClicked = () => {
        if (showingInfoWindow) {
            setactiveMarker(null);
            setshowingInfoWindow(false);
        }
    };

    return (
        <Map
            google={props.google}
            className={"map"}
            zoom={15}
            // centerAroundCurrentLocation={true}
            initialCenter={centerMap}
            center={centerMap}
            onClick={onMapClicked}
        >
            <Marker position={props.myposition} />

            {farmacias == null
                ? null
                : farmacias.map((farmacia, index) => {
                    return farmacia.usuario === props.centrarFarmacia ? (
                        <Marker
                            key={index}
                            place_={farmacia}
                            position={{ lat: farmacia.lat, lng: farmacia.log }}
                            icon={{
                                url: icon,
                                anchor: new google.maps.Point(25, 25),
                                scaledSize: new google.maps.Size(55, 55)
                            }}
                            onClick={onMarkerClick}
                        />
                    ) : (
                        <Marker
                            key={index}
                            place_={farmacia}
                            position={{ lat: farmacia.lat, lng: farmacia.log }}
                            icon={{
                                url: icon,
                                anchor: new google.maps.Point(18, 18),
                                scaledSize: new google.maps.Size(36, 36)
                            }}
                            onClick={onMarkerClick}
                        />
                    );
                })}
            <InfoWindow
                marker={activeMarker}
                onClose={onInfoWindowClose}
                visible={showingInfoWindow}
            >
                <ItemInfoMarker info={selectedPlace} isOpen={isOpen} />
            </InfoWindow>
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBZ7-k763QmTCxIQR_GiiMD0HmnaYPWvvo"

})(MapContainer);
