import React, { useState } from "react";

import { useSelector } from "react-redux";

const useCurrentTurn = () => {
  const gameData = useSelector(state => state.gameOverseer.gameData.game);

  const getCurrentCount = () => {
    if (gameData.attributes && gameData.attributes.turn_count) {
      return gameData.attributes.turnCount;
    } else {
      return 0;
    }
  };

  const currentCount = getCurrentCount();

  const currentTurn = () => {
    if (currentCount % 2 === 0) {
      return "join_user";
    } else {
      return "host_user";
    }
  };

  return currentTurn();
};

export default useCurrentTurn;
