import { GENERATE_ACCOUNT, LOAD_ACCOUNT, CLEAR_ACCOUNT} from '../actionTypes'
import server from '../stellar'
console.log("SERVER", server)
const accountState = (state = { status: 'unloaded' }, action) => {
	switch (action.type) {
		case GENERATE_ACCOUNT:
			var pair = window.StellarSdk.Keypair.random();
		    window.pair = pair
		    server.friendbot(pair.publicKey()).call()
		    console.log("GENERATED")
			return {
				status: 'unlocked',
				keyPair: pair,
				publicKey: pair.publicKey()
			}
		case LOAD_ACCOUNT:
			return {
				status: 'loaded',
				publicKey: action.publicKey

			}
		case CLEAR_ACCOUNT:
			return { status: 'unloaded' }
		default:
			return state
	}
}

export default accountState