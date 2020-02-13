const initialState = {
  startApp: false
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "START_APP":
      return { ...state, startApp: true };
    default:
      return state;
  }
}
