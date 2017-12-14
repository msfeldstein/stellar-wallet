import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class AddressBalances extends Component {
  render() {
    const balances = this.props.balances.map((balance) => {
      return <div key={balance.asset_type}>
        <b>{balance.asset_type}: </b>
        <NumberFormat
          value={balance.balance}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={3} />
      </div>
    })
    return (
      <div className="AddressBalances">
        {balances}
      </div>
    );
  }
}

export default AddressBalances;
