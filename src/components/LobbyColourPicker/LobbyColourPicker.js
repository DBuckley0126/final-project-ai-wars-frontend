import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import "./LobbyColourPicker.scss";
import { updateUserLobbyStatus } from "./LobbyColourPickerActions";
import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";
import { Frame, AnimatePresence, useAnimation } from "framer";

const LobbyColourPicker = () => {
  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);
  const startGame = useSelector(state => state.app.startGame);
  const showLobby = useSelector(state => state.app.showLobby);

  const local_user_type = useLocalUserType();

  const controls = useAnimation();

  let lobbyColour = null;
  let disabledLobbyValue = null;

  if (local_user_type === "host_user") {
    lobbyColour = lobbyData.attributes.host_user_colour;
    disabledLobbyValue = lobbyData.attributes.join_user_colour;
  } else if (local_user_type === "join_user") {
    lobbyColour = lobbyData.attributes.join_user_colour;
    disabledLobbyValue = lobbyData.attributes.host_user_colour;
  }

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

  const generateColourOptions = () => {
    return colourArray.map(colourValue => (
      <LobbyColourPickerOption
        key={colourValue}
        colourValue={colourValue}
        selectedLobbyValue={lobbyColour}
        disabledLobbyValue={disabledLobbyValue}
        controls={controls}
      />
    ));
  };

  const colourPickerVariants = {
    unHovered: {
      height: "10px"
    },
    hovered: {
      height: "50px"
    },
    exit: {
      opacity: 0,
      visable: 0,
      transition:{
        duration: 0.2,
        visable: {
          delay: 0.2
        }
      }
    }
  };

  async function handleHoverStart() {
    await controls.start("hovered");
  }

  async function handleHoverEnd() {
    await controls.start("unHovered");
  }

  return (
    <AnimatePresence>
      {showLobby && !startGame && (
        <Frame
          initial="unHovered"
          variants={colourPickerVariants}
          whileHover={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          animate={controls}
          exit={"exit"}
          style={{
            width: "100%",
            bottom: "0px",
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            alignContent: "center",
            backgroundColor: ""
          }}
        >
          {generateColourOptions()}
        </Frame>
      )}
    </AnimatePresence>
  );
};

export default LobbyColourPicker;

const LobbyColourPickerOption = props => {
  const dispatch = useDispatch();
  const colourValue = props.colourValue;
  const selectedLobbyValue = props.selectedLobbyValue;
  const disabledLobbyValue = props.disabledLobbyValue;
  const controls = props.controls;

  const colourHandler = () => {
    if (disabledLobbyValue !== colourValue) {
      dispatch(updateUserLobbyStatus({ teamColour: colourValue }));
    }
  };

  const generateStyle = () => {
    if (disabledLobbyValue === colourValue) {
      return {
        width: "50px",
        position: "relative",
        cursor: ""
      };
    } else {
      return {
        width: "50px",
        position: "relative",
        cursor: "pointer"
      };
    }
  };

  const generateHeight = () => {
    if (disabledLobbyValue === colourValue) {
      return {
        height: "50px"
      };
    } else {
      return {
        height: "60px"
      };
    }
  };

  const colourPickerOptionVariants = {
    unHovered: {
      height: "10px"
    },
    hovered: {
      height: "50px"
    }
  };

  return (
    <Frame
      className="lobby-colour-picker-option"
      backgroundColor={colourValue}
      onClick={() => colourHandler()}
      whileHover={generateHeight()}
      initial="unHovered"
      animate={controls}
      style={generateStyle()}
      variants={colourPickerOptionVariants}
    ></Frame>
  );
};
