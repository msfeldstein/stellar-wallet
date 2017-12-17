import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import InlineLoadingSpinner from './InlineLoadingSpinner'
import NumberFormat from 'react-number-format';

class AccountHeaderDetails extends Component {
  render() {
    if (this.props.status !== 'unlocked') return null
    const balance = this.props.balance ? 
      <NumberFormat value={this.props.balance} displayType="text" decimalScale={3} thousandSeparator={true} />
      : <InlineLoadingSpinner />
    
    return (
      <div className="AccountHeaderDetails ${statusClassName">
        <div>
          Available Balance:
          <Link to={`/query/address/${this.props.address}`}>
            {balance}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const account = state.accountState
  let balance = null
  if (account.data.balances) {
    let xlmBalance = account.data.balances.find(b => b.asset_type === 'native')
    balance = xlmBalance ? xlmBalance.balance : null
  }
	return {
		status: account.status,
    address: account.address,
    balance: balance
	}
}
export default connect(mapStateToProps, null)(AccountHeaderDetails)
