import React from 'react';
import UserTable from './UserTable.jsx';
import NavBar from './NavBar.jsx'


class App extends React.Component {
  render() {
    var usersDivStyle = {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10
    };

    return (
      <div>
        <NavBar />
        <div style={usersDivStyle}>
          <h3>Users</h3>
          <UserTable />
        </div>
      </div>
    );
  }
}

export default App;
