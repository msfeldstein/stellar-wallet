import React, { Component } from 'react';
import AddressForm from './AddressForm'
import AddressDetails from './AddressDetails'
import TransactionDetails from './TransactionDetails'
import {Route} from 'react-router'

class NetworkExplorer extends Component {
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
    return (
      <div>
        <h2>Explore the Stellar network</h2>
        <AddressForm addressLookup={this.addressLookup.bind(this)} />
        <Route path="/query/address/:address" component={AddressDetails} />
        <Route path="/query/tx/:transaction" component={TransactionDetails} />
      </div>
    );
  }
}

export default NetworkExplorer;
