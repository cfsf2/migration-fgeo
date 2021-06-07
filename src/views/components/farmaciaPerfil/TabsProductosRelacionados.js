import React, { Component } from "react";
import {
  GET_PRODUCTOS_PACK,
  GET_ENTIDADES,
} from "../../../redux/actions/ProductosActions";
import {
  AGREGAR_ITEM_CARRITO,
  CREATE_PEDIDO,
} from "../../../redux/actions/PedidosActions";
import { connect } from "react-redux";
import { image_path_server } from "../../../config";
import Pagination from "react-js-pagination";

function Producto(props) {
  const { prod, farmacia, handleAddItem } = props;
  return (
    <div className="col-md-3 mb-5" align="center">
      <div className="container px-5 py-2">
        <div className="row">
          <div className="col-6" align="left">
            {/*<b>${prod.precio}</b>*/}
          </div>
          <div className="col-6" align="right">
            {prod.inventario === "sinexistencias" ? null : (
              <a
                href={
                  process.env.PUBLIC_URL +
                  "/#/detalleprod?u=" +
                  farmacia +
                  "&p=" +
                  prod._id
                }
              >
                + info
              </a>
            )}
          </div>
        </div>
      </div>
      <img src={image_path_server + prod.imagen} style={{ height: "200px" }} />
      <p style={{height:"39px"}}>{prod.nombre}</p>
      <p>
        <b
          style={{
            color: "rgb(56 129 152)",
            fontSize: "21px",
          }}
        >
          ${prod.precio}
        </b>
      </p>
      {prod.inventario === "sinexistencias" ? (
        <p className="text-danger">No hay stock</p>
      ) : (
        <a
          /* href={
          process.env.PUBLIC_URL +
          "/#/detalleprod?u=" +
          farmacia +
          "&p=" +
          prod._id
        }*/
          class="btn btn-add-to-car"
          onClick={() => handleAddItem(prod, farmacia, 1)}
        >
          Agregar al carrito
        </a>
      )}
    </div>
  );
}

class TabsProductosRelacionados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entidad_selected: "5f5038ad3ddc660001ca6563",
      min: 0,
      max: 8,
      activePage: 1,
    };
  }

  componentDidMount() {
    this.props.GET_ENTIDADES();
    this.props.GET_PRODUCTOS_PACK();
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      activePage: pageNumber,
      max: pageNumber * 8,
      min: pageNumber * 8 - 8,
    });
  };

  handleEntidades = (entidad_id) => {
    this.setState({
      entidad_selected: entidad_id,
      activePage: 1,
      min: 0,
      max: 8,
    });
  };

  handleProductos = () => {
    const { min, max } = this.state;
    var filtrado = this.handleFiltrado();
    return filtrado.slice(min, max).map((prod, i) => {
      return (
        <Producto
          prod={prod}
          key={i}
          farmacia={this.props.farmacia}
          handleAddItem={this.handleAddItem}
        />
      );
    });
  };

  handleFiltrado = () => {
    const { productos, categoriaFiltro } = this.props.ProductosReducer;

    var filtrado = productos.filter((p) => {
      return (
        //p.entidad_id === this.state.entidad_selected &&
        !this.props.excepcionesProdFarmageo.includes(p._id) &&
        //p.categoria_id.includes(filtro) &&
        !this.props.excepcionesEntidadesFarmageo.includes(p.categoria_id) &&
        p.nombre.toUpperCase().includes(this.props.textbuscador.toUpperCase())
      );
    });
    return filtrado;
  };

  handleAddItem = async (producto, farmacia, cantidad) => {
    const { pedido } = this.props.PedidosReducer;
    if (farmacia && producto) {
      if (pedido === null || pedido.idfarmacia !== farmacia.matricula) {
        await this.props.CREATE_PEDIDO(farmacia, "productos");
        this.props.AGREGAR_ITEM_CARRITO(producto, cantidad);
      } else {
        this.props.AGREGAR_ITEM_CARRITO(producto, cantidad);
      }
    }
  };

  render() {
    const { productos, entidades } = this.props.ProductosReducer;
    const { entidad_selected } = this.state;
    return (
      <>
        <div className="row mt-5 listado-productos">
          <div className="col" style={{ borderBottom: "solid 2px #d3d3d3" }}>
            <h5>Productos relacionados</h5>
          </div>
        </div>

        <div className="row mt-5 listado-productos">
          {this.handleProductos()}
        </div>

        <div className="row centrado-2">
          <div className="col">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={8}
              totalItemsCount={this.handleFiltrado().length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ProductosReducer: state.ProductosReducer,
    PedidosReducer: state.PedidosReducer,
  };
};

const mapDispatchToProps = {
  GET_PRODUCTOS_PACK,
  GET_ENTIDADES,
  AGREGAR_ITEM_CARRITO,
  CREATE_PEDIDO,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsProductosRelacionados);
//export default TabsProductos;
