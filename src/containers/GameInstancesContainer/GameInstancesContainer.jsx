import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstance from "../../components/GameInstance/GameInstance";
import GameLobby from '../../components/GameLobby/GameLobby'
import "./GameInstancesContainer.scss";
// import useHover from "../../hooks/useHover/useHover";
import useMousePosition from "../../hooks/useMousePosition/useMousePosition";
import useAutoScroll from "../../hooks/useAutoScroll/useAutoScroll";

const GameInstancesContainer = () => {
  console.log("Game Instance Container rendered");
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [joinGameRequest, setJoinGameRequest] = useState({
    joinGame: false,
    gameId: null
  });

  const [scrollComponentRef] = useAutoScroll();

  const gameInstances = useSelector(
    state => state.gameInstancesOverseer.gameInstances
  );

  const renderGameLobby = () => {
    console.log("HIT");
    if (joinGameRequest.joinGame) {
      return <GameLobby gameId={joinGameRequest.gameId} />;
    }
  };

  const renderGameInstances = () =>
    gameInstances.map(gameInstance => (
      <GameInstance
        key={gameInstance.id}
        gameInstance={gameInstance}
        setJoinGameRequest={setJoinGameRequest}
      />
    ));

  return (
    <div ref={scrollComponentRef} className={"game-instances-container"}>
      {renderGameInstances()}
      {renderGameLobby()}
    </div>
  );
};

export default GameInstancesContainer;
