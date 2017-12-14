import React, { Component } from 'react';
import Spinner from 'react-spinkit'
import AddressBalances from './AddressBalances'

class AddressDetails extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    fetch(`http://ec2-54-219-166-165.us-west-1.compute.amazonaws.com:8000/accounts/${this.props.address}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        loading: false,
        balances: json.balances
      })
      console.log(json)
    })
    .catch(e => {
      console.log("Something went wrong", e)
    })
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="AddressDetails">
          <Spinner name="cube-grid"/>
        </div>
      )
    }

    return (
      <div className="AddressDetails">
        Details for address {this.props.address}
        <h3>Balances</h3>
        <AddressBalances balances={this.state.balances} />
      </div>
    );
  }
}

export default AddressDetails;
