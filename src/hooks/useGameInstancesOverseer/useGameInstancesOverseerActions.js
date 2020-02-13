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
