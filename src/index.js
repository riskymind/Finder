import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <GithubState>
      <AlertState>
        <Router>
          <App />
        </Router>
      </AlertState>
    </GithubState>
  </React.StrictMode>,
  document.getElementById("root")
);
