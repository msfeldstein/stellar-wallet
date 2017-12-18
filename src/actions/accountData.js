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

export const RECEIVE_ACCOUNT_TRANSACTIONS = 'RECEIVE_ACCOUNT_TRANSACTIONS'
function receiveAccountTransactions(account, transactions) {
	return {
		type: RECEIVE_ACCOUNT_TRANSACTIONS,
		account,
		transactions
	}
}

export function fetchAccountData(account) {
	return function(dispatch) {
		dispatch(requestAccountData(account))

		server.loadAccount(account)
		.then(resp => {
			dispatch(receiveAccountData(account, resp))
		})

		server.transactions()
    	.forAccount(account)
    	.order('desc')
    	.call()
    	.then(resp => {
    		dispatch(receiveAccountTransactions(account, resp.records))
    	});
	}
}
