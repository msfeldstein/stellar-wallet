import React, { Component } from 'react';
import Header from './Header'
import AddressForm from './AddressForm'
import AddressDetails from './AddressDetails'
import TransactionDetails from './TransactionDetails'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  addressLookup(query) {
    if (query.length === 64) {
      this.setState({
        address: null,
        transaction: query
      })
    } else if (query.length === 56) {
      this.setState({
        address: query,
        transaction: null
      })
    }
  }
  render() {
    const addressDetails = this.state.address ?
      <AddressDetails address={this.state.address} />
      : null

    const transactionDetails = this.state.transaction ?
      <TransactionDetails transaction={this.state.transaction} />
      : null

    const details = addressDetails || transactionDetails


    return (
      <div className="App">
        <Header />
        <AddressForm addressLookup={this.addressLookup.bind(this)} />
        {details}
      </div>
    );
  }
}

export default App;
