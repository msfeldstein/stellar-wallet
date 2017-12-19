import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class AddressBalances extends Component {
  balanceToAssetTypeLabel(balance) {
    if (balance.asset_type === 'native') return 'xlm'
    return balance.asset_code
  }
  render() {
    const balances = this.props.balances.map((balance) => {
      console.log(balance)
      return <div key={balance.asset_type}>
        <b>{this.balanceToAssetTypeLabel(balance)}: </b>
        <NumberFormat
          value={balance.balance}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={3} />
      </div>
    })

    const wrapperStyles = {
      textAlign: 'left',
      padding: 16
    }
    return (
      <div className="AddressBalances" style={wrapperStyles}>
        <h3>Balances</h3>
        {balances}
      </div>
    );
  }
}

export default AddressBalances;
