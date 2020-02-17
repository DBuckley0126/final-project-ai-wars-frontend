export const sendPlayerTurn = payload => {
  return {
    type: "SEND_PLAYER_TURN",
    payload: payload
  };
};