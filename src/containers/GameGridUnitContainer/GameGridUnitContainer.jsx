import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import "./GameGridUnitContainer.scss";

const GameGridUnitContainer = () => {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  const unitsDataArray = useSelector(
    state => state.gameOverseer.gameData.units
  );

  const gameData = useSelector(state => state.gameOverseer.gameData.game);

  const generateActiveUnits = () => {
    return unitsDataArray.map(unitData => {
      if (unitData.attributes.active) {
        return (
          <GameUnit unitData={unitData} gameData={gameData} key={unitData.id} />
        );
      }
    });
  };

  return <div id="game-grid-unit-container">{generateActiveUnits()}</div>;
};

export default GameGridUnitContainer;

const GameUnit = props => {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  const unitData = props.unitData;
  const gameData = props.gameData;

  let currentCoordinateX = null;
  let currentCoordinateY = null;

  let motionPathX = [];
  let motionPathY = [];

  const matched_movement_history = unitData.attributes.movement_history_array.find(
    movement_history =>
      movement_history.turn_count === gameData.attributes.turn_count
  );

  if (matched_movement_history) {
    matched_movement_history.movements.forEach(movement => {
      const vhValue = vh / 1000;
      const unitWidth = vhValue * 15;
      const unitPadding = vhValue * 2;
      const initialPadding = vhValue * 1;
      const unitWidthWithPadding = unitWidth + unitPadding;

      motionPathX.push(initialPadding + (movement.X * unitWidthWithPadding) - unitWidthWithPadding);
      motionPathY.push(initialPadding + (movement.Y * unitWidthWithPadding) - unitWidthWithPadding);
    });
  } else {
    motionPathX.push(unitData.attributes.coordinate_X * 10);
    motionPathY.push(unitData.attributes.coordinate_Y * 10);
  }

  return (
    <motion.div
      className="game-unit"
      animate={{ x: motionPathX, y: motionPathY }}
      key={unitData.id}
    ></motion.div>
  );
};
