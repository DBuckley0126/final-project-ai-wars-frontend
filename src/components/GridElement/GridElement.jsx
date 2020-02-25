import React from "react";

import { useDispatch } from "react-redux";
import "./GridElement.scss";
import { updateCurrentHighlightedCoordinate } from "./GridElementActions";

const GridElement = props => {
  const coordinates = props.coordinates;
  const unitUuid = props.unitUuid;
  const dispatch = useDispatch();

  const indexX = coordinates.substring(0, 2);
  const indexY = coordinates.substring(2);

  const generateClassName = () => {
    if (unitUuid) {
      return "grid-element grid-element-contains-unit";
    } else {
      return "grid-element";
    }
  };

  return (
    <div
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
