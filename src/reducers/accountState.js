import { UPDATE_ACCOUNT_INFO, LOAD_ACCOUNT, CLEAR_ACCOUNT} from '../actionTypes'
import update from 'immutability-helper';

const accountState = (state = {
	status: 'unloaded',
	address: null,
	data: {} }, action) =>
{
	console.log("ACTION", action)
	switch (action.type) {
		case LOAD_ACCOUNT:
			const status = action.pair ? 'unlocked' : 'loaded'
			return update(state, {
				pair: {$set: action.pair},
				status: {$set: status},
				address: {$set: action.publicKey || action.pair.publicKey()},
				data: {$set: {}}
			})
		case CLEAR_ACCOUNT:
			return update(state, {
				status: {$set: 'unloaded'},
				address: null,
				data: {$set: {}}
			})
		case UPDATE_ACCOUNT_INFO:
			return update(state, {
				data: {$set: action.data}
			})
		default:
			return state
	}
}

export default accountState