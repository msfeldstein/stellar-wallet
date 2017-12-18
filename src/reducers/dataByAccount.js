import { 
	REQUEST_ACCOUNT_DATA,
	RECEIVE_ACCOUNT_DATA,
	RECEIVE_ACCOUNT_TRANSACTIONS
} from '../actions/accountData'

const data = (state = {
	isFetching: false,
	isFailed: false,
	data: null	
}, action) =>
{
	switch (action.type) {
		case REQUEST_ACCOUNT_DATA:
			return Object.assign({}, state, {
				isFetching: true,
				isFailed: false
			})
		case RECEIVE_ACCOUNT_DATA:
			return Object.assign({}, state, {
				isFetching: false,
				data: action.data
			})
		case RECEIVE_ACCOUNT_TRANSACTIONS:
			return Object.assign({}, state, {
				transactions: action.transactions
			})
		default:
			return state
	}
}



const dataByAccount = (state = {}, action) => {
	switch (action.type) {
		case REQUEST_ACCOUNT_DATA:
		case RECEIVE_ACCOUNT_DATA:
		case RECEIVE_ACCOUNT_TRANSACTIONS:
			return Object.assign({}, state, {
				[action.account]: data(state[action.account], action)
			})
		default:
			return state
	}
}

export default dataByAccount