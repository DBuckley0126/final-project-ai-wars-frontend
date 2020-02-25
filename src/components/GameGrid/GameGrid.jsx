import React from "react";

import { useSelector, useDispatch } from "react-redux";
import "./GameGrid.scss";
import GridElement from "../GridElement/GridElement";

const GameGrid = () => {
  console.log("Game Grid rendered");

  const mapState = useSelector(state => state.gameOverseer.mapState);

  const generateGrid = () => {
    return mapState.map(coordinatesSet => (
      <GridElement
        key={coordinatesSet.c}
        coordinates={coordinatesSet.c}
        unitUuid={coordinatesSet.u}
      />
    ));
  };

  return <div id="game-grid">{generateGrid()}</div>;
};

export default GameGrid;
