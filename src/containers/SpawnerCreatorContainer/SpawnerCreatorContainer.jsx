import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Editor from "../../components/Editor/Editor";
import SpawnerNameInput from "../../components/SpawnerNameInput/SpawnerNameInput";
import SpawnerColourPicker from "../../components/SpawnerColourPicker/SpawnerColourPicker";
import { sendPlayerTurn } from "./SpawnerCreatorContainerActions";

import "./SpawnerCreatorContainer.scss";
import SpawnerSkillsPicker from "../../components/SpawnerSkillsPicker/SpawnerSkillsPicker";
import useCurrentTurn from "../../hooks/useCurrentTurn/useCurrentTurn";
import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";
import { Frame, AnimatePresence, useAnimation } from "framer";

const SpawnerCreatorContainer = () => {
  const dispatch = useDispatch();

  const editorRef = React.createRef();

  let currentPickedColour = null;
  let currentSkillHash = null;
  let currentSpawnerName = "Unit";

  let undoManager = null;

  useEffect(() => {
    undoManager = editorRef.current.editor.session.getUndoManager();
  }, []);

  const editorUndo = () => {
    if (undoManager) {
      undoManager.undo();
    }
  };

  const editorRedo = () => {
    if (undoManager) {
      undoManager.redo();
    }
  };

  const sendEditorContents = () => {
    const currentEditorContents = editorRef.current.editor.session.getValue();
    dispatch(
      sendPlayerTurn({
        new_spawner_class: currentEditorContents,
        new_spawner_colour: currentPickedColour,
        new_spawner_skills: currentSkillHash,
        new_spawner_name: currentSpawnerName
      })
    );
  };

  const passPickedColour = colourValue => {
    currentPickedColour = colourValue;
  };

  const passSpawnerName = spawnerName => {
    currentSpawnerName = spawnerName;
  };

  const passSkillHash = skillHash => {
    currentSkillHash = skillHash;
  };

  const spawnerCreatorVariants = {
    unActive: {
      opacity: 0,
      visable: 0
    },
    active: {
      opacity: 1,
      visable: 1,
      transition: {
        duration: 0.5,
        delay: 6
      }
    }
  };

  const redoUndoButtonVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        delay: 10.8,
        duration: 0.4
      }
    }
  }


  return (
    <AnimatePresence>

      <Frame
        id="spawner-creator-container"
        initial="unActive"
        animate="active"
        style={{
          backgroundColor: "",
          width: "100%",
          height: "100%"
        }}
        variants={spawnerCreatorVariants}
        center="x"
      >
        <SpawnerColourPicker passPickedColour={passPickedColour} />
        <SpawnerSkillsPicker passSkillHash={passSkillHash} />
        <SpawnerNameInput passSpawnerName={passSpawnerName} />
        <Editor editorR={editorRef} />
        <Frame
          id="spawner-creator-container-undo-button"
          onClick={() => {
            editorUndo();
          }}
          style={{
            backgroundColor: "rgb(232, 232, 232)",
            width: "60px",
            height: "60px",
            x: "160px",
            bottom: "20px",
            cursor: "pointer",
            fontSize: "44px",
            shadow: "rgba(250, 250, 250, 0.3) 0px 0px 6px 1px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          whileHover={{
            scale: 1.02,
            shadow: "rgba(250, 250, 250, 0.5) 0px 0px 10px 1px"
          }}
          center="x"
          initial="unActive"
          animate="active"
          variants={redoUndoButtonVariants}
        ></Frame>
        <SubmitButton sendEditorContents={sendEditorContents} />
        <Frame
          id="spawner-creator-container-redo-button"
          style={{
            backgroundColor: "rgb(232, 232, 232)",
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            x: "-160px",
            shadow: "rgba(250, 250, 250, 0.3) 0px 0px 6px 1px",
            bottom: "20px",
            cursor: "pointer",
            fontSize: "44px"
          }}
          center="x"
          onClick={() => {
            editorRedo();
          }}
          whileHover={{
            scale: 1.02,
            shadow: "rgba(250, 250, 250, 0.5) 0px 0px 10px 1px"
          }}
          initial="unActive"
          animate="active"
          variants={redoUndoButtonVariants}
        ></Frame>
      </Frame>
    </AnimatePresence>
  );
};

export default SpawnerCreatorContainer;

const SubmitButton = props => {
  const currentTurn = useCurrentTurn();
  const localUser = useLocalUserType();
  const turnSent = useSelector(state => state.gameOverseer.turnSent);

  const sendEditorContents = props.sendEditorContents;

  const handleClick = () => {
    if (currentTurn === localUser) {
      sendEditorContents();
    }
  };

  const submitButtonVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        delay: 10.8,
        duration: 0.4
      }
    }
  }

  const generateButtonContents = () => {
    if (turnSent) {
      return "Spawner Sent";
    } else if (currentTurn === localUser) {
      return "Spawn";
    } else {
      return "Waiting";
    }
  };

  return (
    <Frame
      onClick={handleClick}
      id="spawner-submit-button"
      style={{
        cursor: currentTurn === localUser ? "pointer" : "",
        backgroundColor: "rgb(232, 232, 232)",
        shadow: "rgba(250, 250, 250, 0.3) 0px 0px 6px 1px",
        width: "200px",
        height: "60px",
        bottom: "20px",
        color: "rgb(19, 19, 19)",
        fontFamily: "Maven Pro",
        fontSize: "24px",
        fontWeight: "500"
      }}
      whileHover={
        currentTurn === localUser
          ? { scale: 1.03, shadow: "rgba(250, 250, 250, 0.5) 0px 0px 10px 1px" }
          : { scale: 1 }
      }
      center="x"
      initial="unActive"
      animate="active"
      variants={submitButtonVariants}
    >
      {generateButtonContents()}
    </Frame>
  );
};
