export default function gameInstancesOverseerReducer(
  state = {
    cable: null,
    gameInstances: {},
    subscription: null,
    error: false
  },
  action
) {
  switch (action.type) {
    case "UPDATE_INSTANCES":
      return { ...state, gameInstances: { ...state.gameInstances } };
    case "ADD_CABLE":
      console.log("CABLE ADDED")
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
    case "UPDATE_ERROR":
      return {
        ...state,
        gameInstances: { ...state.gameInstances },
        error: action.payload
      };
    default:
      return state;
  }
}
