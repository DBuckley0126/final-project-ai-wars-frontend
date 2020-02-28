import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameGrid from "../../components/GameGrid/GameGrid";
import CoordinateView from "../../components/CoordinateView/CoordinateView";

const GameGridViewContainer = () => {
  return (
    <div id="game-grid-view-container">
      <GameGrid></GameGrid>
      <CoordinateView />
    </div>
  );
};

export default GameGridViewContainer;
