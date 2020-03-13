import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import "./GameGrid.scss";
import GridElement from "../GridElement/GridElement";

const GameGrid = () => {
  console.log("Game Grid rendered");

  const mapState = useSelector(state => state.gameOverseer.mapState);
  const [okay, setOkay] = useState(false);

  const generateGrid = () => {
    return mapState.map(coordinatesSet => (
      <GridElement
        key={coordinatesSet.xy}
        coordinates={coordinatesSet.xy}
        contents={coordinatesSet.c}
        effect={coordinatesSet.e}
        okay={okay}
      />
    ));
  };

  return (
    <div
      id="game-grid"
      onPointerDown={() => {
        setOkay(true);
      }}
      onPointerUp={() => {
        setOkay(false);
      }}
    >
      {generateGrid()}
    </div>
  );
};

export default GameGrid;
