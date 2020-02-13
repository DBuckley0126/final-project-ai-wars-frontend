import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useGameInstancesOverseer from "../../../hooks/useGameInstancesOverseer/useGameInstancesOverseer";

const GameInstancesContainer = () => {
  useGameInstancesOverseer();

  return <p>Game</p>;
};

export default GameInstancesContainer;
