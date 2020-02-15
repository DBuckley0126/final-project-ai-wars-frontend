export const initGameOverseerSubscription = (payload, cable, dispatch) => {
  return {
    type: "INIT_GAME_OVERSEER_SUBSCRIPTION",
    payload: payload,
    cable: cable,
    dispatch: dispatch
  };
};
