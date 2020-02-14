export default function gameInstancesOverseerReducer(
  state = {
    cable: null,
    gameInstances: [],
    subscription: null,
    error: false,
    joinedGame: null,
    subscribed: false
  },
  action
) {
  switch (action.type) {
    case "ADD_CABLE":
      console.log("CABLE ADDED");
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
    case "JOIN_GAME":
      let subscriptionPayload = {
        channel: "game_instances_overseer_channel",
        type: "join_game",
        action: "REQUEST_JOIN_GAME",
        header: {},
        body: {
          game_id: action.payload.game_id,
          user_sub: action.payload.user_sub
        }
      };
      state.subscription.joinGame(subscriptionPayload);
      return {
        ...state,
        gameInstances: state.gameInstances
      };
    case "JOINED_GAME":
      return {
        ...state,
        gameInstances: state.gameInstances,
        joinedGame: action.payload
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        gameInstances: state.gameInstances,
        error: action.payload
      };
    case "UPDATE_SUBSCRIBED":
      return {
        ...state,
        gameInstances: state.gameInstances,
        subscribed: action.payload
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
