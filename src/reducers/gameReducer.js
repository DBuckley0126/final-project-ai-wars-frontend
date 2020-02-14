export default function gameReducer(
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
    case "JOIN_GAME_REQUEST":
      let subscriptionPayload = {
        channel: "game_channel",
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

    default:
      return state;
  }
}