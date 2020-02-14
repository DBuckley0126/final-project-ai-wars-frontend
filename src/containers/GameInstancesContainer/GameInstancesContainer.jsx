import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstance from "../../components/GameInstance/GameInstance";

const GameInstancesContainer = () => {
  const gameInstances = useSelector(
    state => state.gameInstancesOverseer.gameInstances
  );

  const renderGameInstances = () =>
    gameInstances.map(gameInstance => (
      <GameInstance key={gameInstance.id} gameInstance={gameInstance} />
    ));

  return (
    <>
      <p>Game</p>
      {renderGameInstances()}
    </>
  );
};

export default GameInstancesContainer;
