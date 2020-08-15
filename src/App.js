import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    showClearBtn: "",
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const result = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: result.data, loading: false });
  }

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const result = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: result.data.items,
      loading: false,
      showClearBtn: "clear",
    });
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const result = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: result.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false, showClearBtn: "" });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ repos: result.data, loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 2000);
  };

  render() {
    const { showClearBtn, loading, users, user, repos } = this.state;
    return (
      <div className="App">
        <Navbar title="Finder" icon="fab fa-github" />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Home
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    setAlert={this.setAlert}
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
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
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
  }
}

export default App;

// showClearBtn={showClearBtn} loading={loading} users={users}
