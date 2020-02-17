// TEST PURPOSES
export const initGameOverseerSubscription = payload => {
  return {
    type: "INIT_GAME_OVERSEER_SUBSCRIPTION",
    payload: payload
  };
};

export const initActionCable = payload => {
  return {
    type: "INIT_ACTION_CABLE",
    payload: payload
  };
};


export const exitLobby = () => {
  return {
    type: "EXIT_LOBBY"
  };
};

export const startGameRequest = () => {
  return {
    type: "START_GAME_REQUEST"
  };
};


// REAL ONES
