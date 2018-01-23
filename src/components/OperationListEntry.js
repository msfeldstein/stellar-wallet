import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Tooltip from 'react-simple-tooltip'
import assetTypeToTicker from '../util/assetTypeToTicker'
import NumberFormat from 'react-number-format';

import './style/Operation.css'

class TransactionListEntry extends Component {
  emojiForType(type) {
    return {
      // payment: '💵',
      create_account: '👶'
    }[type] || ''

  }

  classNameForOp(op) {
    if (op.type === 'payment') {
      if (op.source_account === this.props.ownerAccount) {
        return 'outgoing-payment'
      } else {
        return 'incoming-payment'
      }
    }
    return null
  }

  amountForOp(op) {
    let sign = op.source_account === this.props.ownerAccount ? '-' : '+'
    let amount = <NumberFormat value={op.amount} displayType="text" decimalScale={3} thousandSeparator={true} />
    return <span className={this.classNameForOp(op)}>{sign}{amount} {assetTypeToTicker(op)}</span>
  }

  paymentRowForOp(op) {
    let amount = this.amountForOp(op)
    return <div className="operation-payment-row">
      <div className="operation-payment-row-address operation-payment-row-addres-source">
        <Tooltip content={op.source_account}>
         <Link to={`/query/address/${op.source_account}`}>...{op.source_account.substring(50, 56)}</Link>
        </Tooltip>
      </div>
      <div className="operation-payment-row-spend-arrow">
        {amount}
      </div>
      <div className="operation-payment-row-address operation-payment-row-addres-destination">
        <Tooltip content={op.to}>
         <Link to={`/query/address/${op.to}`}>...{op.to.substring(50, 56)}</Link>
        </Tooltip>
      </div>
    </div>
  }

  rowContentForOp(op) {
    switch (op.type) {
      case 'payment':
        return this.paymentRowForOp(op)
      default:
        console.log("OP", op)
        return null
    }
  }

  render() {
    const op = this.props.operation

    return (
      <div key={op.id} className="card operation-list-entry">
        <div className="operation-header">
          {op.type}
          <div className="operation-date">
            {op.created_at}
          </div>
        </div>
        <div className="operation-content">
          {this.rowContentForOp(op)}
        </div>
      </div>
    )
  }
}

export default TransactionListEntry;
