import React, { Component } from 'react';
import Spinner from 'react-spinkit'
import TransactionListEntry from './TransactionListEntry'

class AddressTransactionList extends Component {
  render() {
    let transactions = <Spinner name="cube-grid" />
    if (this.props.transactions) {
      transactions = this.props.transactions.map((t) => {
        return <TransactionListEntry key={t.id} transaction={t} />
      })
    }

    const wrapperStyles = {
      textAlign: 'left',
      padding: 16
    }
    return (
      <div className="AddressTransactionList" style={wrapperStyles}>
        <h3>Transactions</h3>
        {transactions}
      </div>
    );
  }
}

export default AddressTransactionList;
