import react, { Component } from "react";
import InfoProcesos from "./InfoProcesos";
import { connect } from "react-redux";
import { GET_PUBLICIDADES } from "../../../redux/actions/PublicidadesActions";
import { image_path_server } from "../../../config";

class BannerSuperior extends Component {
  async componentDidMount() {
    await this.props.GET_PUBLICIDADES();
  }

  render() {
    const { publicidades } = this.props.PublicidadesReducer;
    return (
      <div className="row">
        <div className="col-md-12 p-0">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 p-0">
                <div
                  id="slider-home"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    {publicidades
                      ? publicidades
                          .filter(p => {
                            return p.tipo === "banners_ecommerce_slider";
                          })
                          .map((p, i) => {
                            return (
                              <div
                                className={
                                  i === 0
                                    ? "carousel-item active"
                                    : "carousel-item"
                                }
                                key={i}
                              >
                                <div className="rounded ">
                                  <img
                                    src={image_path_server + p.imagen}
                                    alt=""
                                    className="w-100"
                                  />
                                </div>
                              </div>
                            );
                          })
                      : null}
                  </div>
                  <ol className="carousel-indicators">
                    <li
                      data-target="#slider-home"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li data-target="#slider-home" data-slide-to="1"></li>
                    <li data-target="#slider-home" data-slide-to="2"></li>
                  </ol>
                </div>
              </div>
            </div>
            <InfoProcesos />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    PublicidadesReducer: state.PublicidadesReducer
  };
};
const mapDispatchToProps = { GET_PUBLICIDADES };
export default connect(mapStateToProps, mapDispatchToProps)(BannerSuperior);
