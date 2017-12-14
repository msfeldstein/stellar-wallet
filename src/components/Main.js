import React, { Component } from 'react';
import QueryComponent from './QueryComponent'
import CreateAccountComponent from './CreateAccountComponent'
import {Route, Switch} from 'react-router'

class Main extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
    	<Switch>
  			<Route exact path="/" component={QueryComponent}/>
  			<Route exact path="/query" component={QueryComponent}/>
  			<Route exact path="/create-account" component={CreateAccountComponent}/>
  			
		</Switch>
    );
  }
}

export default Main;
