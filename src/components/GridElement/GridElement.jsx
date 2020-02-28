import React from "react";

import { useDispatch, useSelector } from "react-redux";
import "./GridElement.scss";
import { updateCurrentHighlightedCoordinate } from "./GridElementActions";

const GridElement = props => {
  const coordinates = props.coordinates;
  const contents = props.contents;
  const dispatch = useDispatch();

  const unit = useSelector(state =>
    state.gameOverseer.gameData.units.find(unit => {
      return unit.attributes.uuid === contents;
    })
  );

  const indexX = coordinates.substring(0, 2);
  const indexY = coordinates.substring(2);

  const generateClassName = () => {
    if (contents) {
      return "grid-element grid-element-contains-unit";
    } else {
      return "grid-element";
    }
  };

  const generateStyle = () => {
    if (unit) {
      return { background: unit.attributes.colour };
    } else {
      return {};
    }
  };

  return (
    <div
      style={generateStyle()}
      className={generateClassName()}
      onMouseEnter={() =>
        dispatch(updateCurrentHighlightedCoordinate({ X: indexX, Y: indexY }))
      }
      onMouseLeave={() =>
        dispatch(updateCurrentHighlightedCoordinate({ X: null, Y: null }))
      }
    ></div>
  );
};

export default React.memo(GridElement);
