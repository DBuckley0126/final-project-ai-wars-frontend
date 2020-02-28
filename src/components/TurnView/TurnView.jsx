import React from "react";
import { useSelector, useDispatch } from "react-redux";

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
        return <p>{name + "'s Turn"}</p>;
      }
      return <p>Player 1 Turn</p>;
    } else {
      let name = lobbyData.attributes.join_user.given_name;
      if (name) {
        return <p>{name + "'s Turn"}</p>;
      }
      return <p>Player 2 Turn</p>;
    }
  };

  return <div id="turn-view">{generateTurnView()}</div>;
};

export default TurnView;
