export const exitLobby = () => {
  return {
    type: "EXIT_LOBBY"
  };
};

export const initGameOverseerSubscription = payload => {
  return {
    type: "INIT_GAME_OVERSEER_SUBSCRIPTION",
    payload: payload
  };
};
