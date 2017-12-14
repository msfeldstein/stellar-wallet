import React, { Component } from 'react';
import AddressForm from './AddressForm'
import AddressDetails from './AddressDetails'
import TransactionDetails from './TransactionDetails'
import logo from './logo.svg';
import './header.css'


class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Stellar4babies.com</h1>
        <div className="sections">
          <div className="section">
            Create Account
          </div>
          <div className="section">
            Create Transaction
          </div>
          <div className="section">
            Query
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
