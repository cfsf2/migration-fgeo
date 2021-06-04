import React, { Component, useEffect, useState } from "react";
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
    <div className="col-sm-3 mb-5" align="center">
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
                  farmacia.usuario +
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
      <img
        src={image_path_server + prod.imagen}
        style={{ height: "200px", maxWidth: "200px" }}
      />
      <p>{prod.nombre}</p>
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
          className="btn btn-add-to-car"
          onClick={() => handleAddItem(prod, farmacia, 1)}
        >
          Agregar al carrito
        </a>
      )}
    </div>
  );
}

function TabsProductos(props) {
  const [entidad_selected, setentidad_selected] = useState(
    "5f5038ad3ddc660001ca6563"
  );
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(8);
  const [activePage, setactivePage] = useState(1);

  useEffect(() => {
    props.GET_ENTIDADES();
    props.GET_PRODUCTOS_PACK();
  }, []);

  useEffect(() => {
    handleProductos();
  }, [
    props.ProductosReducer.categoriaFiltro,
    props.excepcionesEntidadesFarmageo,
  ]);

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
    setmin(pageNumber * 8 - 8);
    setmax(pageNumber * 8);
  };

  const handleEntidades = (entidad_id) => {
    setentidad_selected(entidad_id);
    setactivePage(1);
    setmin(0);
    setmax(8);
  };

  const handleProductos = async () => {
    const filtrado = await handleFiltrado();
    console.log(filtrado);
    return filtrado.slice(min, max).map((prod, i) => {
      return (
        <Producto
          prod={prod}
          key={i}
          farmacia={props.farmacia}
          handleAddItem={handleAddItem}
        />
      );
    });
  };

  const handleFiltrado = () => {
    const { productos, categoriaFiltro } = props.ProductosReducer;
    var filtro = categoriaFiltro === "all" ? "" : categoriaFiltro;

    var filtrado = productos.filter((p) => {
      return (
        //p.entidad_id === entidad_selected &&
        !props.excepcionesProdFarmageo.includes(p._id) &&
        p.categoria_id.includes(filtro) &&
        !props.excepcionesEntidadesFarmageo.includes(p.categoria_id) &&
        p.nombre.toUpperCase().includes(props.textbuscador.toUpperCase())
      );
    });

    var prod_propios = props.productos_propios.filter((p) => {
      return (
        !p.esPromocion &&
        p.categoria_id === filtro &&
        p.nombre.toUpperCase().includes(props.textbuscador.toUpperCase())
      );
    });

    filtrado = prod_propios.concat(filtrado);

    return filtrado;
  };

  const handleAddItem = async (producto, farmacia, cantidad) => {
    const { pedido } = props.PedidosReducer;
    if (farmacia && producto) {
      if (pedido === null || pedido.idfarmacia !== farmacia.matricula) {
        await props.CREATE_PEDIDO(farmacia, "productos");
        props.AGREGAR_ITEM_CARRITO(producto, cantidad);
      } else {
        props.AGREGAR_ITEM_CARRITO(producto, cantidad);
      }
    }
  };

  return (
    <>
      <div className="row centrado-2 mt-5 listado-productos">
        {handleProductos().length === 0 ? (
          <div className="col" align="center">
            <p className="text-danger">
              No hay productos disponibles actualmente
            </p>
          </div>
        ) : (
          handleProductos()
        )}
      </div>

      <div className="row centrado-2">
        <div className="col">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={8}
            totalItemsCount={handleFiltrado().length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
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

TabsProductos.defaultProps = {
  productos_propios: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsProductos);
