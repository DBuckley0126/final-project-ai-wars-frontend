export default function gameReducer(
  state = {
    cable: null,
    subscription: null,
    error: false,
    joinedGameId: null,
    subscribedToGame: false,
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
    case "UPDATE_SUBSCRIBED_TO_GAME":
      return {
        ...state,
        lobbyData: { ...state.lobbyData },
        gameData: { ...state.gameData },
        joinedGameId: action.payload.joinedGameId,
        error: false,
        subscribedToGame: action.payload.success
      };
    case "UPDATE_GAME_LOBBY":
      return {
        ...state,
        lobbyData: action.payload.data,
        gameData: { ...state.gameData }
      };
    case "UPDATE_ERROR_FOR_GAME_OVERSEER":
      return {
        ...state,
        lobbyData: { ...state.lobbyData },
        gameData: { ...state.gameData },
        gameInstances: state.gameInstances,
        error: action.payload
      };
    case "REJECT_GAME_SUBSCRIPTION":
      return {
        ...state,
        lobbyData: { ...state.lobbyData },
        gameData: { ...state.gameData },
        rejected: action.payload,
        error: true
      };

    default:
      return state;
  }
}
