import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpawnerCreatorContainer from "../SpawnerCreatorContainer/SpawnerCreatorContainer";
import GameGridViewContainer from "../GameGridViewContainer/GameGridViewContainer";
import SpawnerOverview from "../../components/SpawnerOverview/SpawnerOverview";
import TurnView from "../../components/TurnView/TurnView";
import EndDisplay from "../../components/EndDisplay/EndDisplay"
import { Frame, AnimatePresence, useAnimation } from "framer";

import {
  initGameOverseerSubscription,
  exitLobby,
  startGameRequest,
  initActionCable
} from "./GameContainerActions";

import "./GameContainer.scss";

const GameContainer = () => {
  console.log("Rendering Game Container");
  const dispatch = useDispatch();
  const hostSideControls = useAnimation()

  const gameComplete = useSelector(state => state.gameOverseer.gameComplete);

  // const apiToken = useSelector(state => state.auth0.apiToken);

  // const endLobby = () => {
  //   dispatch(exitLobby());
  // };

  // useEffect(() => {
  //   dispatch(initActionCable({ apiToken, dispatch }));
  //   dispatch(
  //     initGameOverseerSubscription({
  //       gameUuid: "a9bb9988-3615-9d2a-8358-625f80a21d49",
  //       requestType: "JOIN_LOBBY"
  //     })
  //   );

  //   return endLobby;
  // }, [apiToken, dispatch]);

  const gameContainerHostSideVariants = {
    unActive: {
      opacity: 0,
      width: "50%",
      height: "100%",
    },
    active: {

    }
  }

  const controlGameContainerHostSideAnimation

  return (
    <AnimatePresence>
      {gameComplete && <EndDisplay />}
      <Frame
        id="game-container-host-side"
        initial="unActive"
        whileHover={() => hoverStyle()}
        animate={hostSideControls}
        style={{
          backgroundColor: "rgb(232, 232, 232)",
          cursor: "pointer",
          left: 0
        }}
        variants={gameContainerHostSideVariants}
        center
      >

      </Frame>
      <Frame>
      
      </Frame>

    </AnimatePresence>
      <SpawnerCreatorContainer />
      <GameGridViewContainer />
      <SpawnerOverview />
      <TurnView />
      <button
        onClick={() => {
          dispatch(exitLobby());
        }}
      >
        End Game
      </button>
  );
};

export default GameContainer;
