import React from "react";

import { useSelector, useDispatch } from "react-redux";
import "./GameGrid.scss";
import { updateCurrentHighlightedCoordinate } from "./GameGridActions";

const GameGrid = props => {
  console.log("Game Grid rendered");

  const generateGrid = () => {
    let outputArray = [];
    for (let elementYPosition = 1; elementYPosition <= 50; elementYPosition++) {
      const key_string = `[Y: ${elementYPosition}]`;
      outputArray.push(<GridRow key={key_string} indexY={elementYPosition} />);
    }
    return outputArray;
  };

  return <div id="game-grid">{generateGrid()}</div>;
};

export default GameGrid;

const GridRow = props => {
  const indexY = props.indexY;

  const generateGridElements = () => {
    let outputArray = [];
    for (let elementXPosition = 1; elementXPosition <= 50; elementXPosition++) {
      const key_string = `[X: ${elementXPosition}, Y: ${indexY}]`;
      outputArray.push(
        <GridElement
          key={key_string}
          className="grid-row"
          indexY={indexY}
          indexX={elementXPosition}
        />
      );
    }
    return outputArray;
  };

  return <div className="grid-row">{generateGridElements()}</div>;
};

const GridElement = props => {
  const indexX = props.indexX;
  const indexY = props.indexY;
  const dispatch = useDispatch();

  return (
    <div
      className="grid-element"
      onMouseEnter={() =>
        dispatch(updateCurrentHighlightedCoordinate({ X: indexX, Y: indexY }))
      }
      onMouseLeave={() =>
        dispatch(updateCurrentHighlightedCoordinate({ X: null, Y: null }))
      }
    ></div>
  );
};
