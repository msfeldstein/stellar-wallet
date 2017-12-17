import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'
import { setKeypair, refreshAccount } from './actions'
import { StellarSdk } from './stellar'

const store = createStore(reducers, composeWithDevTools(
	applyMiddleware(ReduxThunk))
)

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>, document.getElementById('root'));


let account = JSON.parse(localStorage.getItem('account'))
if (account) {
	console.log(account)
	const pair = StellarSdk.Keypair.fromSecret(account.secret)
	store.dispatch(setKeypair(pair)) 
	store.dispatch(refreshAccount(pair.publicKey()))
}