import React, { Component } from "react";
import "../../css/farmacias.css";
import FooterHome from "./footers/FooterHome";
import { ARREPENTIMIENTO_COMPRA } from '../../redux/actions/FarmaciasActions'



class ArrepentimientoCompra extends Component {
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
        var result = await ARREPENTIMIENTO_COMPRA(this.state)
        if(result){
            this.setState((state)=> { return  {...state, finalizado: true}})
        }
      }

    async handleInputChange(event) {
        const target = event.nativeEvent.target;
        const value = target.value;
        const name = target.name;
        this.setState((state)=> { return  {...state, [name]: value}});
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
                     <h3 className="mb-5">Arrepentimiento de compra</h3> 
                     <h5 className="mb-5">Según resolución 424/2020</h5>
                     <p>En el caso de que hayas abonado tu compra de manera online, recordá que el reembolso del dinero deberás gestionarlo con la farmacia seleccionada en tu pedido.</p>
                     <br></br>
                  </div>
                  
                      <div className="col-md-8">
                          <div className="form-group">
                              <label for="email">Correo electrónico</label>
                              <input type="email" className="form-control"name="email" required onChange={this.handleInputChange}/>
                          </div>
                      </div>
                        <div className="form-group col-md-6">
                            <label for="nombre">Nombre</label>
                            <input type="text" className="form-control" name="nombre" required onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="apellido">Apellido</label>
                            <input type="text" className="form-control" name="apellido" required onChange={this.handleInputChange}/>
                        </div>
                      <div className="col-md-8">
                          <div className="form-group">
                              <label for="pedido">Número de pedido</label>
                              <input type="text" className="form-control" name="pedido" required onChange={this.handleInputChange}/>
                          </div>
                      </div>
                      <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="razonarrepentimiento">Razón de arrepentimiento</label>
                                <textarea className="form-control" name="razonarrepentimiento" required onChange={this.handleInputChange}></textarea>
                            </div>
                      </div>
                     
                      <div className="col-md-6">
                          <button type="submit" className="btn btn-primary">ENVIAR</button>
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


export default ArrepentimientoCompra;