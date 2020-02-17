const initialState = {
  startApp: false,
  startGame: false
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "START_APP":
      return { ...state, startApp: true };
    case "UPDATE_START_GAME":
      return { ...state, startGame: action.payload };
    default:
      return state;
  }
}
