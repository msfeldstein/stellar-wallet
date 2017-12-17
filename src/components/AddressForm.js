import React, { Component } from 'react';

class AddressForm extends Component {
  constructor() {
    super()
    this.state = {
      address: ''
    }
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleAddressChange(e) {
    this.setState({address: e.target.value})
  }

  handleSubmit(e) {
    this.props.addressLookup(this.state.address)
    e.preventDefault()
  }

  render() {
    return (
      <div className="AddressForm">
        <form onSubmit={this.handleSubmit}>
          <input className="lookup-field" placeholder="Stellar address or transaction" type="text" value={this.state.address} onChange={this.handleAddressChange}/>
        </form>
      </div>
    );
  }
}

export default AddressForm;
