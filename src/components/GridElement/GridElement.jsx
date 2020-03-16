import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Frame, AnimatePresence, useAnimation, Color } from "framer";
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
  const index = props.index;

  const controls = useAnimation();

  const unit = useSelector(state =>
    state.gameOverseer.gameData.units.find(unit => {
      return unit.attributes.uuid === contents;
    })
  );

  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);

  const indexX = coordinates.substring(0, 2);
  const indexY = coordinates.substring(2);

  const generateClassName = () => {
    if (selected) {
      // controls.start("normal");
      return "grid-element grid-element-selected";

    } else if (hovered) {
      // controls.start("hovered");
      return "grid-element grid-element-hovered";
    } else if (contents && effect === 1) {
      // controls.start("meleeEffectHit");
      return "grid-element grid-element-contains-unit-effect-melee";
    } else if (contents && effect === 0) {
      // controls.start("normalUnit");
      return "grid-element grid-element-contains-unit";
    } else if (effect === 1) {
      // controls.start("meleeEffectMiss");
      return "grid-element grid-element-effect-melee";
    } else {
      // controls.start("normal");
      return "grid-element";
    }
  };

  const generateBackgroundColor = () => {
    if (unit) {
      return unit.attributes.colour;
    } else {
      return "rgb(59, 68, 72)";
    }
  };

  const gridElementVariants = {
    unActive: {
      opacity: 1,
      height: "0%",
      transition: {
        duration: 0.2,
        delay: 0,
        backgroundColor: {
          duration: 0,
          delay: 0
        }
      }
    },
    normal: {
      opacity: 1,
      height: "100%",
      transition: {
        duration: 0.001,
        delay: 0,
        height: {
          duration: 0.1,
          delay: index / 100 + 7
        },
        backgroundColor: {
          duration: 0,
          delay: 0
        }
      }
    },
    normalUnit: {
      opacity: 1,
      height: "100%",
      backgroundColor: generateBackgroundColor(),
      transition: {
        duration: 0.001,
        delay: 0,
        height: {
          duration: 0.1,
          delay: index / 100 + 7
        },
        backgroundColor: {
          duration: 0,
          delay: 0
        }
      }
    },
    hovered: {
      backgroundColor: Color.lighten(Color(generateBackgroundColor()), 20),
      transition: {
        duration: 0.1,
        delay: 0,
        backgroundColor: {
          duration: 0,
          delay: 0
        }
      }
    },
    meleeEffectMiss: {
      opacity: 1,
      backgroundColor: Color.darken(Color(generateBackgroundColor()), 20),
      transition: {
        duration: 0.2,
        delay: 0,
        backgroundColor: {
          duration: 0,
          delay: 0
        }
      }
    },
    meleeEffectHit: {
      opacity: 1,
      backgroundColor: Color.lighten(Color(generateBackgroundColor()), 20),
      transition: {
        duration: 0.2,
        delay: 0,
        backgroundColor: {
          duration: 0,
          delay: 0
        }
      }
    }
  };

  const generateStyle = () => {
    if (selected) {
      // controls.start("normal");
      return {
        width: "100%",
        height: "100%",
        top: 0,
        position: "relative",
        backgroundColor: "rgb(200, 200, 200)"
      };
    } else if (hovered) {
      // controls.start("hovered");
      return {
        width: "100%",
        height: "100%",
        top: 0,
        position: "relative",
        backgroundColor: Color.lighten(Color(generateBackgroundColor()), 20)
      };
    } else if (contents && effect === 1) {
      // controls.start("meleeEffectHit");
      return {
        width: "100%",
        height: "100%",
        top: 0,
        position: "relative",
        backgroundColor: Color.lighten(Color(generateBackgroundColor()), 20)
      };
    } else if (contents && effect === 0) {
      // controls.start("normalUnit");
      return {
        width: "100%",
        height: "100%",
        top: 0,
        position: "relative",
        backgroundColor: generateBackgroundColor()
      };
    } else if (effect === 1) {
      // controls.start("meleeEffectMiss");
      return {
        width: "100%",
        height: "100%",
        top: 0,
        position: "relative",
        backgroundColor: Color.darken(Color(generateBackgroundColor()), 20)
      };
    } else {
      // controls.start("normal");
      return {
        width: "100%",
        height: "100%",
        top: 0,
        position: "relative",
        backgroundColor: generateBackgroundColor()
      };
    }
  }

  return (
    <Frame
      style={generateStyle()}
      className={generateClassName()}
      initial="unActive"
      animate="normal"
      key={index}
      onHoverStart={() => {
        // if (okay) {
        //   dispatch(addCoordinate(coordinates));
        //   setSelected(true);
        // } else {
        //   dispatch(removeCoordinate(coordinates));
        //   setSelected(false);
        // }
        setHovered(true);
        dispatch(updateCurrentHighlightedCoordinate({ X: indexX, Y: indexY }));
      }}
      variants={gridElementVariants}
      onHoverEnd={() => {
        setHovered(false);
        dispatch(updateCurrentHighlightedCoordinate({ X: null, Y: null }));
      }}
    ></Frame>
  );
};

export default React.memo(GridElement);
