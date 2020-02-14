import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinGame } from "./GameInstanceActions";

const GameInstance = props => {
  const gameInstance = props.gameInstance;
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth0.user);

  // const handleClick = event => {
  //   dispatch(joinGame());
  // };
  return (
    <>
      <p>{gameInstance.id}</p>
      <button
        onClick={() =>
          dispatch(joinGame({ game_id: gameInstance.id, user_sub: user.sub }))
        }
      >
        Join
      </button>
    </>
  );
};

export default GameInstance;
