var server = new window.StellarSdk.Server('https://horizon-testnet.stellar.org');
window.StellarSdk.Network.useTestNetwork();

export default server
export const StellarSdk = window.StellarSdk