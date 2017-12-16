import server, { StellarSdk } from '../stellar'
import {TRANSACTION_BEGIN, TRANSACTION_FINISH, TRANSACTION_FAIL} from '../actionTypes'

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
       		dispatch({
       			type: TRANSACTION_FINISH
       		})
       		console.log("TRANSACTION RESULT")
       	})
       	.catch(err => {
       		dispatch({
       			type: TRANSACTION_FAIL
       		})
       		console.err("FAIL",err)
       	})
	}
}

export default sendPayment