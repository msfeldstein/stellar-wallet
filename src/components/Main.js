import React, { Component } from 'react'
import NetworkExplorer from './NetworkExplorer'
import CreateAccount from './CreateAccount'
import CreateAsset from './CreateAsset'
import CreateTransaction from './CreateTransaction'
import {Route, Switch} from 'react-router'

class Main extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="main-content">
      	<Switch>
    			<Route exact path="/" component={CreateAccount}/>
    			<Route path="/query" component={NetworkExplorer} />
          <Route exact path="/create-transaction" component={CreateTransaction}/>
    			<Route exact path="/create-account" component={CreateAccount}/>
          <Route exact path="/assets" component={CreateAsset}/>
  		  </Switch>
      </div>
    );
  }
}

export default Main;
