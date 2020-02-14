export const joinGame = payload => {
  console.log("hit action join game")
  return {
    type: "JOIN_GAME",
    payload: payload
  };
};
