import server from '../stellar'

export default function (dispatch, getState) {
	console.log("GLOBAL LISTNER")
	const accountId = 'GB5A3PDSKA5N3LAXAOS3IWSMWRFBEM6ZPGI4XRP3JPUOP4MKAQG4VJJE'
	server.transactions()
    .forAccount(accountId)
	  .cursor('now')
	  .stream({
	    onmessage: function (message) {
	      console.log(message);
	    }
	  })

}