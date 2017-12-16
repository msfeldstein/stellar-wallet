import React, { Component } from 'react';
import './style/header.css'

import { Link } from 'react-router-dom'
import AccountLockStatus from './AccountLockStatus'

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="App-title">SoftWallet</div>
        <div className="sections">
          <div className="section">
            <Link to="/create-account">Account</Link>
          </div>
          <div className="section">
            <Link to="/create-transaction">Create Transaction</Link>
          </div>
          <div className="section">
            <Link to="/query">Network Explorer</Link>
          </div>
        </div>
        <AccountLockStatus />
      </header>
    );
  }
}

export default Header;
