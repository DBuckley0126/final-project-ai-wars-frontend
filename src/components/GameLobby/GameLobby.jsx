import React from "react";
import useGameOverseer from "../../hooks/useGameOverseer/useGameOverseer";
import { useSelector, useDispatch } from "react-redux";

const GameLobby = props => {
  console.log("Game lobby rendered")
  const gameId = props.gameId;
  // const user =  useSelector(state => state.auth0.user)
  useGameOverseer(gameId);

  return (
    <>

    </>
  );
};

export default GameLobby;
