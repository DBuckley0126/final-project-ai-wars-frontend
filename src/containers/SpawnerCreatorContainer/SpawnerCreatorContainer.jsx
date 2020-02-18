import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Editor from "../../components/Editor/Editor";
import SpawnerColourPicker from "../../components/SpawnerColourPicker/SpawnerColourPicker";
import { sendPlayerTurn } from "./SpawnerCreatorContainerActions";

import "./SpawnerCreatorContainer.scss";
import SpawnerSkillsPicker from "../../components/SpawnerSkillsPicker/SpawnerSkillsPicker";

const SpawnerCreatorContainer = () => {
  console.log("Rendering Spawner Creator Container");
  const dispatch = useDispatch();

  const editorRef = React.createRef();

  let currentPickedColour = null;
  let currentSkillHash = null;

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
  // just type the ` 

  // any word with space either side
  // \b(?:\s*send)\b

  // and word with .word space either side or between the . and the word
  // \b(?:\s*\.\s*send)\b

  const sendEditorContents = () => {
    const currentEditorContents = editorRef.current.editor.session.getValue();
    dispatch(
      sendPlayerTurn({
        new_spawner_class: currentEditorContents,
        new_spawner_colour: currentPickedColour,
        new_spawner_skills: currentSkillHash
      })
    );
  };

  const editorSession = () => {
    console.log(currentPickedColour);
  };

  const passPickedColour = colourValue => {
    currentPickedColour = colourValue;
  };

  const passSkillHash = skillHash => {
    currentSkillHash = skillHash;
  };

  return (
    <div className="spawner-creator-container">
      <SpawnerColourPicker passPickedColour={passPickedColour} />
      <SpawnerSkillsPicker passSkillHash={passSkillHash} />
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
      <button
        onClick={() => {
          sendEditorContents();
        }}
      >
        Send editor contents
      </button>
    </div>
  );
};

export default SpawnerCreatorContainer;
