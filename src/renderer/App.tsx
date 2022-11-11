import {MemoryRouter as Router, Routes, Route, Link} from 'react-router-dom';

import './App.css';
import './App.global.css';
import {LoadFile} from "./components/LoadFile";
import React, {useState} from "react";

const StartPage = () => {
  return (
    <div className="container h-100">
      <h1 className="text-white">Lab</h1>
      <p className="text-white">Greetings! This app will help you convert .XML to .HTML file!</p>
      <p className="text-white">To start, just click the button below:</p>
      <button type="button" className="btn btn-primary">
        <Link to="/loadFile" className="text-white text-decoration-none">Load XML</Link>
      </button>
      <h3 className={"text-white mt-4"}>Example of valid XML input</h3>
      <p>
        <pre className={"text-white"}>
          {`
         <scientistpersonnel>
          <group>
            <name>Linear Algrebra</name>
            <department>Mathematics</department>
            <branch>Mathematical Analysis</branch>
            <chair>Professor, Doctor of Technical Sciences, Professor of the Department of Computer Science and Engineering
            </chair>
            <day>Wednesday</day>
            <time>18:00</time>
            <headman>Alexander the great</headman>
            <course>Linear algebra basics</course>
            <subject>Computer Science</subject>
            <leader>Kozlovsky Alexander</leader>
          </group>
        </scientistpersonnel>
          `}
        </pre>

      </p>
    </div>
  );
};

export default function App() {
  const [json, setJson] = useState({})
  const [isJsonLoaded, setIsJsonLoaded] = useState(false)
  // Get parsed JSON from the main process
  window.electron.ipcRenderer.on('json-ready', (args) => {
    // @ts-ignore
    console.log("received json");
    // @ts-ignore
    setJson(args);
    setIsJsonLoaded(true);
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        {/*// @ts-ignore*/}
        <Route path="/loadFile" element={<LoadFile isJsonLoaded={isJsonLoaded} json={json}/>}/>
      </Routes>
    </Router>
  );
}
