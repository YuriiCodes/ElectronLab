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
      <button type="button" className="btn btn-primary"><Link to="/loadFile"
                                                              className="text-white text-decoration-none">Load
        XML</Link></button>
    </div>
  );
};

export default function App() {
  const [json, setJson] = useState({})
  // Get parsed JSON from the main process
  window.electron.ipcRenderer.on('json-ready', (args) => {
    debugger;
    // @ts-ignore
    console.log("received json");
    // @ts-ignore
    setJson(args);
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        {/*// @ts-ignore*/}
        <Route path="/loadFile" element={<LoadFile json={json}/>}/>
      </Routes>
    </Router>
  );
}
