import React from 'react';
import 'whatwg-fetch';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Demo</a>
          </div>
          <div className="collapse navbar-collapse" id="main-navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a href="#">Home</a></li>
              <li className="active"><a href="#">Users</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Dashboard</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#"><span className="glyphicon glyphicon-user"></span> Hello, Gabriel</a></li>
              <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
