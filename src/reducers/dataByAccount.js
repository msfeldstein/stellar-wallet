import { 
	REQUEST_ACCOUNT_DATA,
	RECEIVE_ACCOUNT_DATA
} from '../actions/accountData'

import update from 'immutability-helper';

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
		default:
			return state
	}
}



const dataByAccount = (state = {}, action) => {
	switch (action.type) {
		case REQUEST_ACCOUNT_DATA:
		case RECEIVE_ACCOUNT_DATA:
			return Object.assign({}, state, {
				[action.account]: data(state[action.account], action)
			})
		default:
			return state
	}
}

export default dataByAccount