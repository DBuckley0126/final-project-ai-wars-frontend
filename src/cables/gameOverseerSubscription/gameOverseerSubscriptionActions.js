export const addGameOverseerSub = sub => {
  return {
    type: "ADD_GAME_OVERSEER_SUB",
    payload: sub
  };
};

export const updateErrorForGameOverseer = boolean => {
  return {
    type: "UPDATE_ERROR_FOR_GAME_OVERSEER",
    payload: boolean
  };
};

export const updateStartGame = boolean => {
  return {
    type: "UPDATE_START_GAME",
    payload: boolean
  };
};

export const rejectGameSubscription = boolean => {
  return {
    type: "REJECT_GAME_SUBSCRIPTION",
    payload: boolean
  };
};

export const updateGameLobby = payload => {
  return {
    type: "UPDATE_GAME_LOBBY",
    payload: payload
  };
};

export const resetGameOverseer = () => {
  return {
    type: "RESET_GAME_OVERSEER"
  };
};

export const exitLobby = () => {
  return {
    type: "EXIT_LOBBY"
  };
};
