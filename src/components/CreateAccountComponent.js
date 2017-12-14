import React, { Component } from 'react'
import { connect } from 'react-redux'
import {generateAccount} from '../actions'

class CreateAccountComponent extends Component {
  constructor() {
    super()
    this.state = {}
  }

  create() {
    this.props.generateAccount()
  }

  keyDetails() {
    const pair = this.props.keyPair
    if (!pair) return null
    const pairJson = JSON.stringify({
      publicKey: pair.publicKey(),
      secret: pair.secret()
    }, null, 2)
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(pairJson);
    return (
      <div>
        <h2>Public Key</h2>
        {pair.publicKey()}
        <h2>Private Key</h2>
        {pair.secret()}
        <br />
        <a href={dataStr} download="stellar.json"><button>Download</button></a>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Create a new account</h2>
        <button onClick={this.create.bind(this)}>Create a random account <span role="img" aria-label="dice">🎲</span></button>
        {this.keyDetails()}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    keyPair: state.accountState.keyPair
  }
}

let mapDispatchToProps = dispatch => {
  return {
    generateAccount: _ => {
      dispatch(generateAccount())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountComponent);
