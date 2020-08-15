import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ showClearBtn, clearUsers, setAlert, searchUsers})=> {
  const [text, setText] = useState("")

  const onChange = (e) => {
    setText(e.target.value );
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

    return (
      <div>
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Searching....."
            value={text}
            onChange={onChange}
          />
          <button className="btn btn-dark btn-block">Search</button>
        </form>
        {showClearBtn && (
          <button className="btn btn-light btn-block my-1" onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
 
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
