import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import "./GridElement.scss";
import {
  updateCurrentHighlightedCoordinate,
  addCoordinate,
  removeCoordinate
} from "./GridElementActions";

const GridElement = props => {
  const coordinates = props.coordinates;
  const contents = props.contents;
  const effect = props.effect;
  const dispatch = useDispatch();
  const okay = props.okay;

  const unit = useSelector(state =>
    state.gameOverseer.gameData.units.find(unit => {
      return unit.attributes.uuid === contents;
    })
  );

  const [selected, setSelected] = useState(false);

  const indexX = coordinates.substring(0, 2);
  const indexY = coordinates.substring(2);

  const generateClassName = () => {
    if (selected) {
      return "grid-element grid-element-selected";
    } else if (contents && effect === 1) {
      return "grid-element grid-element-contains-unit-effect-melee";
    } else if (contents && effect === 0) {
      return "grid-element grid-element-contains-unit";
    } else if (effect === 1) {
      return "grid-element grid-element-effect-melee";
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
      onMouseEnter={() => {
        if (okay) {
          dispatch(addCoordinate(coordinates));
          setSelected(true);
        } else {
          dispatch(removeCoordinate(coordinates));
          setSelected(false);
        }
        dispatch(updateCurrentHighlightedCoordinate({ X: indexX, Y: indexY }));
      }}
      onMouseLeave={() =>
        dispatch(updateCurrentHighlightedCoordinate({ X: null, Y: null }))
      }
    ></div>
  );
};

export default React.memo(GridElement);
