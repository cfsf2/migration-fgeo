const defaultState = {
  auth: null,
  localidad_default: "",
  farmacia_selected: null,
  user_farmageo: {},
  usar_mapa: false,
  reverseGeo: null,
};

export const f = (state = defaultState, action) => {
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
        user_farmageo: {},
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
    case "USAR_MAPA":
      return {
        ...state,
        usar_mapa: action.payload,
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

    case "UPDATE_LOCAL_USER":
      console.log("UPDATE_LOCAL_USER del REDUCER", action.payload);
      return {
        ...state,
        user_farmageo: action.payload,
      };

    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        user_farmageo: action.payload.user,
      };
    default:
      return state;
  }
};

export default f;
