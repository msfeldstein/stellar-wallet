import React, { Component } from 'react';
import server from './stellar'
import Request from 'request'
window.server = server

window.server = server
class CreateAccountComponent extends Component {
  constructor() {
    super()
    this.state = {}
  }

  create() {
    var pair = window.StellarSdk.Keypair.random();
    console.log(pair)
    window.pair = pair
    server.friendbot(pair.publicKey())
    // .then(resp => console.log(resp))
    // .catch(e => console.error(e))
    this.setState({pair})
  }

  keyDetails() {
    if (!this.state.pair) return null
    const pairJson = JSON.stringify({
      publicKey: this.state.pair.publicKey(),
      secret: this.state.pair.secret()
    }, null, 2)
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(pairJson);
    return (
      <div>
        <h2>Public Key</h2>
        {this.state.pair.publicKey()}
        <h2>Private Key</h2>
        {this.state.pair.secret()}
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

export default CreateAccountComponent;
