import React, { Component } from 'react';
import { connect } from 'react-redux'
import createAsset, { assetCreationChanged } from '../actions/createAsset'
import { TRANSACTION_BEGIN, TRANSACTION_FINISH, TRANSACTION_FAIL, TRANSACTION_CHANGED } from '../actionTypes'
import InlineLoadingSpinner from './InlineLoadingSpinner'

class CreateAsset extends Component {
  constructor() {
    super()
    this.state = {
      identifier: ""
    }
  }
  submit(e) {
    e.preventDefault()
    if (!this.props.keyPair) {
      alert("You need to unlock an account before creating assets")
      return
    }
    const identifier = this.state.identifier
    this.props.createAsset(this.props.keyPair, this.props.accountData, identifier)
  }

  invalidTransactionWarning() {
    return null
  }

  submitButton() {
    const buttonClassName = this.invalidTransactionWarning() ? 'invalid' : 'valid'
    return {
      [TRANSACTION_CHANGED]: <input type="submit" value="Get Assets" className={`submit-button ${buttonClassName}`} />,
      [TRANSACTION_BEGIN]: <InlineLoadingSpinner />,
      [TRANSACTION_FINISH]: "Success!",
      [TRANSACTION_FAIL]: "Failure :("
    }[this.props.loadingState]
  }

  render() {
    return (
      <div>
        <h2>Request KapCoins</h2>
        <div>
          KapCoin is a revolutionary inflationary trustful coin minted on the stellar testnet.
        </div>
        <div>
          It is issued by SteinBank.
        </div>
        <form
          className="transaction-form"
          ref={f => this.form = f}
          onSubmit={this.submit.bind(this)}>
          <div className="transaction-form-field-container">
            <label>
              How many?
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
    createAsset: (keyPair, accountData, identifier, amount) => {
      dispatch(createAsset(keyPair, accountData, "ETH"))
    },
    changeTransaction: _ => {
      dispatch({
        type: TRANSACTION_CHANGED
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAsset);
