import React, { Component } from 'react';
import OperationListEntry from './OperationListEntry'

class TransactionListEntry extends Component {
  constructor() {
    super()
    this.state = {
      operations: []
    }
  }
  componentDidMount() {
    console.log(this.props.transaction)
    this.props.transaction.operations()
    .then(o => {
      this.setState({
        operations: o._embedded.records
      })
    })
  }
  render() {
    window.transaction = this.props.transaction
    return this.state.operations.map(o => {
      return <OperationListEntry ownerAccount={this.props.ownerAccount} key={o.id} operation={o} />
    })
  }
}

export default TransactionListEntry;
