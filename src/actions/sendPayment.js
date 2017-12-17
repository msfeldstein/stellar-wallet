import server, { StellarSdk } from '../stellar'
import {TRANSACTION_BEGIN, TRANSACTION_FINISH, TRANSACTION_FAIL, TRANSACTION_CHANGED} from '../actionTypes'

function sendPayment(keypair, accountData, destination, amount) {
	return function(dispatch) {
		dispatch({
			type: TRANSACTION_BEGIN
		})
    const account = new StellarSdk.Account(accountData.id, accountData.sequence)
		var transaction = new StellarSdk.TransactionBuilder(account)
    .addOperation(StellarSdk.Operation.payment({
      destination: destination,
      asset: StellarSdk.Asset.native(),
      amount: amount
    }))
    .build();

    transaction.sign(keypair)
    server.submitTransaction(transaction)
    .then(result => {
      console.log("Transaction succeded")
      dispatch({
        type: TRANSACTION_FINISH
      })
    })
    .catch(err => {
      dispatch({
        type: TRANSACTION_FAIL
      })
      console.error("Transaciton failed",err)
    })
	}
}

export function transactionChanged() {
  return {
    type: TRANSACTION_CHANGED
  }
}

export default sendPayment