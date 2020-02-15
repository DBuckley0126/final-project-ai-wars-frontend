export const initGameInstancesOverseerSubscription = (
  boolean,
  cable,
  dispatch
) => {
  return {
    type: "INIT_GAME_INSTANCES_OVERSEER_SUBSCRIPTION",
    userSynced: boolean,
    cable: cable,
    dispatch: dispatch
  };
};
