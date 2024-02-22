import React from "react";
import logo from "./logo.svg";

import "./App.scss";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            To test, change the file...
            <br />
            To test, change the file... again...
            <br />
            To test, change the file... and again...
            <br />
            To test, change the file... and again... and again...
            <br />
            To get started {"=>"} try to edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
