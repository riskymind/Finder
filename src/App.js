import React, { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import User from "./components/users/User";
import NotFound from "./components/pages/NotFound";
import GithubContext from "./context/github/githubContext";

import "./App.css";

const App = () => {
  const githubContext = useContext(GithubContext);

  const { showUsers } = githubContext;

  useEffect(() => {
    showUsers();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Navbar title="Finder" icon="fab fa-github" />
      <div className="container">
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:login" component={User} />
          <Route  component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
