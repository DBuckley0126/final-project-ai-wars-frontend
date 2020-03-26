export const toggleBackendSeverActive = payload => {
  return {
    type: "TOGGLE_BACKEND_SEVER_ACTIVE",
    payload: payload
  };
};

export const checkBackendSeverStatus = () => {
  return {
    type: "CHECK_BACKEND_SERVER_STATUS"
  };
};