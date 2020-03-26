const initialState = {
  startApp: false,
  startGame: false,
  showLobby: false,
  backendSeverActive: false
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "START_APP":
      return { ...state, startApp: true };
    case "UPDATE_SHOW_LOBBY":
      return { ...state, showLobby: action.payload };
    case "UPDATE_START_GAME":
      return { ...state, startGame: action.payload };
    case "TOGGLE_BACKEND_SEVER_ACTIVE":
      return { ...state, backendSeverActive: action.payload };
    default:
      return state;
  }
}
