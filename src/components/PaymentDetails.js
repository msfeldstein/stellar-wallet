import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class PaymentDetails extends Component {
  render() {
    const det = this.props.details
    return (
      <div>
        <h2>Payment</h2>
        <table>
          <tbody>
            <tr>
              <td>From</td>
              <td>{det.from}</td>
            </tr>
            <tr>
              <td>To</td>
              <td>{det.to}</td>
            </tr>
            <tr>
              <td>Asset Type</td>
              <td>{det.asset_type}</td>
            </tr>
            <tr>
              <td>Amount</td>
              <td><NumberFormat
                  value={det.amount}
                  displayType={'text'}
                  thousandSeparator={true}
                  decimalScale={3} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default PaymentDetails;
