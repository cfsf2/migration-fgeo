const defaultState = {
  productos: [],
  entidades: [],
  categorias: [],
  categoriaFiltro: "all",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_PRODUCTOS_PACK":
      return {
        ...state,
        productos: action.payload,
      };
    case "GET_ENTIDADES":
      return {
        ...state,
        entidades: action.payload,
      };
    case "GET_CATEGORIAS":
      return {
        ...state,
        categorias: action.payload,
      };
    case "SET_CATEGORIA":
      return {
        ...state,
        categoriaFiltro: action.payload,
      };

    default:
      return state;
  }
};
