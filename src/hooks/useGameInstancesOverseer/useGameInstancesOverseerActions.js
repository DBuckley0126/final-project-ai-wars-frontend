export const addGameInstanceOverseerSub = sub => {
  return {
    type: "ADD_GAME_INSTANCE_OVERSEER_SUB",
    payload: sub
  };
};

export const updateError = boolean => {
  return {
    type: "UPDATE_ERROR",
    payload: boolean
  };
};

export const joinedGame = payload => {
  return {
    type: "JOINED_GAME",
    payload: payload
  };
};

export const updateSubscribedToGameOverseer = boolean => {
  return {
    type: "UPDATE_SUBSCRIBED_TO_GAME_OVERSEER",
    payload: boolean
  };
};

export const updateGameInstances = payload => {
  return {
    type: "UPDATE_GAME_INSTANCES",
    payload: payload
  };
};
