import { useState, useEffect } from "react";
import "./App.css";
import Editor from "./components/Editor";
import { MdNightlight } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [HTML, setHTML] = useLocalStorage("html", "");
  const [CSS, setCSS] = useLocalStorage("css", "");
  const [JS, setJS] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(true);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${HTML}</body>
          <style>${CSS}</style>
          <script>${JS}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [HTML, CSS, JS]);

  return (
    <>
      <div className="navbar">
        <h1>Online-Code-Editor</h1>
        <div className="toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
          <div className={`slider ${isDarkMode ? "dark" : "light"}`}>
            {isDarkMode ? <MdNightlight /> : <IoSunnyOutline />}
          </div>
        </div>
      </div>

      <div className="panel top-panel">
        <Editor
          displayName="HTML"
          language="xml"
          value={HTML}
          onChange={setHTML}
          theme={isDarkMode ? "dark" : "light"}
        />
        <Editor
          displayName="CSS"
          language="css"
          value={CSS}
          onChange={setCSS}
          theme={isDarkMode ? "dark" : "light"}
        />
        <Editor
          displayName="JAVASCRIPT"
          language="javascript"
          value={JS}
          onChange={setJS}
          theme={isDarkMode ? "dark" : "light"}
        />
      </div>

      <div className="panel">
        <iframe
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          srcDoc={srcDoc}
        />
      </div>
    </>
  );
}

export default App;
