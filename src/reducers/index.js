import { combineReducers } from 'redux'
import accountState from './accountState'
import transactions from './transactions'

const reducers = combineReducers({
	accountState,
	transactions,
})

export default reducers