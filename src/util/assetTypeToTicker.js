export default function(balance) {
	if (balance.asset_type === 'native') return 'xlm'
    return balance.asset_code
}