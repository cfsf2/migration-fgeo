const defaultState = {
  campanas_activas: [],
};

export default (state = defaultstate, action) => {
  switch (action.type) {
    case 'CAMPANAS_ACTIVAS':
      return {
        ...state,
        campanas_activas: action.payload,
      };
    default:
      return state;
  }
};
