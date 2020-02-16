export default function gameOverseerReducer(
  state = {
    cable: null,
    subscription: null,
    error: false,
    subscriptionActive: null,
    rejected: false,
    lobbyData: {},
    gameData: {}
  },
  action
) {
  switch (action.type) {
    case "ADD_CABLE":
      return {
        ...state,
        cable: action.payload,
        lobbyData: { ...state.lobbyData },
        gameData: { ...state.gameData }
      };
    case "ADD_GAME_OVERSEER_SUB":
      return {
        ...state,
        lobbyData: { ...state.lobbyData },
        gameData: { ...state.gameData },
        subscription: action.payload,
        error: false
      };
    case "UPDATE_GAME_LOBBY":
      return {
        ...state,
        subscriptionActive: true,
        lobbyData: action.payload.data,
        gameData: { ...state.gameData }
      };
    case "UPDATE_ERROR_FOR_GAME_OVERSEER":
      return {
        ...state,
        lobbyData: { ...state.lobbyData },
        gameData: { ...state.gameData },
        error: action.payload
      };
    case "REJECT_GAME_SUBSCRIPTION":
      return {
        ...state,
        gameData: { ...state.gameData },
        rejected: action.payload,
        subscriptionActive: false,
        subscription: null,
        error: action.payload
      };
    case "RESET_GAME_OVERSEER":
      return {
        ...state,
        gameData: false,
        rejected: false,
        subscriptionActive: false,
        subscription: null,
        error: false
      };
    default:
      return state;
  }
}
