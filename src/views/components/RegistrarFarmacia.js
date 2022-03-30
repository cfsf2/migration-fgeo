import React, { Component } from "react";
import { image_path_server } from "./../../config";

import "../../css/farmacias.css";
import FooterHome from "./footers/FooterHome";
import { connect } from "react-redux";
import { SOLICITUD_REGISTRO_FARMACIA } from '../../redux/actions/FarmaciasActions'

class RegisrarFarmacia extends Component {
  constructor(props) {
    super(props);
    this.state={
        finalizado: false,
        error:''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  
  async handleSubmit(event){
    event.preventDefault()
    var result = await SOLICITUD_REGISTRO_FARMACIA(this.state)
    if(result){
        // this.setState({finalizado:true})
    }
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;
    await this.setState({
        [name]: value,
    });
  }
  render() {
    return (
      <>
      {this.state.finalizado ? 
        <div className="container">
            <div className="row">
                <div className="col my-5 p-5" align="center">
                    <h4>Hemos recibido sus datos correctamente, nos contactaremos a la brevedad.</h4>
                </div>
            </div>
        </div>
      :
      <form onSubmit={this.handleSubmit}>
        <div className="container">
            <div className="row my-5">
                <div className="col-md-12">
                   <h3 className="mb-5">Registrá tu farmacia</h3> 
                </div>
                
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="nombre">Nombre de la Farmacia</label>
                            <input type="text" className="form-control"name="nombre" required onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="nombrefarmaceutico">Nombre del Farmacéutico</label>
                            <input type="text" className="form-control" name="nombrefarmaceutico"  required onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label for="localidad">Localidad</label>
                            <input type="text" className="form-control" name="localidad"  required onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="matricula">Matrícula</label>
                            <input type="text" className="form-control" name="matricula"  required onChange={this.handleInputChange}/>
                        </div>
                        
                        <div className="form-group">
                            <label for="cp">CP</label>
                            <input type="text" className="form-control" name="cp"  required onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="calle">Calle</label>
                            <input type="text" className="form-control" name="calle"  required onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label for="telefono">Teléfono</label>
                            <input type="text" className="form-control" name="telefono"  required onChange={this.handleInputChange}/>
                        </div>
                    </div>
                   
                    <div className="col-md-6">
                    <div className="form-group">
                            <label for="numero">Número</label>
                            <input type="text" className="form-control" name="numero"  required onChange={this.handleInputChange}/>
                        </div>
                        
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input type="email" className="form-control" name="email"  required onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="terminos" required onChange={this.handleInputChange}/>
                            <label className="form-check-label" for="terminos">Acepto los términos y condiciones</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Confirmar</button>
                </div>
            </div>

        </div>
        </form>
       }
        <FooterHome />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};


export default RegisrarFarmacia
