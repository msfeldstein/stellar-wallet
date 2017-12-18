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
    this.props.transaction.operations()
    .then(o => {
      console.log("Operations", o, this.props.transaction)
      this.setState({
        operations: o._embedded.records
      })
    })
  }
  render() {
    window.transaction = this.props.transaction
    return this.state.operations.map(o => {
      return <OperationListEntry key={o.id} operation={o} />
    })
  }
}

export default TransactionListEntry;
