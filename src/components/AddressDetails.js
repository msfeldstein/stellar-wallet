import React, { Component } from 'react';
import Spinner from 'react-spinkit'
import AccountDetailsCard from './AccountDetailsCard'
import AddressTransactionList from './AddressTransactionList'
import { fetchAccountData } from '../actions/accountData'
import { connect } from 'react-redux'

import './style/AddressDetails.css'

class AddressDetails extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      address: null
    }
  }

  componentDidUpdate() {
    if (this.state.address !== this.props.match.params.address) {
      this.setState({
        address: this.props.match.params.address
      })
      this.props.fetchAccountData(this.props.match.params.address)  
    }
  }

  componentDidMount() {
    this.setState({
      address: this.props.match.params.address
    })
    this.props.fetchAccountData(this.props.match.params.address)
  }
  render() {
    const addressData = this.props.accountData[this.state.address]
    if (!addressData || addressData.isFetching) {
      return (
        <div className="address-detail">
          <Spinner name="cube-grid"/>
        </div>
      )
    }

    if (addressData.isFailed) {
      return (
        <div className="AddressDetailsError">
          Couldn't find results for this address
        </div>
      )
    }



    return (
      <div className="address-details">
        <div className="address-details-sidebar">
          <AccountDetailsCard info={addressData.data} />
        </div>
        <div className="address-details-content">
          <AddressTransactionList ownerAccount={this.props.match.params.address} transactions={addressData.transactions} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountData: state.dataByAccount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAccountData: account => {
      dispatch(fetchAccountData(account))
    }  
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails)
