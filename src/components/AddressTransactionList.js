import React, { Component } from 'react';
import Spinner from 'react-spinkit'
import TransactionListEntry from './TransactionListEntry'

class AddressTransactionList extends Component {
  render() {
    let transactions = <Spinner name="cube-grid" />
    if (this.props.transactions) {
      transactions = this.props.transactions.map((t) => {
        return <TransactionListEntry ownerAccount={this.props.ownerAccount} key={t.id} transaction={t} />
      })
    }

    return (
      <div className="address-transaction-list">
        {transactions}
      </div>
    );
  }
}

export default AddressTransactionList;
