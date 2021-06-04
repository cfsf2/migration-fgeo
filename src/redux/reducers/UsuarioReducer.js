const defaultState = {
  auth: null,
  localidad_default: "",
  farmacia_selected: null,
  user_farmageo: null,
  reverseGeo: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        auth: null,
        user_farmageo: null,
      };
    case "ELEGIR_LOCALIDAD":
      return {
        ...state,
        localidad_default: action.payload,
      };
    case "ELEGIR_FARMACIA":
      return {
        ...state,
        farmacia_selected: action.payload,
      };
    case "GET_USER_API_FARMAGEO":
      return {
        ...state,
        user_farmageo: action.payload.user,
        auth: true,
        token: action.payload.token,
      };
    case "OBTENER_POSICION_ACTUAL":
      return {
        ...state,
        reverseGeo: action.payload,
        localidad_default: action.payload.city.toUpperCase(),
      };
    default:
      return state;
  }
};
