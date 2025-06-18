import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { EditorView } from "@codemirror/view";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubLight } from "@uiw/codemirror-theme-github";
import { MdOpenInFull, MdCloseFullscreen } from "react-icons/md";

const Editor = ({ displayName, language, value, onChange, theme }) => {
  const getLanguageExtension = () => {
    switch (language) {
      case "xml":
        return html();
      case "css":
        return css();
      case "javascript":
        return javascript();
      default:
        return html();
    }
  };

  const [open, setOpen] = useState(true);

  const themes = {
    dark: dracula,
    light: githubLight,
  };

  const resolvedTheme = themes[theme] || githubLight;

  return (
    <div className={`editor-container ${open ? "" : "collapse"}`}>
      <div className="title">
        {displayName}
        <button className="grow-btn" onClick={() => setOpen((prev) => !prev)}>
          {open ? <MdCloseFullscreen /> : <MdOpenInFull />}
        </button>
      </div>
      <CodeMirror
        className="code-wrapper"
        value={value}
        theme={resolvedTheme}
        extensions={[getLanguageExtension(), EditorView.lineWrapping]}
        onChange={(value) => onChange(value)}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
        }}
      />
    </div>
  );
};

export default Editor;
