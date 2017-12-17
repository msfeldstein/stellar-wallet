import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AccountHeaderDetails from './AccountHeaderDetails'

class AccountLockStatus extends Component {
  constructor() {
    super()
    this.state = {
      expand: false
    }
  }

  expand() {
    this.setState({
      expand: true
    })
  }
  render() {
  	let message = 'No Account Loaded 😴'

  	let statusClassName = ''
  	if (this.props.status === 'loaded') {
  		message = 'Account loaded but locked'
  		statusClassName = 'locked'
  	}
  	if (this.props.status === 'unlocked') {
      const shortname = this.state.expand ? this.props.address : this.props.address.substring(50, 56)
      const link = <Link to={`/query/address/${this.props.address}`}>{shortname}</Link>
  		message = (
        <span>
          Account 
          <span><span onClick={this.expand.bind(this)}> ...</span>{link} </span>
           loaded and unlocked</span>
      )
  		statusClassName = 'unlocked'
  	}

    return (
      <div className={`AccountLockedStatus ${statusClassName}`}>
        {message}
        <AccountHeaderDetails />
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
export default connect(mapStateToProps, null)(AccountLockStatus)
