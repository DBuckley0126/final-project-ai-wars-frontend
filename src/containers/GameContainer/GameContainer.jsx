import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpawnerCreatorContainer from "../SpawnerCreatorContainer/SpawnerCreatorContainer";
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

  useEffect(() => {
    dispatch(initActionCable({ apiToken, dispatch }));
    dispatch(
      initGameOverseerSubscription({
        gameUuid: "a9bb9988-3615-9d2a-8358-625f80a21d49",
        requestType: "JOIN_LOBBY"
      })
    );

    const endLobby = () => {
      dispatch(exitLobby());
    };

    return endLobby;
  }, [apiToken, dispatch]);

  return (
    <>
      <SpawnerCreatorContainer />
      <button
        onClick={() => {
          dispatch(startGameRequest());
        }}
      >
        Start game
      </button>
    </>
  );
};

export default GameContainer;
