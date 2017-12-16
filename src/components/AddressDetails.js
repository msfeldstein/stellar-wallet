import React, { Component } from 'react';
import server from '../stellar'
import Spinner from 'react-spinkit'
import AddressBalances from './AddressBalances'
import AddressDisplay from './AddressDisplay'

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

    const addressCardStyles = {
        float: 'left'
      }

    return (
      <div className="AddressDetails">
        <div style={addressCardStyles}>
          <AddressDisplay address={this.props.match.params.address} title="Address" />
        </div>
        <AddressBalances balances={this.state.balances} />
      </div>
    );
  }
}

export default AddressDetails;
