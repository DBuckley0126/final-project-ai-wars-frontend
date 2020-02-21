import React from "react";
import { useSelector, useDispatch } from "react-redux";

const GameOutput = () => {
  const gameData = useSelector(state => state.gameOverseer.gameData);
  console.log("GAME OUTPUT RENDERED")
  console.log(gameData.arrayOfData);

  const renderGameData = () => {
    gameData.arrayOfData.map(data => {
      return <p>{data}</p>;
    });
  };

  return <>{renderGameData()}</>;
};

export default GameOutput;
