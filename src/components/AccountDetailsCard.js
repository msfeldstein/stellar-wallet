import React, { Component } from 'react';
import Spinner from 'react-spinkit'
import AddressBalances from './AddressBalances'
import QRCode from './QRCode'
import { connect } from 'react-redux'

class AccountDetailsCard extends Component {
  render() {
    const addressData = this.props.info
    if (!addressData || addressData.isFetching) {
      return (
        <div className="AccountDetailsCard">
          <Spinner name="cube-grid"/>
        </div>
      )
    }

    if (addressData.isFailed) {
      return (
        <div className="AccountDetailsCardError">
          Couldn't find results for this address
        </div>
      )
    }

    return (
      <div className="address-details-card card" >
        <div className="address-details-card-address">
          {addressData.id}
        </div>
        <div className="adddress-details-card-balances">
          <AddressBalances balances={addressData.balances} />
        </div> 
        <div className="address-details-card-qrcode">
          <QRCode data={addressData.id} options={{color: {light: '#F5F5F5'}}} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { }
}

const mapDispatchToProps = dispatch => {
  return { }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsCard)
