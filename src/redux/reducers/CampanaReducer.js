const defaultState = {
  campanas_activas: [],
  loading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CAMPANAS_ACTIVAS':
      return {
        ...state,
        campanas_activas: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
