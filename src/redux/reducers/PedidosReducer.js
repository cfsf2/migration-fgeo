const defaultState = {
  carrito: [],
  pedido: null,
  mis_pedidos:[],
  showcarrito:true
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "RECUPERAR_PEDIDO":
      return {
        ...state,
        pedido: action.payload.pedido,
        carrito: action.payload.carrito,
      };
    case "CREATE_PEDIDO":
      return {
        ...state,
        pedido: action.payload,
        carrito: [],
      };
    case "AGREGAR_ITEM_CARRITO":
      return {
        ...state,
        carrito: state.carrito.concat(action.payload),
        showcarrito: !state.showcarrito
      };
    case "UPDATE_ITEM_CARRITO":
      return {
        ...state,
        carrito: state.carrito.map(linea => {
          return linea.idProducto === action.payload.idProducto ? 
                  action.payload
                  : linea
        
        }),
      };
    case "BORRAR_ITEM_CARRITO":
      return {
        ...state,
        carrito: state.carrito.filter((linea, index) => {
          return index !== action.payload;
        }),
      };
    case "BLANQUEAR_PEDIDO":
      return {
        ...state,
        carrito: [],
        pedido: null,
      };
    case "GET_PEDIDOS":
      return {
        ...state,
        mis_pedidos: action.payload,
      };
      
    default:
      return state;
  }
};
