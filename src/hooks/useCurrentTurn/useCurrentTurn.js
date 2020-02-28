import React, { useState } from "react";

import { useSelector } from "react-redux";

const useCurrentTurn = () => {
  const turnCount = useSelector(state => state.gameOverseer.turnCount);

  const currentTurn = () => {
    if (turnCount % 2 === 0) {
      return "join_user";
    } else {
      return "host_user";
    }
  };

  return currentTurn();
};

export default useCurrentTurn;
