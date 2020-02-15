export const initActionCable = apiToken => {
  return {
    type: "INIT_ACTION_CABLE",
    apiToken: apiToken
  };
};
