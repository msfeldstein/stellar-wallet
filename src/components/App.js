import React, { Component } from 'react';
import Header from './Header'
import Main from './Main'
import './style/App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
