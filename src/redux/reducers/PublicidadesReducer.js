const defaultState = {
  publicidades:[]
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_PUBLICIDADES":
      return {
        ...state,
        publicidades: action.payload,
      };
    default:
      return state;
  }
};
