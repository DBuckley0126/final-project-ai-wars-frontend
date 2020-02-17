import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Editor from "../../components/Editor/Editor";
import {
  sendPlayerTurn
} from "./SpawnerCreatorContainerActions";

import "./SpawnerCreatorContainer.scss";

const SpawnerCreatorContainer = () => {
  console.log("Rendering Game Container");
  const dispatch = useDispatch();

  const editorRef = React.createRef();

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
    dispatch(sendPlayerTurn({ new_spawner_class: currentEditorContents }));
  };

  const editorSession = () => {
    console.log(editorRef.current.editor.session.getValue());
  };

  return (
    <div className="spawner-creator-container">
      <SpawnerColourPicker />
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
        session
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
