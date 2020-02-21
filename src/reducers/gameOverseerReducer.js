export default function gameOverseerReducer(
  state = {
    cable: null,
    subscription: null,
    error: false,
    subscriptionActive: null,
    rejected: false,
    lobbyData: {},
    gameData: { arrayOfData: [] },
    userTeamColour: "#a83283",
    currentHighlightedCoordinate: { X: null, Y: null }
  },
  action
) {
  switch (action.type) {
    case "ADD_CABLE":
      return {
        ...state,
        cable: action.payload
      };
    case "UPDATE_CURRENT_HIGHLIGHTED_COORDINATE":
      return {
        ...state,
        currentHighlightedCoordinate: action.payload
      };
    case "ADD_GAME_OVERSEER_SUB":
      const randomColour = () => {
        const colourOptions = ["#3432a8", "#a83283", "#3ca832", "#a83c32"];
        return colourOptions[Math.floor(Math.random() * colourOptions.length)];
      };
      return {
        ...state,
        subscription: action.payload,
        userTeamColour: randomColour(),
        error: false
      };
    case "UPDATE_USER_TEAM_COLOUR":
      return {
        ...state,
        userTeamColour: action.payload
      };
    case "UPDATE_GAME_LOBBY":
      return {
        ...state,
        subscriptionActive: true,
        lobbyData: action.payload.data
      };
    case "UPDATE_ERROR_FOR_GAME_OVERSEER":
      return {
        ...state,
        error: action.payload
      };
    case "REJECT_GAME_SUBSCRIPTION":
      return {
        ...state,
        rejected: action.payload,
        subscriptionActive: false,
        subscription: null,
        error: action.payload
      };
    case "RESET_GAME_OVERSEER":
      return {
        ...state,
        gameData: { arrayOfData: [] },
        rejected: false,
        subscriptionActive: false,
        lobbyData: {},
        subscription: null,
        error: false
      };
    case "UPDATE_GAME_OF_TURN":
      return {
        ...state,
        gameData: {
          array_of_data: state.gameData.arrayOfData.push(action.payload)
        }
      };

    default:
      return state;
  }
}
