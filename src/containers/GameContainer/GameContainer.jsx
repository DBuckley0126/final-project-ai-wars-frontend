import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Editor from "../../components/Editor/Editor";


import "./GameContainer.scss";

const GameContainer = () => {
  console.log("Rendering Game Container");
  const dispatch = useDispatch();

  const editorRef = React.createRef();

  let undoManager = null;

  // var EditSession = require("ace/edit_session").EditSession;
  // var js = new EditSession("some js code");
  // var css = new EditSession(["some", "css", "code here"]);

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

  const editorSession = () => {
    console.log(editorRef.current.editor.session.getValue());
  };

  return (
    <div className="game-container">
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
    </div>
  );
};

export default GameContainer;
