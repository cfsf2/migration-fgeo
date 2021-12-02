const defaultState = {
  farmacias: [],
  farms_cerca_cant: "...",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_FARMACIAS":
      return {
        ...state,
        farmacias: action.payload.filter((f) => {
          return (
            f.habilitado &&
            f.perfil_farmageo != "no_visible" &&
            f.perfil_farmageo != "indefinido" &&
            f.perfil_farmageo != "demo"
          );
        }),
      };

    default:
      return state;
  }
};
