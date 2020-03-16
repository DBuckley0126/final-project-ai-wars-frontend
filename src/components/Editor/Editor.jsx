import React from "react";
import AceEditor from "react-ace";
import { Frame, AnimatePresence, useAnimation } from "framer";

import './Editor.scss'

import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/snippets/ruby";
import "ace-builds/src-noconflict/theme-solarized_dark";

const Editor = props => {

  const editorVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      transition: {
        delay: 10,
        duration: 0.8
      }
    }
  }

  return (
    <Frame 
    id="editor"
    style={{
      width: "95%",
      height: "auto",
      top: "370px",
      bottom: "100px"
    }}
    center="x"
    initial="unActive"
    animate="active"
    variants={editorVariants}
    >
      <AceEditor
        ref={props.editorR}
        placeholder="Code Editor"
        mode="ruby"
        height="100%"
        width="100%"
        theme="solarized_dark"
        name="ace-editor"
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={`class Pixeling < BasePixeling
  def movement
                
  end
end`}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2
        }}
      />
    </Frame>
  );
};

export default Editor;
