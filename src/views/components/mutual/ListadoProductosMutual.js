import React, { Component, Suspense } from "react";
//import imagen from "../../../assets/images/Rectángulo 15.png";
import { connect } from "react-redux";
import { GET_PRODUCTOS_PACK_BY_ENTIDAD } from "../../../redux/actions/ProductosActions";
import { image_path_server } from "../../../config";

function Producto(props) {
  const { producto, farmacia } = props;
  return (
    <div className="col-sm-3 mb-5" align="center">
      <div className="container px-5">
        <div className="row">
          <div className="col-6" align="left">
            <b>${producto.precio}</b>
          </div>
        </div>
      </div>
      <img
        src={image_path_server + producto.imagen}
        style={{ height: "150px" }}
      />
      <p>{producto.nombre}</p>
      <a
        href={
          process.env.PUBLIC_URL +
          "/#/detalleprod?u=" +
          farmacia +
          "&p=" +
          producto._id
        }
        class="btn btn-add-to-car"
      >
        ver producto
      </a>
    </div>
  );
}

class ListadoProductosMutual extends Component {
  componentDidMount() {
    this.props.GET_PRODUCTOS_PACK_BY_ENTIDAD("5f4ad6ef84729400013dbecd");
  }

  render() {
    const { productos } = this.props.ProductosReducer;
    return (
      <div className="row centrado-2 mt-5 listado-productos">
        {productos
          .filter((e) => {
            return e.entidad_id === "5f4ad6ef84729400013dbecd";
          })
          .map((producto, index) => {
            return <Producto producto={producto} key={index} />;
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ProductosReducer: state.ProductosReducer,
  };
};

const mapDispatchToProps = {
  GET_PRODUCTOS_PACK_BY_ENTIDAD,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListadoProductosMutual);

//export default ListadoProductosMutual;
