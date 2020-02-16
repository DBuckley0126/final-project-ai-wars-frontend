export const initGameInstancesOverseerSubscription = boolean => {
  return {
    type: "INIT_GAME_INSTANCES_OVERSEER_SUBSCRIPTION",
    userSynced: boolean
  };
};
