import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AccountLockStatus extends Component {
  render() {
  	let message = 'No Account Loaded'
  	let statusClassName = ''
    let link = null
  	if (this.props.status === 'loaded') {
  		message = 'Account loaded but locked'
  		statusClassName = 'locked'
  	}
  	if (this.props.status === 'unlocked') {
  		message = 'Account loaded and unlocked!'
  		statusClassName = 'unlocked'
      link = <Link to={`/query/address/${this.props.address}`}>Details</Link>
  	}
    return (
      <div className="AccountLockedStatus {statusClassName}">
        {message}
        {link}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE", state)
	return {
		status: state.accountState.status,
    address: state.accountState.publicKey
	}
}
export default connect(mapStateToProps, null)(AccountLockStatus)
