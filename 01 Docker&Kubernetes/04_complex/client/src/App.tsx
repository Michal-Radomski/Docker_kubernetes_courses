import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import OtherPage from "./OtherPage";
import Fibonacci from "./Fibonacci";

import "./App.scss";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <header>
            <Link to="/">Home</Link>
            <Link to="/otherpage">Other Page</Link>
          </header>
          <br />
          <div>
            <Route exact path="/" component={Fibonacci} />
            <br />
            <Route path="/otherpage" component={OtherPage} />
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
