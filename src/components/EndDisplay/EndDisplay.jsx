import React from "react";
import { useSelector, useDispatch } from "react-redux";

import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";

import { exitLobby } from "./EndDisplayActions";

import "./EndDisplay.scss";

const EndDisplay = () => {
  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);
  const gameData = useSelector(state => state.gameOverseer.gameData);
  const local_user = useSelector(state => state.auth0.user);

  const dispatch = useDispatch();

  const localUserType = useLocalUserType();

  const generateTitle = () => {
    if (gameData.game.attributes.winner_user_sub === local_user.sub) {
      return "You Won!";
    } else {
      return "You Lost!";
    }
  };

  const generateWins = () => {
    if (localUserType === "host_user") {
      return lobbyData.attributes.host_user.wins;
    } else {
      return lobbyData.attributes.join_user.wins;
    }
  };

  const generateLosses = () => {
    if (localUserType === "host_user") {
      return lobbyData.attributes.host_user.losses;
    } else {
      return lobbyData.attributes.join_user.losses;
    }
  };

  const handleExitClick = () => {
    dispatch(exitLobby());
  };

  return (
    <>
      <div id="end-background"></div>
      <div id="end-display-box">
        <h2 id="end-display-title">{generateTitle()}</h2>
        <div id="end-display-info">
          <div id="end-display-wins">
            <h3>Games Won</h3>
            <p>{generateWins()}</p>
          </div>
          <div id="end-display-losses">
            <h3>Games Lost</h3>
            <p>{generateLosses()}</p>
          </div>
        </div>

        <button id="end-display-button" onClick={() => handleExitClick()}>
          Exit
        </button>
      </div>
    </>
  );
};

export default EndDisplay;
