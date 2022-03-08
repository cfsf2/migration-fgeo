import React, { Component } from "react";
import {
  GET_PRODUCTOS_PACK,
  GET_ENTIDADES,
} from "../../../redux/actions/ProductosActions";
import { connect } from "react-redux";
import { image_path_server } from "../../../config";
import Pagination from "react-js-pagination";

function Producto(props) {
  const { prod, farmacia, ppropio } = props;
  return (
    <div className="col-sm-3 mb-5" align="center">
      <div className="container px-5 py-2">
        <div className="row">
          <div className="col-6" align="left">
            {/*<b>${prod.precio}</b>*/}
          </div>
          <div className="col-6" align="right">
            <small style={{ lineHeight: 1 }}>
              {ppropio ? (
                <a
                  href={
                    process.env.PUBLIC_URL + "/#/farmaciaperfil?u=" + farmacia
                  }
                >
                  {prod.farmacia}
                </a>
              ) : (
                "Farmageo"
              )}
            </small>
            {/*<small>falta info</small>*/}
          </div>
        </div>
      </div>
      <img
        src={image_path_server + prod.imagen}
        style={{ height: "200px", maxWidth: 200 }}
      />
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
      {ppropio ? (
        prod.inventario === "sinexistencias" ? (
          <p className="text-danger">No hay stock</p>
        ) : (
          <a
            href={
              process.env.PUBLIC_URL +
              "/#/detalleprod?u=" +
              farmacia +
              "&p=" +
              prod._id
            }
            className="btn btn-add-to-car"
          >
            Agregar al carrito
          </a>
        )
      ) : (
        <a
          href={
            process.env.PUBLIC_URL +
            "/#/detalleprod?u=" +
            farmacia +
            "&p=" +
            prod._id
          }
          className="btn btn-add-to-car"
        >
          Agregar al carrito
        </a>
      )}
    </div>
  );
}

class TabsBuscadorProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entidad_selected: "5f5038ad3ddc660001ca6563",
      min: 0,
      max: 8,
      activePage: 1,
      productosPropios: [],
    };
  }

  componentDidMount() {
    this.props.GET_ENTIDADES();
    this.props.GET_PRODUCTOS_PACK();
    this.handleProductosPropios();
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
    const filtrado = this.handleFiltrado();
    if (filtrado.length > 0) {
      return filtrado.slice(min, max).map((prod, i) => {
        return prod.ppropio ? (
          <Producto
            prod={prod}
            key={i}
            farmacia={prod.ufarmacia}
            ppropio={true}
          />
        ) : (
          <Producto prod={prod} key={i} ppropio={false} />
        );
      });
    }
    return <h2>Parece que no encontramos productos con ese nombre</h2>

  };

  handleFiltrado = () => {
    const { productos, categoriaFiltro } = this.props.ProductosReducer;
    var filtro = categoriaFiltro === "all" ? "" : categoriaFiltro;
    const { txtbusqueda } = this.props;
    const { productosPropios } = this.state;

    // packs de productos farmageo
    var filtrado = productos.filter((p) => {
      return (
        p.nombre.toUpperCase().includes(txtbusqueda) &&
        // p.entidad_id === this.state.entidad_selected &&
        p.categoria_id.includes(filtro)
      );
    });

    // productos propios de farmacias
    var _productosPropios = productosPropios.filter((p) => {
      return p.nombre.toUpperCase().includes(txtbusqueda) && !p.esPromocion;
    });

    return filtrado.concat(_productosPropios);
  };

  handleProductosPropios = async () => {
    const { localidad_default } = this.props.UsuarioReducer;
    var productosPropios = [];

    await fetch(
      "http://admin.farmageo.com.ar:3110/farmacias/productospropios/" +
      localidad_default.toUpperCase()
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length > 0) {
            result.map((f) => {

              return f.productos.map((p) => {
                productosPropios.push({
                  ...p,
                  farmacia: f.nombre,
                  ufarmacia: f.usuario,
                  ppropio: true,
                });
                return { ...p, farmacia: f.nombre, ufarmacia: f.usuario };
              });
            });
          } else {
            return <h2>Parece que no encontramos productos con ese nombre</h2>
          }

        },
        (error) => {
          this.setState({ isLoaded: true, error });
        }
      );
    this.setState({ productosPropios });
  };

  
render() {
  return (
    <>
    
      <div className="row centrado-2 mt-5 listado-productos">
        {this.handleProductos()}
      </div>

      <div className="row centrado-2">
        <div className="col">
        {this.handleFiltrado().length != 0 ?  <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={8}
            totalItemsCount={this.handleFiltrado().length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />: "" }
         
        </div>
      </div>
    </>
  );
}
}

const mapStateToProps = (state) => {
  return {
    ProductosReducer: state.ProductosReducer,
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {
  GET_PRODUCTOS_PACK,
  GET_ENTIDADES,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsBuscadorProductos);
//export default TabsBuscadorProductos;
