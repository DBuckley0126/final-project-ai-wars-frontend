import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Frame, AnimatePresence, useAnimation } from "framer";
import "./SpawnerNameInput.scss"

const SpawnerNameInput = props => {
  const passSpawnerName = props.passSpawnerName;
  const [inputValue, setInputValue] = useState("Pixeling");
  passSpawnerName(inputValue);

    const spawnerNameInputContainerVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeIn",
        delay: 7
      }
    }
  };

  return (
    <Frame
      id="spawner-name-input-container"
      initial="unActive"
      animate="active"
      style={{
        width: "95%",
        height: "50px",
        backgroundColor: "",
        display: "flex",
        top: "10px",
        flexWrap: "nowrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
      }}
      variants={spawnerNameInputContainerVariants}
      center="x"
    >
      <input
        type="text"
        id="spawner-name-input"
        onChange={e => setInputValue(e.currentTarget.value)}
        value={inputValue}
        placeholder="Spawner Name..."
      />
    </Frame>
  );
};

export default SpawnerNameInput;
