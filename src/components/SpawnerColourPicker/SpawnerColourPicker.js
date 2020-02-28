import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";
import "./SpawnerColourPicker.scss";

const SpawnerColourPicker = props => {
  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);
  const local_user_type = useLocalUserType();

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
    const colourArray = ["#3432a8", "#a83283", "#3ca832", "#a83c32"];
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
  return <div id="spawner-colour-picker">{generateColourOptions()}</div>;
};

export default SpawnerColourPicker;

const SpawnerColourPickerOption = props => {
  const colourValue = props.colourValue;
  const selectedSpawnerValue = props.selectedSpawnerValue;
  const setSpawnerColour = props.setSpawnerColour;
  const disabledSpawnerValue = props.disabledSpawnerValue;

  const pickerStyle = {
    background: colourValue
  };

  const colourHandler = () => {
    setSpawnerColour(colourValue);
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

  return (
    <button
      style={pickerStyle}
      disabled={disabledSpawnerValue === colourValue}
      className={selectedClassName()}
      onClick={() => colourHandler()}
    ></button>
  );
};
