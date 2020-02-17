import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./GameContainer.scss";

const GameContainer = () => {
  console.log("Rendering Game Container");

  const dispatch = useDispatch();

  return <div className="game-container"></div>;
};

export default GameContainer;
