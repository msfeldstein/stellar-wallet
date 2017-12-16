import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sendPayment } from '../actions'

class CreateTransactionComponent extends Component {
  submit(e) {
    const value = this.amountField.value
    const destination = this.destinationField.value
    console.log("Send", value, 'to', destination)
    e.preventDefault()
    window.form = this.form
    this.props.sendPayment(this.props.keyPair, this.props.accountData, destination, value)
  }

  render() {
    return (
      <div>
        <h2>Create a new transaction</h2>
        <form
          className="transactionForm"
          ref={f => this.form = f}
          onSubmit={this.submit.bind(this)}>
        	Send 
        	<input
            ref={f => this.amountField = f}
            className="amountField"
            placeholder="Amount"
            type="number"
            value="100" />
        	XLM To
        	<input
            ref={f => this.destinationField = f}
            className="destinationField"
            placeholder="Destination"
            type="text"
            value="GCETBMSVRR6UB2TGRIYUZQXQGUCLHK7XPMGJIWDZVGV3K3XLIVPTWUH4" />
          <input type="submit" value="Send"/>
        </form>
      </div>
    );
  }
}

let mapStateToProps = state => {
  console.log("STATE", state)
  return {
    keyPair: state.accountState.pair,
    accountData: state.accountState.data
  }
}

let mapDispatchToProps = dispatch => {
  return {
    sendPayment: (keyPair, accountData, destination, value) => {
      dispatch(sendPayment(keyPair, accountData, destination, value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransactionComponent);
