import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showClearBtn, setShowClearBtn] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    showUsers();
    //eslint-disable-next-line
  }, []);

  const showUsers = async () => {
    setLoading(true);
    const result = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(result.data);
    setLoading(false);
  };


  const searchUsers = async (text) => {
    setLoading(true);

    const result = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(result.data.items);
    setLoading(false);
    setShowClearBtn("clear");
  };

  const getUser = async (username) => {
    setLoading(true);
    const result = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(result.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
    setShowClearBtn("");
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(result.data);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <div className="App">
      <Navbar title="Finder" icon="fab fa-github" />
      <div className="container">
        <Alert alert={alert} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
                <Home
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  setAlert={showAlert}
                  showClearBtn={showClearBtn}
                  loading={loading}
                  users={users}
                />
              </Fragment>
            )}
          />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/user/:login"
            render={(props) => (
              <User
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                loading={loading}
                user={user}
                repos={repos}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
