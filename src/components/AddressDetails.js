import React, { Component } from 'react';
import server from '../stellar'
import Spinner from 'react-spinkit'
import AddressBalances from './AddressBalances'
import QRCodeComponent from './QRCodeComponent'

class AddressDetails extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    server.accounts()
      .accountId(this.props.match.params.address)
      .call()
      .then(result => this.setState({
        loading: false,
        success: true,
        balances: result.balances
      }))
      .catch(e => this.setState({
        loading: false,
        success: false
      }))
  }
  render() {
    console.log("DETAILS", this.state)
    if (this.state.loading) {
      return (
        <div className="AddressDetails">
          <Spinner name="cube-grid"/>
        </div>
      )
    }

    if (!this.state.success) {
      return (
        <div className="AddressDetailsError">
          Couldn't find results for this address
        </div>
      )
    }

    return (
      <div className="AddressDetails">
        Details for address {this.props.match.params.address}
        <h3>Balances</h3>
        <AddressBalances balances={this.state.balances} />
        <QRCodeComponent data={this.props.match.params.address} />
      </div>
    );
  }
}

export default AddressDetails;
