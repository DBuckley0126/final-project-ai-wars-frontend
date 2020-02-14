export default function gameInstancesOverseerReducer(
  state = {
    cable: null,
    gameInstances: [],
    subscription: null,
    error: false,
    joinedGame: null,
    subscribedToGameOverseer: false
  },
  action
) {
  switch (action.type) {
    case "ADD_CABLE":
      return {
        ...state,
        gameInstances: state.gameInstances,
        cable: action.payload
      };
    case "ADD_GAME_INSTANCE_OVERSEER_SUB":
      return {
        ...state,
        gameInstances: state.gameInstances,
        subscription: action.payload,
        error: false
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        gameInstances: state.gameInstances,
        error: action.payload
      };
    case "UPDATE_SUBSCRIBED_TO_GAME_OVERSEER":
      return {
        ...state,
        gameInstances: state.gameInstances,
        subscribedToGameOverseer: action.payload
      };
    case "UPDATE_GAME_INSTANCES":
      console.log(action.payload.data);
      return {
        ...state,
        gameInstances: action.payload.data
      };
    default:
      return state;
  }
}

const convertHashIntoArray = hash => {
  let outputArray = [];
  Object.keys(hash).forEach(key => {
    outputArray.push(hash[key]);
  });

  return outputArray;
};
