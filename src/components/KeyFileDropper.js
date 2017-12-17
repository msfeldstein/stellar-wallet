import React, { Component } from 'react';
import FileDrop from 'react-file-drop'
import { StellarSdk } from '../stellar'
import { connect } from 'react-redux'
import {generateAccount, setKeypair, refreshAccount } from '../actions'
import './style/KeyFileDropper.css'

class KeyFileDropper extends Component {
  handleFileDrop(files, e) {
    const file = files[0]
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

  render() {
    return (
      <FileDrop frame={document} onDrop={this.handleFileDrop.bind(this)}>
        Drop your private key .json file here
      </FileDrop>
    );
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

export default connect(null, mapDispatchToProps)(KeyFileDropper);