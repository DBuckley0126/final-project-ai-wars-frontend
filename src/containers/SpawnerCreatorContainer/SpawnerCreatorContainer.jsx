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

const SpawnerCreatorContainer = () => {
  console.log("Rendering Spawner Creator Container");
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

  const editorSession = () => {
    console.log(currentPickedColour);
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

  return (
    <div className="spawner-creator-container">
      <SpawnerColourPicker passPickedColour={passPickedColour} />
      <SpawnerSkillsPicker passSkillHash={passSkillHash} />
      <SpawnerNameInput passSpawnerName={passSpawnerName} />
      <Editor editorR={editorRef} />
      <button
        onClick={() => {
          editorUndo();
        }}
      >
        Undo
      </button>
      <button
        onClick={() => {
          editorRedo();
        }}
      >
        redo
      </button>
      <button
        onClick={() => {
          editorSession();
        }}
      >
        Current Colour
      </button>
      <SubmitButton sendEditorContents={sendEditorContents} />
    </div>
  );
};

export default SpawnerCreatorContainer;

const SubmitButton = props => {
  const currentTurn = useCurrentTurn();
  const localUser = useLocalUserType();
  const turnSent = useSelector(state => state.gameOverseer.turnSent);

  const sendEditorContents = props.sendEditorContents;

  if (turnSent) {
    return (
      <button
        className="spawner-submit-button spawner-submit-button-sent"
        disabled={true}
        onClick={() => {
          sendEditorContents();
        }}
      >
        Spawner Sent
      </button>
    );
  } else if (currentTurn === localUser) {
    return (
      <button
        className="spawner-submit-button"
        onClick={() => {
          sendEditorContents();
        }}
      >
        Submit Spawner
      </button>
    );
  } else {
    return (
      <button
        className="spawner-submit-button spawner-submit-button-disabled"
        disabled={true}
      >
        Waiting for Opponent
      </button>
    );
  }
};
