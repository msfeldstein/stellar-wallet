import {LOAD_ACCOUNT, UPDATE_ACCOUNT_INFO} from '../actionTypes'
import server from '../stellar'

function setAccountData(address, data) {
	console.log("Got data ", address, data)
	return {
		type: UPDATE_ACCOUNT_INFO,
		address: address,
		data: data
	}
}

export function refreshAccount(address) {
	console.log("Refreshing")
	return function(dispatch) {
		server.loadAccount(address)
		.then(resp => {
			dispatch(setAccountData(address, resp))
		})
	}
}

export function setKeypair(pair) {
	console.log("Setting keypari")
	return {
		type: LOAD_ACCOUNT,
		pair
	}
}

export function generateAccount() {
	console.log("GENERARTE")
	return function(dispatch) {
		var pair = window.StellarSdk.Keypair.random();
		window.pair = pair

		dispatch(setKeypair(pair))
		let retry = true
		const friendbot = () => {
			server.friendbot(pair.publicKey())
				.call()
				.then(_ => dispatch(refreshAccount(pair.publicKey())))
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
