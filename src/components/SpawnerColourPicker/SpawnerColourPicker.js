import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import "./SpawnerColourPicker.scss";

const SpawnerColourPicker = props => {
  const initialTeamColour = useSelector(
    state => state.gameOverseer.userTeamColour
  );

  const [spawnerColour, setSpawnerColour] = useState(initialTeamColour);
  props.passPickedColour(spawnerColour);

  console.log("Render colour picker");
  const generateColourOptions = () => {
    const colourArray = ["#3432a8", "#a83283", "#3ca832", "#a83c32"];
    return colourArray.map(colourValue => (
      <SpawnerColourPickerOption
        key={colourValue}
        colourValue={colourValue}
        selectedSpawnerValue={spawnerColour}
        setSpawnerColour={setSpawnerColour}
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

  const pickerStyle = {
    background: colourValue
  };

  const colourHandler = () => {
    setSpawnerColour(colourValue);
  };

  const selectedClassName = () => {
    if (selectedSpawnerValue === colourValue) {
      return "spawner-colour-picker-option spawner-colour-picker-option-selected";
    } else {
      return "spawner-colour-picker-option";
    }
  };

  return (
    <button
      style={pickerStyle}
      className={selectedClassName()}
      onClick={() => colourHandler()}
    ></button>
  );
};
