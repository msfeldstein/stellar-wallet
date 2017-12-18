import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class TransactionListEntry extends Component {
  render() {
    const op = this.props.operation
    const style = {
      margin: 8,
      background: 'white'
    }

    const info = []
    info.push(['ID', op.id])
    info.push(['Type', op.type])
    info.push(['Source', <Link to={`/query/address/${op.source_account}`}>{op.source_account}</Link>])
    if (op.type === 'payment') {
      info.push(['Destination', <Link to={`/query/address/${op.to}`}>{op.to}</Link>])
      info.push(['Amount', op.amount])
    }
    return (
      <div key={op.id} style={style}>
        <table className="operationListEntry">
          <tbody>
            {
              info.map(i => {
                return (
                  <tr>
                    <td>
                      {i[0]}
                    </td>
                    <td>
                      {i[1]}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default TransactionListEntry;
