import {LOAD_ACCOUNT, UPDATE_ACCOUNT_INFO} from '../actionTypes'
import server from '../stellar'

function setAccountData(address, data) {
	return {
		type: UPDATE_ACCOUNT_INFO,
		address: address,
		data: data
	}
}

export function refreshAccount(address) {
	return function(dispatch) {
		server.loadAccount(address)
		.then(resp => {
			dispatch(setAccountData(address, resp))
		})
	}
}

export function setKeypair(pair) {
	console.error("Should not be storing account in localStorage, but for development this is easier")
	localStorage.setItem('account', JSON.stringify({
      publicKey: pair.publicKey(),
      secret: pair.secret()
    }, null, 2))
	return function(dispatch) {
		dispatch({
			type: LOAD_ACCOUNT,
			pair
		})
		console.log("Subscribing for account ", pair.publicKey())
		server.transactions()
	    .forAccount(pair.publicKey())
		.cursor('now')
		.stream({
			onmessage: function (message) {
		    	console.log("Subscription Message", message);
		    	dispatch(refreshAccount(pair.publicKey()))
			}
		})	
	}
	
}

export function generateAccount() {
	return function(dispatch) {
		var pair = window.StellarSdk.Keypair.random();
		dispatch(setKeypair(pair))
		let retry = true
		const friendbot = () => {
			server.friendbot(pair.publicKey())
				.call()
				.then(_ => {
					dispatch(refreshAccount(pair.publicKey()))
					console.log("Subscribing for account ", pair.publicKey())
					server.transactions()
				    .forAccount(pair.publicKey())
					.cursor('now')
					.stream({
						onmessage: function (message) {
							console.log("Subscription Message", message);
							dispatch(refreshAccount(pair.publicKey()))
						}
					})	
				})
				.catch(_ => {
					// Sometimes friendbot fails the first time so lets retry once
					if (retry) {
						retry = false
						friendbot()
					}
				})	
		}
		friendbot()
		
	}
	
}
