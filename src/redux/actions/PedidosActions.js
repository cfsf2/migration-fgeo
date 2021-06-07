import axios from "axios";
import { apiFarmageo } from "../../config";
import { setHeaders } from "../../services/headerToken";

export const AGREGAR_ITEM_CARRITO = (producto, cantidad) => {
  return (dispatch) => {
    dispatch({
      type: "AGREGAR_ITEM_CARRITO",
      payload: {
        idProducto: producto._id,
        cantidad: cantidad,
        precio: producto.precio,
        nombre: producto.nombre,
        sku: producto.sku,
        subtotal: (parseFloat(producto.precio) * cantidad).toFixed(2),
        entidad: producto.entidad_id ? producto.entidad_id : "productopropio",
        imagen: producto.imagen,
      },
    });
  };
};

export const UPDATE_ITEM_CARRITO = (producto, cantidad) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_ITEM_CARRITO",
      payload: {
        idProducto: producto.idProducto,
        cantidad: cantidad,
        precio: producto.precio,
        nombre: producto.nombre,
        sku: producto.sku,
        subtotal: (parseFloat(producto.precio) * cantidad).toFixed(2),
        entidad: producto.entidad,
        imagen: producto.imagen,
      },
    });
  };
};

export const BORRAR_ITEM_CARRITO = (index) => {
  return (dispatch) => {
    dispatch({
      type: "BORRAR_ITEM_CARRITO",
      payload: index,
    });
  };
};

export const CREATE_PEDIDO = (farmacia, tipoDePedido) => {
  return (dispatch) => {
    dispatch({
      type: "CREATE_PEDIDO",
      payload: {
        descripcion: tipoDePedido,
        idfarmacia: farmacia.matricula,
        nombrefarmacia: farmacia.nombre,
        uFarmacia: farmacia.usuario,
        estado: "nuevo",
      },
    });
  };
};

export const RECUPERAR_PEDIDO = () => {
  return async (dispatch) => {
    var carrito = await JSON.parse(localStorage.getItem("carrito"));
    var pedido = await JSON.parse(localStorage.getItem("pedido"));
    if (carrito && pedido) {
      dispatch({
        type: "RECUPERAR_PEDIDO",
        payload: {
          pedido: pedido,
          carrito: carrito,
        },
      });
    }
  };
};

export const CONFIRMAR_PEDIDO = (pedido) => {
  return (dispatch) => {
    //console.log(pedido);
    var emailFarmacia = pedido.emailFarmacia;
    var html =
      "<p>El usuario <b>" +
      pedido.username +
      "</b> ha realizado un nuevo pedido a la farmacia <b>" +
      pedido.nombrefarmacia +
      "</b></p><p><a href='http://admin.farmageo.com.ar/#/mi-farmacia'>Ir a Mi Farmacia</a></p>";

    if (emailFarmacia == undefined) {
      emailFarmacia = emailFarmacia ? emailFarmacia : "farmageoapp@gmail.com";
      html =
        "<p>El usuario <b>" +
        pedido.username +
        "</b> ha realizado un nuevo pedido a la farmacia <b>" +
        pedido.nombrefarmacia +
        "</b>, pero ésta no tiene el email cargado en el perfil</p>";
    }

    axios
      .post(
        apiFarmageo + "/pedidos",
        {
          username: pedido.username,
          descripcion: pedido.descripcion,
          comentarios: pedido.comentarios,
          estado: pedido.estado,
          idfarmacia: pedido.idfarmacia,
          idsocio: pedido.idsocio,
          estado: "nuevo",
          envio: pedido.envio,
          costoenvio: pedido.costoenvio,
          pago_online: pedido.pago_online,
          gruposproductos: pedido.gruposproductos,
          domicilioenvio: pedido.domicilioenvio,
          nombrefarmacia: pedido.nombrefarmacia,
          whatsapp: pedido.whatsapp,
          es_invitado: pedido.es_invitado,
          datos_cliente: pedido.datos_cliente,
          origen: "ecommerce",
          // PARA QUE MANDE AL EMAIL DE LA FARMACIA
          destinatario: emailFarmacia ,
          asunto: "Nuevo pedido en Farmageo",
          html: html,
        },
        {}
      )
      .then((response) => {
        if (response.status == "200") {
          //  console.log(response);
          dispatch(BLANQUEAR_PEDIDO());
          window.location.href =
            `${process.env.PUBLIC_URL}/#/confirmacionPedido?u=` +
            pedido.ufarmacia;
        }
      })
      .catch((error) => {
        alert("Ha ocurrido un error");
        return false;
      });

    /* console.log({
        username: pedido.username,
        descripcion: pedido.descripcion,
        comentarios: pedido.comentarios,
        estado: pedido.estado,
        idfarmacia: pedido.idfarmacia,
        idsocio: pedido.idsocio,
        estado: "nuevo",
        envio: pedido.envio,
        costoenvio: pedido.costoenvio,
        pago_online: pedido.pago_online,
        gruposproductos: pedido.gruposproductos,
        domicilioenvio: pedido.domicilioenvio,
        nombrefarmacia: pedido.nombrefarmacia,
        whatsapp: pedido.whatsapp,
        // PARA QUE MANDE AL EMAIL DE LA FARMACIA
        destinatario: emailFarmacia + "; santiagoalarcon2@hotmail.com",
        asunto: "Nuevo pedido en Farmageo",
        html: html,
      })*/
  };
};

export const BLANQUEAR_PEDIDO = () => {
  return (dispatch) => {
    dispatch({
      type: "BLANQUEAR_PEDIDO",
    });
  };
};

export const GET_PEDIDOS = (username) => {
  return (dispatch) => {
    axios
      .get(apiFarmageo + "/pedidos/" + username, setHeaders())
      .then((response) => {
        dispatch({
          type: "GET_PEDIDOS",
          payload: response.data,
        });
      })
      .catch((error) => {
        // console.log(error)
      });
  };
};
