import React, { Component } from 'react';
import QRCode from './QRCode'
import PropTypes from 'prop-types';
import './style/AddressDisplay.css'

class AddressDisplay extends Component {
 	constructor(props) {
 		super(props)
 		this.state = {
 			visible: !this.props.isPrivate
 		}
 	}

 	show() {
 		this.setState({
 			visible: true
 		})
 	}

 	visibleDisplay() {
 		const privateClass = this.props.isPrivate ? 'isPrivate' : ''
 		return (
 			<div className={`card AddressDisplay ${privateClass}`}>
 				<div className="AddressDisplayTitle">{this.props.title}</div>
    			<QRCode data={this.props.address} />
    			<div className="AddressDisplayAddress">
    				{this.props.address}
    			</div>
    		</div>
    	)
 	}

 	hiddenDisplay() {
 		return (
 			<div className="card AddressDisplay isPrivate">
 				<div className="PrivateKeyWarning">This is a private key. Keep this safe and do not let anyone else see this</div>
    			<button onClick={this.show.bind(this)}>Show</button>
    		</div>
    	)
 	}

 	render() {
    	return this.state.visible ? this.visibleDisplay() : this.hiddenDisplay()
  	}
}

AddressDisplay.propTypes = {
	address: PropTypes.string.isRequired,
	isPrivate: PropTypes.bool
}

AddressDisplay.defaultProps = {
	isPrivate: false
}

export default AddressDisplay;
