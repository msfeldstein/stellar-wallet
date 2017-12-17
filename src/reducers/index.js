import { combineReducers } from 'redux'
import accountState from './accountState'
import transactions from './transactions'
import dataByAccount from './dataByAccount'

const reducers = combineReducers({
	accountState,
	transactions,
	dataByAccount
})

export default reducers