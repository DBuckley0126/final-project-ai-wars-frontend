export const updateAuth0 = object => {
  return {
    type: "UPDATE_AUTH0",
    payload: object
  };
};

export const syncUser = object => {
  return {
    type: "SYNC_USER",
    payload: object
  };
};
