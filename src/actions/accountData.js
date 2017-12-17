import server from '../stellar'

export const REQUEST_ACCOUNT_DATA = 'REQUEST_ACCOUNT_DATA'
function requestAccountData(account) {
	return {
		type: REQUEST_ACCOUNT_DATA,
		account
	}
}

export const RECEIVE_ACCOUNT_DATA = 'RECEIVE_ACCOUNT_DATA'
function receiveAccountData(account, data) {
	return {
		type: RECEIVE_ACCOUNT_DATA,
		account,
		data
	}
}

export function fetchAccountData(account) {
	return function(dispatch) {
		dispatch(requestAccountData(account))

		server.loadAccount(account)
		.then(resp => {
			console.log("GOT ACCOUNT DATA", account, resp)
			dispatch(receiveAccountData(account, resp))
		})
	}
}
