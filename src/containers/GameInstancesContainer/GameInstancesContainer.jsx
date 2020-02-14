import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstance from "../../components/GameInstance/GameInstance";
import "./GameInstancesContainer.scss";
// import useHover from "../../hooks/useHover/useHover";
import useMousePosition from "../../hooks/useMousePosition/useMousePosition";
import useAutoScroll from "../../hooks/useAutoScroll/useAutoScroll";

const GameInstancesContainer = () => {
  console.log("Game Instance Container rendered");
  // const [scrollPosition, setScrollPosition] = useState(0);

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
