import React from "react";
import AceEditor from "react-ace";

import './Editor.scss'

import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/snippets/ruby";
import "ace-builds/src-noconflict/theme-solarized_dark";

const Editor = props => {
  console.log("Rendering editor");
  function onChange(newValue) {
    console.log("change", newValue);
  }

  function onLoad(newValue) {
    // props.editorR = newValue;
    console.log("change", newValue);
  }

  return (
    <div id="editor">
      <AceEditor
        ref={props.editorR}
        placeholder="Code Editor"
        mode="ruby"
        theme="solarized_dark"
        name="ace-editor"
        onLoad={onLoad}
        onChange={onChange}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={`function onLoad(editor) {
          console.log("i've loaded");

        }`}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2
        }}
      />
    </div>
  );
  // document.getElementById("example")
};

export default Editor;
