import React, { Component } from 'react'
import { connect } from 'react-redux'
import { generateAccount, setKeypair, refreshAccount } from '../actions'
import AddressDisplay from './AddressDisplay'
import { StellarSdk } from '../stellar'

import './style/Account.css'


class CreateAccount extends Component {
  constructor() {
    super()
    this.state = {}
    this.fileInput = document.createElement('input')
    this.fileInput.type = 'file'
    this.fileInput.onchange = this.fileChanged.bind(this)
  }

  fileChanged(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (file) => {
      try {
        const json = JSON.parse(reader.result)
        if (!json.publicKey || !json.secret) throw new Error("Bad JSON Values")
        const pair = StellarSdk.Keypair.fromSecret(json.secret)
        this.props.setKeypair(pair)
        this.props.refreshAccount(pair.publicKey())
      } catch (e) {
        alert("Something was wrong with your keyfile")
      }
    }
    reader.readAsText(file)
  }

  create() {
    this.props.generateAccount()
  }

  load() {
    this.fileInput.click()
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
        <div className="AddressDisplayRow">
          <AddressDisplay address={pair.publicKey()} title="Public Key" />
          <AddressDisplay address={pair.secret()} isPrivate={true} title="Private Key" />
        </div>
        <br />
        <a href={dataStr} download="stellar.json"><button>Download</button></a>
      </div>
    )
  }

  render() {
    return (
      <div className="AccountManagement">
        <h2>Manage your account</h2>
        <button onClick={this.create.bind(this)}>Create a fresh account <span role="img" aria-label="dice">🎲</span></button>
        <button onClick={this.load.bind(this)}>Load an account <span role="img" aria-label="disk">💾</span></button>
        {this.keyDetails()}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    keyPair: state.accountState.pair
  }
}

let mapDispatchToProps = dispatch => {
  return {
    generateAccount: _ => {
      dispatch(generateAccount())
    },
    refreshAccount: address => {
      dispatch(refreshAccount(address))
    },
    setKeypair: pair => {
      dispatch(setKeypair(pair))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
