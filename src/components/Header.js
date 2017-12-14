import React, { Component } from 'react';
import './header.css'

import { Link } from 'react-router-dom'
import AccountLockStatus from './AccountLockStatus'

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <h1 className="App-title">Welcome to My Stellar Wallet</h1>
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
        <AccountLockStatus />
      </header>
    );
  }
}

export default Header;
