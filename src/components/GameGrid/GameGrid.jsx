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
        key={coordinatesSet.xy}
        coordinates={coordinatesSet.xy}
        contents={coordinatesSet.c}
        effect={coordinatesSet.e}
      />
    ));
  };

  return <div id="game-grid">{generateGrid()}</div>;
};

export default GameGrid;
