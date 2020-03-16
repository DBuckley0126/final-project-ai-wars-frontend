import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Frame, AnimatePresence, useAnimation, Color } from "framer";

import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";
import "./SpawnerColourPicker.scss";

const SpawnerColourPicker = props => {
  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);
  const local_user_type = useLocalUserType();

  const colourArray = [
    "rgba(0,255,232, 1)",
    "rgba(255,0,248, 1)",
    "rgba(184,2,249, 1)",
    "rgba(47,251,1, 1)",
    "rgba(251,126,0, 1)",
    "rgba(0,30,255, 1)",
    "rgba(235,255,0, 1)",
    "rgba(255,0,0, 1)"
  ];

  let lobbyColour = null;
  let disabledSpawnerValue = null;

  if (local_user_type === "host_user") {
    lobbyColour = lobbyData.attributes.host_user_colour;
    disabledSpawnerValue = lobbyData.attributes.join_user_colour;
  } else if (local_user_type === "join_user") {
    lobbyColour = lobbyData.attributes.join_user_colour;
    disabledSpawnerValue = lobbyData.attributes.host_user_colour;
  }

  const [spawnerColour, setSpawnerColour] = useState(lobbyColour);
  props.passPickedColour(spawnerColour);

  const generateColourOptions = () => {
    return colourArray.map(colourValue => (
      <SpawnerColourPickerOption
        key={colourValue}
        colourValue={colourValue}
        selectedSpawnerValue={spawnerColour}
        setSpawnerColour={setSpawnerColour}
        disabledSpawnerValue={disabledSpawnerValue}
      />
    ));
  };

  const spawnerColourPickerVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        delay: 7.4,
        duration: 0.8
      }
    }
  }
  return (
    <Frame
      id="spawner-colour-picker"
      style={{
        width: "95%",
        height: "60px",
        backgroundColor: "",
        display: "flex",
        top: "80px",
        flexWrap: "nowrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
      }}
      initial="unActive"
      animate="active"
      variants={spawnerColourPickerVariants}
      center="x"
    >
      {generateColourOptions()}
    </Frame>
  );
};

export default SpawnerColourPicker;

const SpawnerColourPickerOption = props => {
  const colourValue = props.colourValue;
  const selectedSpawnerValue = props.selectedSpawnerValue;
  const setSpawnerColour = props.setSpawnerColour;
  const disabledSpawnerValue = props.disabledSpawnerValue;
  const controls = useAnimation();

  const generateOptionStyle = () => {
    switch (true) {
      case selectedSpawnerValue === colourValue:
        controls.start("highlighted");
        return {
          width: "70px",
          height: "50px",
          position: "relative",
          backgroundColor: "",
          cursor: "pointer",
          margin: "0px"
        };
      case disabledSpawnerValue === colourValue:
        return {
          width: "50px",
          height: "50px",
          position: "relative",
          backgroundColor: "",
          margin: "0px"
        };
      default:
        controls.start("normal");
        return {
          width: "50px",
          height: "50px",
          position: "relative",
          backgroundColor: "",
          cursor: "pointer",
          margin: "0px"
        };
    }
  };

  const generateOptionContentsStyle = () => {
    switch (true) {
      case selectedSpawnerValue === colourValue:
        return {
          width: "40px",
          height: "40px",
          backgroundColor: colourValue,
          cursor: "pointer",
          border: "3px solid rgba(232, 232, 232, 1)"
        };
      case disabledSpawnerValue === colourValue:
        return {
          width: "40px",
          height: "40px",
          opacity: 0.5,
          backgroundColor: colourValue,
          border: "3px solid rgba(232, 232, 232, 1)"
        };
      default:
        return {
          width: "40px",
          height: "40px",
          backgroundColor: colourValue,
          cursor: "pointer",
          border: "3px solid rgba(232, 232, 232, 1)"
        };
    }
  };

  const colourClickHandler = () => {
    if (disabledSpawnerValue !== colourValue) {
      setSpawnerColour(colourValue);
    }
  };

  const selectedClassName = () => {
    if (selectedSpawnerValue === colourValue) {
      return "spawner-colour-picker-option spawner-colour-picker-option-selected";
    } else if (disabledSpawnerValue === colourValue) {
      return "spawner-colour-picker-option spawner-colour-picker-option-disabled";
    } else {
      return "spawner-colour-picker-option";
    }
  };

  const spawnerColourOptionVariants = {
    normal: {
      width: "50px",
      transition: {
        width: { duration: 0.6, ease: "easeInOut" }
      }
    },
    highlighted: {
      width: "70px",
      transition: {
        width: { duration: 0.6, ease: "easeInOut" }
      }
    },
    hovered: {
      width: "70px",
      transition: {
        width: { duration: 0.3, ease: "easeInOut" }
      }
    }
  };

  const spawnerColourOptionContentVariants = {
    normal: {
      scale: 1,
      transition: {
        scale: { duration: 0.6, type: "spring", stiffness: 200 }
      }
    },
    highlighted: {
      scale: 1.2,
      transition: {
        scale: { duration: 0.2, type: "spring", stiffness: 200 }
      }
    },
    hovered: {
      scale: 1.2,
      transition: {
        scale: { duration: 0.2, type: "spring", stiffness: 200 }
      }
    }
  };

  return (
    <Frame
      className={selectedClassName()}
      key={colourValue}
      style={generateOptionStyle()}
      initial="normal"
      animate={controls}
      whileHover={disabledSpawnerValue !== colourValue ? "hovered" : ""}
      transition={{
        duration: 0.6,
        ease: "easeInOut"
      }}
      variants={spawnerColourOptionVariants}
    >
      <Frame
        className={"spawner-colour-option-contents"}
        key={colourValue + "contents"}
        onClick={() => colourClickHandler()}
        style={generateOptionContentsStyle()}
        variants={spawnerColourOptionContentVariants}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
        center
      ></Frame>
    </Frame>
  );
};
