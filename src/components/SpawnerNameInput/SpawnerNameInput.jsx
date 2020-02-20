import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

const SpawnerNameInput = props => {
  const passSpawnerName = props.passSpawnerName;
  const [inputValue, setInputValue] = useState("Unit");
  passSpawnerName(inputValue);

  return (
    <div id="spawner-name-input-div">
      <input
        type="text"
        id="spawner-name-input"
        onChange={e => setInputValue(e.currentTarget.value)}
        value={inputValue}
      />
    </div>
  );
};

export default SpawnerNameInput;
