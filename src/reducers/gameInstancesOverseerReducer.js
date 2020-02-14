export default function gameInstancesOverseerReducer(
  state = {
    cable: null,
    gameInstances: {},
    subscription: null,
    error: false,
    joinedGame: null,
    subscribed: false
  },
  action
) {
  switch (action.type) {
    case "UPDATE_INSTANCES":
      return { ...state, gameInstances: { ...state.gameInstances } };
    case "ADD_CABLE":
      console.log("CABLE ADDED");
      return {
        ...state,
        gameInstances: { ...state.gameInstances },
        cable: action.payload
      };
    case "ADD_GAME_INSTANCE_OVERSEER_SUB":
      return {
        ...state,
        gameInstances: { ...state.gameInstances },
        subscription: action.payload,
        error: false
      };
    case "JOINED_GAME":
      return {
        ...state,
        gameInstances: { ...state.gameInstances },
        joinedGame: action.payload
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        gameInstances: { ...state.gameInstances },
        error: action.payload
      };
    case "UPDATE_SUBSCRIBED":
      return {
        ...state,
        gameInstances: { ...state.gameInstances },
        subscribed: action.payload
      };
    case "UPDATE_GAME_INSTANCES":
      console.log(action.payload);
      return {
        ...state,
        gameInstances: { ...state.gameInstances, ...action.payload.data }
      };
    default:
      return state;
  }
}
