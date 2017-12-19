import server, { StellarSdk } from '../stellar'

export const ASSET_CREATION_BEGIN = "ASSET_CREATION_BEGIN"
export const ASSET_CREATION_SUCCESS = "ASSET_CREATION_SUCCESS"
export const ASSET_CREATION_FAILED = "ASSET_CREATION_FAILED"
export const ASSET_CREATION_CHANGED = "ASSET_CREATION_CHANGED"

const KAP_COIN_CREATOR_PUBLIC = 'GDFXTCKK54E5Y3A5U7N77SNCJX64GD7LDFYR7BRJ26QPKYL5RQHDXNKH'
const KAP_COIN_CREATOR_SECRET = 'SBZZU5L7SAZDSFQ52Z6DZBUPNNIN44O5PZDFMF57TSCSXZ2ZV7QEV55P'

function createAsset(keypair, accountData, identifier) {
	return function(dispatch) {
		dispatch({
			type: ASSET_CREATION_BEGIN
		})
    const issuingKey = StellarSdk.Keypair.fromSecret(KAP_COIN_CREATOR_SECRET)
    const receivingKey = keypair

    const asset = new StellarSdk.Asset(identifier, issuingKey.publicKey())

    server.loadAccount(receivingKey.publicKey())
    .then(receiver => {
      const trustTransaction = new StellarSdk.TransactionBuilder(receiver)  
        .addOperation(StellarSdk.Operation.changeTrust({
          asset: asset,
          limit: '100'
        }))
        .build()
      trustTransaction.sign(receivingKey)
      return server.submitTransaction(trustTransaction)
    })
    .then(_ => {
      return server.loadAccount(issuingKey.publicKey())
    })
    .then(issuer => {
      const issueTransaction = new StellarSdk.TransactionBuilder(issuer)
        .addOperation(StellarSdk.Operation.payment({
          destination: receivingKey.publicKey(),
          asset: asset,
          amount: "92"
        }))
        .build()
      issueTransaction.sign(issuingKey)
      return server.submitTransaction(issueTransaction)
    })
    .then(_ => {
      dispatch({
        type: ASSET_CREATION_SUCCESS
      })
    })
    .catch(e => {
      console.error("Asset Create Failed", e)
      dispatch({
        type: ASSET_CREATION_FAILED
      })
    })
	}
}

export function assetCreationChanged() {
  return {
    type: ASSET_CREATION_CHANGED
  }
}

export default createAsset