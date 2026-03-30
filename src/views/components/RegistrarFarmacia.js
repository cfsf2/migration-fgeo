import React, { Component } from "react";
import { image_path_server } from "./../../config";

import "../../css/farmacias.css";
import FooterHome from "./footers/FooterHome";
import { connect } from "react-redux";
import { SOLICITUD_REGISTRO_FARMACIA } from '../../redux/actions/FarmaciasActions'

class RegisrarFarmacia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalizado: false,
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    var result = await SOLICITUD_REGISTRO_FARMACIA(this.state);
    if (result) {
      this.setState((state) => ({ ...state, finalizado: true }));
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value =
      target.type === "checkbox" ? target.checked : target.value;

    this.setState((state) => ({
      ...state,
      [name]: value
    }));
  }

  render() {
    return (
      <>
        {this.state.finalizado ? (
          <div className="container">
            <div className="row">
              <div className="col my-5 p-5 text-center">
                <h4>
                  Hemos recibido sus datos correctamente, nos contactaremos a la brevedad.
                </h4>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div className="container">
              <div className="row my-5">
                <div className="col-md-12">
                  <h3 className="mb-5">Registrá tu farmacia</h3>
                </div>

                {/* Nombre farmacia */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="nombre">
                      Nombre de la Farmacia <span className="text-danger">*</span>
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      className="form-control"
                      name="nombre"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6"></div>

                {/* Nombre farmacéutico */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="nombrefarmaceutico">
                      Nombre del Farmacéutico <span className="text-danger">*</span>
                    </label>
                    <input
                      id="nombrefarmaceutico"
                      type="text"
                      className="form-control"
                      name="nombrefarmaceutico"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>

                  {/* Localidad */}
                  <div className="form-group">
                    <label htmlFor="localidad">
                      Localidad <span className="text-danger">*</span>
                    </label>
                    <input
                      id="localidad"
                      type="text"
                      className="form-control"
                      name="localidad"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                {/* Matricula + CP */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="matricula">
                      Matrícula <span className="text-danger">*</span>
                    </label>
                    <input
                      id="matricula"
                      type="text"
                      className="form-control"
                      name="matricula"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cp">
                      CP <span className="text-danger">*</span>
                    </label>
                    <input
                      id="cp"
                      type="text"
                      className="form-control"
                      name="cp"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                {/* Calle + Teléfono */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="calle">
                      Calle <span className="text-danger">*</span>
                    </label>
                    <input
                      id="calle"
                      type="text"
                      className="form-control"
                      name="calle"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefono">
                      Teléfono <span className="text-danger">*</span>
                    </label>
                    <input
                      id="telefono"
                      type="text"
                      className="form-control"
                      name="telefono"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                {/* Número + Email + Checkbox */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="numero">
                      Número <span className="text-danger">*</span>
                    </label>
                    <input
                      id="numero"
                      type="text"
                      className="form-control"
                      name="numero"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-check">
                    <input
                      id="terminos"
                      type="checkbox"
                      className="form-check-input"
                      name="terminos"
                      required
                      onChange={this.handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="terminos">
                      Acepto los términos y condiciones <span className="text-danger">*</span>
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
        <FooterHome />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default RegisrarFarmacia;