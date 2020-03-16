import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Frame, AnimatePresence } from "framer";

import useCurrentTurn from "../../hooks/useCurrentTurn/useCurrentTurn";

import "./TurnView.scss";

const TurnView = () => {
  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);
  const gameData = useSelector(state => state.gameOverseer.gameData);

  const currentTurn = useCurrentTurn();

  const generateTurnView = () => {
    if (currentTurn === "host_user") {
      let name = lobbyData.attributes.host_user.given_name;
      if (name) {
        return name + "'s Turn";
      }
      return "Player 1 Turn";
    } else {
      let name = lobbyData.attributes.join_user.given_name;
      if (name) {
        return name + "'s Turn";
      }
      return "Player 2 Turn";
    }
  };

  const gameContainerTurnViewVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 3.5
      }
    }
  }

  return (
    <Frame
      id="game-container-turn-view"
      initial="unActive"
      animate="active"
      style={{
        backgroundColor: "",
        width: "200px",
        right: "50px",
        height: "60px",
        zIndex: 1,
        x: 8,
        y: 10,
        color: "rgb(232, 232, 232)",
        fontFamily: 'Maven Pro',
        fontSize: "32px",
        fontWeight: "500"
      }}
      variants={gameContainerTurnViewVariants}
      center="y"
    >
      {generateTurnView()}
    </Frame>
  );
};

export default TurnView;
