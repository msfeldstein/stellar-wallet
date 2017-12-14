import React, { Component } from 'react';
import logo from './logo.svg';
import './header.css'

import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Stellar4babies.com</h1>
        <div className="sections">
          <div className="section">
            <Link to="/create-account">Create Account</Link>
          </div>
          <div className="section">
            <Link to="/create-transaction">Create Transaction</Link>
          </div>
          <div className="section">
            <Link to="/query">Query</Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
