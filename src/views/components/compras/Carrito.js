import React, { Component } from 'react';
import { image_path_server } from '../../../config';

import '../../../css/farmacias.css';
import {
  AGREGAR_ITEM_CARRITO,
  BORRAR_ITEM_CARRITO,
  UPDATE_ITEM_CARRITO,
} from '../../../redux/actions/PedidosActions';
import { connect } from 'react-redux';
import imgBorrar from '../../../assets/images/Grupo 115.png';

class Carrito extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtotal: 0,
      show: false,
    };
  }

  handleCantidad = async (i, producto) => {
    const cant = producto.cantidad;
    if (i === '+') {
      this.props.UPDATE_ITEM_CARRITO(producto, cant + 1);
    } else if (cant > 0) {
      this.props.UPDATE_ITEM_CARRITO(producto, cant - 1);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { carrito, showcarrito } = this.props.PedidosReducer;
    const { show } = this.props;

    if (prevProps.show != show) {
      this.setState({ show });
    }
    if (prevProps.PedidosReducer.showcarrito != showcarrito) {
      this.setState({ show: true });
    }

    if (prevProps.PedidosReducer.carrito != carrito) {
      this.calcularTotal();
    }
  }

  async componentDidMount() {
    this.calcularTotal();
  }

  calcularTotal = async () => {
    const { carrito, pedido } = this.props.PedidosReducer;
    let subtotal = 0;
    await carrito.map((linea) => {
      return (subtotal += linea.precio * linea.cantidad);
    });
    this.setState({ subtotal: subtotal.toFixed(2) });
    await localStorage.setItem('carrito', JSON.stringify(carrito));
    await localStorage.setItem('pedido', JSON.stringify(pedido));
  };

  handleShow = async () => {
    await this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  render() {
    const { pedido, carrito } = this.props.PedidosReducer;
    return (
      <div
        style={{
          width: '50vh',
          position: 'fixed',
          right: '5%',
          backgroundColor: '#ffffff',
          top: '15%',
          zIndex: 99,
          borderRadius: 13,
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          display: this.state.show && carrito.length > 0 ? 'block' : 'none',
          overflowY: 'scroll',
          height: '60vh',
        }}
      >
        <div className="container-fluid pr-4">
          <div className="row">
            <div className="col p-3">
              <div style={{ float: 'right' }}>
                <button
                  type="button"
                  className="close"
                  onClick={this.handleShow}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col" align="right">
              <p className="text-info">
                Farmacia {pedido ? pedido.nombrefarmacia : ''}
              </p>
            </div>
          </div>
          {carrito.map((linea, i) => {
            return (
              <>
                <div className="row mt-3" key={i}>
                  <div className="col-md-1 col-1" align="center">
                    <img
                      src={imgBorrar}
                      alt=""
                      style={{ width: 20, marginTop: 30 }}
                      onClick={() => this.props.BORRAR_ITEM_CARRITO(i)}
                    />
                  </div>
                  <div className="col-md-4 col-4" align="center">
                    <img
                      src={image_path_server + linea.imagen}
                      alt=""
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="col-md-4 col-4 detalle-producto-sm">
                    <p id="nombre">{linea.nombre}</p>
                    <div className="cantidades-control-sm btn" align="center">
                      <button onClick={() => this.handleCantidad('-', linea)}>
                        -
                      </button>
                      <span style={{ width: '40px', padding: 5 }}>
                        {linea.cantidad}
                      </span>
                      <button onClick={() => this.handleCantidad('+', linea)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className="col-sm-3 col-2 detalle-producto-sm"
                    align="right"
                  >
                    <p id="precio">${linea.subtotal}</p>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
          <div className="row my-4 subtotal">
            <div className="col-sm-4" align="center">
              SUBTOTAL
            </div>
            <div className="col" align="right">
              <b>${this.state.subtotal}</b>
            </div>
          </div>
          <div className="row my-4 subtotal">
            <div className="col" align="right">
              <a
                className="btn btn-add-to-car"
                style={{ color: '#ffffff' }}
                href={process.env.PUBLIC_URL + '/#/revisarpedido'}
                onClick={this.handleShow}
              >
                Revisar pedido
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    PedidosReducer: state.PedidosReducer,
  };
};

const mapDispatchToProps = {
  AGREGAR_ITEM_CARRITO,
  BORRAR_ITEM_CARRITO,
  UPDATE_ITEM_CARRITO,
};

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);
