import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstance from "../../components/GameInstance/GameInstance";
import "./GameInstancesContainer.scss";
import useAutoScroll from "../../hooks/useAutoScroll/useAutoScroll";
import { initGameInstancesOverseerSubscription } from "./GameInstancesContainerActions";

const GameInstancesContainer = () => {
  const dispatch = useDispatch();

  const cable = useSelector(state => state.gameInstancesOverseer.cable);
  const userSynced = useSelector(state => state.auth0.synced);

  console.log("Game Instance Container rendered");

  useEffect(() => {
    dispatch(initGameInstancesOverseerSubscription(userSynced));
  }, [userSynced]);

  const [scrollComponentRef] = useAutoScroll();

  const gameInstances = useSelector(
    state => state.gameInstancesOverseer.gameInstances
  );

  const renderGameInstances = () =>
    gameInstances.map(gameInstance => (
      <GameInstance key={gameInstance.id} gameInstance={gameInstance} />
    ));

  return (
    <div ref={scrollComponentRef} className={"game-instances-container"}>
      {renderGameInstances()}
    </div>
  );
};

export default GameInstancesContainer;
