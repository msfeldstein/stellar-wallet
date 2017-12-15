import React, { Component } from 'react';

class CreateTransactionComponent extends Component {
  submit() {

  }

  render() {
    return (
      <div>
        <h2>Create a new transaction</h2>
        <form className="transactionForm" ref={f => this.form = f} onSubmit={this.submit.bind(this)}>
        	Send 
        	<input className="amountField" placeholder="Amount" type="text" />
        	XLM To
        	<input className="destinationField" placeholder="Destination" type="text" />
        	<submit />
        </form>
      </div>
    );
  }
}

export default CreateTransactionComponent;
