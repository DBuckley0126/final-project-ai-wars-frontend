export const addGameInstanceOverseerSub = sub => {
  return {
    type: "ADD_GAME_INSTANCE_OVERSEER_SUB",
    payload: sub
  };
};

export const updateSubscribedToGameOverseer = boolean => {
  return {
    type: "UPDATE_SUBSCRIBED_TO_GAME_OVERSEER",
    payload: boolean
  };
};

export const rejectGameInstancesOverseerSubscription = boolean => {
  return {
    type: "REJECT_GAME_INSTANCES_OVERSEER_SUBSCRIPTION",
    payload: boolean
  };
};

export const updateErrorForGameInstancesOverseer = boolean => {
  return {
    type: "UPDATE_ERROR_FOR_GAME_INSTANCES_OVERSEER",
    payload: boolean
  };
};

export const joinedGame = payload => {
  return {
    type: "JOINED_GAME",
    payload: payload
  };
};

export const updateGameInstances = payload => {
  return {
    type: "UPDATE_GAME_INSTANCES",
    payload: payload
  };
};
