import React from 'react'
import Users from "../users/Users"
import Search from "../users/Search"

const Home = ({searchUsers, clearUsers, setAlert, showClearBtn, loading, users}) => {
    return (
      <div className="container">
        <Search
          searchUsers={searchUsers}
          clearUsers={clearUsers}
          setAlert={setAlert}
          showClearBtn={showClearBtn === "clear" ? true : false}
        />
        <Users loading={loading} users={users} />
      </div>
    );
}


export default Home