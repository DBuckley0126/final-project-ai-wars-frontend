import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpawnerCreatorContainer from "../SpawnerCreatorContainer/SpawnerCreatorContainer";
import GameGridViewContainer from "../GameGridViewContainer/GameGridViewContainer";
import SpawnerOverview from "../../components/SpawnerOverview/SpawnerOverview";
import Editor from "../../components/Editor/Editor";
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

  const apiToken = useSelector(state => state.auth0.apiToken);

  const endLobby = () => {
    dispatch(exitLobby());
  };

  useEffect(() => {
    dispatch(initActionCable({ apiToken, dispatch }));
    dispatch(
      initGameOverseerSubscription({
        gameUuid: "a9bb9988-3615-9d2a-8358-625f80a21d49",
        requestType: "JOIN_LOBBY"
      })
    );

    return endLobby;
  }, [apiToken, dispatch]);

  return (
    <>
      <SpawnerCreatorContainer />
      <GameGridViewContainer />
      <SpawnerOverview />
      <button
        onClick={() => {
          dispatch(exitLobby());
        }}
      >
        End Game
      </button>
    </>
  );
};

export default GameContainer;
