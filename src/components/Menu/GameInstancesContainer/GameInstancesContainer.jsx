import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useGameInstancesOverseer from "../../../hooks/useGameInstancesOverseer/useGameInstancesOverseer";

const GameInstancesContainer = () => {
  useGameInstancesOverseer();
  const subscription = useSelector(
    state => state.gameInstancesOverseer.subscription
  );

  let payload = {
    channel: "game_instances_overseer_channel",
    type: "subscribed",
    action: "SUCCESSFULLY_SUBSCRIBED",
    header: {},
    body: { test: "test" }
  };

  return (
    <>
      <p>Game</p>
      <button onClick={() => subscription.joinGame(payload)}>Join game</button>
    </>
  );
};

export default GameInstancesContainer;
