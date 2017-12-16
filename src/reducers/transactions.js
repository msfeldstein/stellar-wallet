import { TRANSACTION_BEGIN, TRANSACTION_FINISH, TRANSACTION_FAIL, TRANSACTION_CHANGED } from '../actionTypes'
import update from 'immutability-helper';

const accountState = (state = {
	status: TRANSACTION_CHANGED,
}, action) =>
{
	switch (action.type) {
		case TRANSACTION_BEGIN:
			return update(state, {
				status: {$set: TRANSACTION_BEGIN}
			})
		case TRANSACTION_FINISH:
			return update(state, {
				status: {$set: TRANSACTION_FINISH}
			})
		case TRANSACTION_FAIL:
			return update(state, {
				status: {$set: TRANSACTION_FAIL}
			})
		case TRANSACTION_CHANGED:
			return update(state, {
				status: {$set: TRANSACTION_CHANGED}
			})
		default:
			return state
	}
}

export default accountState