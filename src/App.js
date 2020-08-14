import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false,
    showClear: "",
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const result = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: result.data, loading: false });
  }

  searchUsers = async (text) => {
    if (text === "") {
      return;
    }
    this.setState({ loading: true });
    const result = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: result.data.items,
      loading: false,
      showClear: "clear",
    });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false, showClear: "" });
  };

  render() {
    const { showClear, loading, users } = this.state;
    return (
      <div className="App">
        <Navbar title="Finder" icon="fab fa-github" />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={showClear === "clear" ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}
export default App;
