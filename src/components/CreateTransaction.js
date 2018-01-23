import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sendPayment } from '../actions'
import { TRANSACTION_BEGIN, TRANSACTION_FINISH, TRANSACTION_FAIL, TRANSACTION_CHANGED } from '../actionTypes'
import InlineLoadingSpinner from './InlineLoadingSpinner'

class CreateTransactionComponent extends Component {
  constructor() {
    super()
    this.state = {
      amount: "",
      destination: "",
      memo: ""
    }
  }
  submit(e) {
    e.preventDefault()
    if (!this.props.keyPair) {
      alert("You need to unlock an account before sending anything")
      return
    }
    const value = this.state.amount
    const destination = this.state.destination
    this.props.sendPayment(this.props.keyPair, this.props.accountData, destination, value)
  }

  invalidTransactionWarning() {
    if (this.state.destination.length !== 56) {
      return "Invalid address"
    }
    if (parseFloat(this.state.amount) <= 0 || isNaN(parseFloat(this.state.amount))) {
      return "Invalid amount"
    }
    return null
  }

  submitButton() {
    const buttonClassName = this.invalidTransactionWarning() ? 'invalid' : 'valid'
    return {
      [TRANSACTION_CHANGED]: <input type="submit" value="Send" className={`submit-button ${buttonClassName}`} />,
      [TRANSACTION_BEGIN]: <InlineLoadingSpinner />,
      [TRANSACTION_FINISH]: "Success!",
      [TRANSACTION_FAIL]: "Failure :("
    }[this.props.loadingState]
  }

  render() {
    return (
      <div>
        <h2>Create a new transaction</h2>
        <form
          className="transaction-form"
          ref={f => this.form = f}
          onSubmit={this.submit.bind(this)}>
          <div className="transaction-form-field-container">
          	<label>
              Send
            </label>
          	<input
              className="amountField"
              placeholder="Amount"
              type="number"
              value={this.state.amount}
              onChange={e => {
                  this.props.changeTransaction()
                  this.setState({amount: e.target.value})
                }
              }
              />
          </div>
          <div className="transaction-form-field-container">
          	<label>
              To
            </label>
          	<input
              className="destinationField"
              placeholder="Destination"
              type="text"
              value={this.state.destination}
              onChange={e => {
                  this.props.changeTransaction()
                  this.setState({destination: e.target.value})
                }
              }
              />
          </div>
          <div className="transaction-form-field-container">
            <label>
              With memo
            </label>
            <input
              className="memo-field"
              placeholder="Memo (Optional)"
              type="text"
              value={this.state.memo}
              onChange={e => {
                  this.props.changeTransaction()
                  this.setState({memo: e.target.value})
                }
              }
              />
            </div>
          {this.submitButton()}
        </form>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    loadingState: state.transactions.status,
    keyPair: state.accountState.pair,
    accountData: state.accountState.data
  }
}

let mapDispatchToProps = dispatch => {
  return {
    sendPayment: (keyPair, accountData, destination, value) => {
      dispatch(sendPayment(keyPair, accountData, destination, value))
    },
    changeTransaction: _ => {
      dispatch({
        type: TRANSACTION_CHANGED
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransactionComponent);
