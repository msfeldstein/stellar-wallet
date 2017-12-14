import React, { Component } from 'react';
import server from './stellar'


class CreateAccountComponent extends Component {
  create() {
    
  }

  render() {
    return (
      <div>
        <h2>Create a new account</h2>
        <button onClick={this.create.bind(this)}>Create a random account <span role="img" aria-label="dice">🎲</span></button>
      </div>
    );
  }
}

export default CreateAccountComponent;
