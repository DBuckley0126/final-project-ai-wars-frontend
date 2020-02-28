import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import "./LobbyColourPicker.scss";
import { updateUserLobbyStatus } from "./LobbyColourPickerActions";
import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";

const LobbyColourPicker = () => {
  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);

  const [colourPickerShow, setColourPickerShow] = useState(false);

  const local_user_type = useLocalUserType();

  let lobbyColour = null;
  let disabledLobbyValue = null;

  if (local_user_type === "host_user") {
    lobbyColour = lobbyData.attributes.host_user_colour;
    disabledLobbyValue = lobbyData.attributes.join_user_colour;
  } else if (local_user_type === "join_user") {
    lobbyColour = lobbyData.attributes.join_user_colour;
    disabledLobbyValue = lobbyData.attributes.host_user_colour;
  }

  const colourArray = ["#3432a8", "#a83283", "#3ca832", "#a83c32"];

  console.log("Render Team colour picker");
  const generateColourOptions = () => {
    return colourArray.map(colourValue => (
      <LobbyColourPickerOption
        key={colourValue}
        colourValue={colourValue}
        selectedLobbyValue={lobbyColour}
        disabledLobbyValue={disabledLobbyValue}
      />
    ));
  };

  const generateLobbyColourPickerState = () => {
    if (colourPickerShow) {
      return (
        <div
          onMouseEnter={() => setColourPickerShow(true)}
          onMouseLeave={() => setColourPickerShow(false)}
          id="lobby-colour-picker"
        >
          {generateColourOptions()}
        </div>
      );
    } else {
      return (
        <div
          onMouseEnter={() => setColourPickerShow(true)}
          onMouseLeave={() => setColourPickerShow(false)}
          id="lobby-colour-picker-hover-button"
        ></div>
      );
    }
  };

  return generateLobbyColourPickerState();
};

export default LobbyColourPicker;

const LobbyColourPickerOption = props => {
  const dispatch = useDispatch();
  const colourValue = props.colourValue;
  const selectedLobbyValue = props.selectedLobbyValue;
  const disabledLobbyValue = props.disabledLobbyValue;

  const pickerStyle = {
    background: colourValue
  };

  const colourHandler = () => {
    dispatch(updateUserLobbyStatus({ teamColour: colourValue }));
  };

  const selectedClassName = () => {
    if (selectedLobbyValue === colourValue) {
      return "lobby-colour-picker-option lobby-colour-picker-option-selected";

    } else if (disabledLobbyValue === colourValue) {
      return "lobby-colour-picker-option lobby-colour-picker-option-disabled";
    } else {
      return "lobby-colour-picker-option";
    }
  };

  return (
    <button
      style={pickerStyle}
      disabled={disabledLobbyValue === colourValue}
      className={selectedClassName()}
      onClick={() => colourHandler()}
    ></button>
  );
};
