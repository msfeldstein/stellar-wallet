import React, { Component } from 'react';
import Spinner from 'react-spinkit'
import PaymentDetails from './PaymentDetails'
import './transaction.css'

class TransactionDetails extends Component {
  constructor() {
    super()
    this.state = {
      loadingTransaction: true,
      loadingOperations: true
    }
  }
  componentDidMount() {
    fetch(`http://ec2-54-219-166-165.us-west-1.compute.amazonaws.com:8000/transactions/${this.props.transaction}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        loadingTransaction: false,
        info: json
      })
      console.log("Transaction", json)
    })

    fetch(`http://ec2-54-219-166-165.us-west-1.compute.amazonaws.com:8000/transactions/${this.props.transaction}/operations`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        loadingOperations: false,
        operations: json
      })
      console.log("Operations", json)
    })
  }
  render() {
    if (this.state.loadingTransaction || this.state.loadingOperations) {
      return (
        <div className="AddressDetails">
          <Spinner name="cube-grid"/>
        </div>
      )
    }
    const info = this.state.info
    const rows = [
      ['Created At', info.created_at],
      ['Ledger', info.ledger],
      ['Source Account', info.source_account]
    ]
    const tableRows = rows.map(row => {
      return <tr key={row[0]}>
        <td>
          {row[0]}
        </td>
        <td>
          {row[1]}
        </td>
      </tr>
    })

    const operations = this.state.operations._embedded.records.map(record => {
      if (record.type === 'payment') {
        return <PaymentDetails details={record} />
      } else {
        return <div>Unknown operation</div>
      }
    })
    return (
      <div className="TransactionDetails">
        <h3>Details for transaction {this.props.transaction}</h3>
        <table className='TransactionDetailRows'>
          <tbody>
            {tableRows}
          </tbody>
        </table>
        {operations}
      </div>
    );
  }
}

export default TransactionDetails;
