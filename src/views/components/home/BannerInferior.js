import { Component } from "react";
import grupo504 from "../../../assets/images/Grupo 504.png";
import grupo503 from "../../../assets/images/Grupo 503.png";
import grupo505 from "../../../assets/images/Grupo 505.png";
import descargar from "../../../assets/images/disponible-en-google-play-badge.svg";
import { connect } from "react-redux";
import { image_path_server } from "../../../config";

class BannerInferior extends Component {
  render() {
    const { publicidades } = this.props.PublicidadesReducer;
    return (
      <>
        <div className="row centrado-2 mt-5">
          <div className="col-md-6 pl-0 my-1">
            <a
              //href={process.env.PUBLIC_URL + "/#/mutual"}
              href="https://mfarmaceutica.com.ar/"
              target="_blank"
              rel="noopener"
            >
              {publicidades
                ? publicidades
                    .filter((p) => {
                      return p.tipo === "banners_ecommerce_home_mut";
                    })
                    .map((p, i) => {
                      return (
                        <img
                          alt=""
                          src={image_path_server + p.imagen}
                          className="w-100"
                          key={i}
                        />
                      );
                    })
                : null}
            </a>
          </div>
          <div className="col-md-6 pl-0 my-1">
            {publicidades
              ? publicidades
                  .filter((p) => {
                    return p.tipo === "banners_ecommerce_home_col";
                  })
                  .map((p, i) => {
                    return (
                      <a href={p.link} target="_blank" rel="noopener">
                        <img
                          alt=""
                          src={image_path_server + p.imagen}
                          className="w-100"
                          key={i}
                        />
                      </a>
                    );
                  })
              : null}
          </div>
        </div>

        <div className="row centrado-2 mt-5">
          <div className="col-md-6 pl-0" align="right">
            <img alt="" src={grupo504} className="w-75" />
          </div>
          <div className="col-md-6 pl-0 registra-tu-farmacia">
            <h3>¿Querés que tu farmacia cuente con nuestro servicio?</h3>
            <p style={{ lineHeight: "1em" }}>
              Registrándote accedes a una plataforma exclusiva en tu farmacia
              donde podrás brindar tus servicios en contacto directo con tus
              clientes
            </p>
            <a
              href={`${process.env.PUBLIC_URL}/#/registrarfarmacia`}
              className="btn btn-registra-farmacia"
            >
              Registrá tu farmacia
            </a>
            <div className="row">
              <div className="col-md-12 logo-colegio" align="left">
                <img alt="" src={grupo503} className="w-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="row centrado-2 mt-5 descarga-app">
          <div className="col-sm-8 pl-0" align="left">
            <p>Descargate la App</p>
            <h3>Tu farmacia digital al alcance de tu mano</h3>
            <small>Enviá tus recetas y pedidos sin moverte de tu casa.</small>
            <a
              href="https://play.google.com/store/apps/details?id=com.santiagoalarcon.farmageo"
              target="_blank"
              rel="noopener"
            >
              <img
                src={descargar}
                alt=""
                style={{ position: "relative", left: "-15px" }}
              />
            </a>
          </div>
          <div className="col-sm-4 pr-0 p-5">
            <img
              alt=""
              src={grupo505}
              className="w-75"
              style={{ position: "absolute", bottom: "0px" }}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PublicidadesReducer: state.PublicidadesReducer,
  };
};
export default connect(mapStateToProps, null)(BannerInferior);
