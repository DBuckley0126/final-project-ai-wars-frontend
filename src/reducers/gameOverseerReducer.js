export default function gameReducer(
  state = {
    cable: null,
    subscription: null,
    error: false,
    subscriptionSucessful: null,
    rejected: false,
    lobbyData: {},
    gameData: {},
    lobbyDataRetrieved: false
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
        error: false,
        subscriptionSucessful: action.payload.success
      };
    case "UPDATE_GAME_LOBBY":
      return {
        ...state,
        lobbyDataRetrieved: true,
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
        lobbyDataRetrieved: false,
        gameData: { ...state.gameData },
        rejected: action.payload,
        subscriptionSucessful: false,
        subscription: null,
        error: action.payload
      };

    default:
      return state;
  }
}
