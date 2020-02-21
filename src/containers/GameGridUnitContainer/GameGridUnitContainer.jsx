import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const GameGridUnitContainer = () => {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  const generateActiveUnits = () => {};

  return <div id="game-grid-unit-container">{generateActiveUnits()}</div>;
};

export default GameGridUnitContainer;

const GameUnit = () => {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  return <div className="game-unit"></div>;
};
