import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Tooltip from 'react-simple-tooltip'

class TransactionListEntry extends Component {
  render() {
    const op = this.props.operation
    const style = {
      margin: 8,
      background: 'white',
      width: 400
    }

    const info = []
    info.push(['ID', op.id])
    info.push(['Type', op.type])
    info.push(['Source', (
        <Tooltip content={op.source_account}>
         <Link to={`/query/address/${op.source_account}`}>...{op.source_account.substring(50, 56)}</Link>
        </Tooltip>
      )])
    if (op.type === 'payment') {
      info.push(['Destination', (
        <Tooltip content={op.to}>
          <Link to={`/query/address/${op.to}`}>...{op.to.substring(50, 56)}</Link>
        </Tooltip>
      )])
      info.push(['Amount', op.amount])
    }
    return (
      <div key={op.id} style={style}>
        <table className="operationListEntry">
          <tbody>
            {
              info.map(i => {
                return (
                  <tr key={i[0]}>
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