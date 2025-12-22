export const XRP_Mainnet_RPC = [
	"https://xrplcluster.com/",
	"https://xrpl.ws/",
	"https://s1.ripple.com:51234/",
	"https://s2.ripple.com:51234/",
];

export const XRP_Testnet_RPC = [
	"https://s.altnet.rippletest.net:51234/",
	"https://clio.altnet.rippletest.net:51234/",
	"https://s.devnet.rippletest.net:51234/",
	"https://clio.devnet.rippletest.net:51234/",
    "https://xahau-test.net/"
];

export const TRX_Mainnet_RPC = [
    "https://api.trongrid.io",
];

export const TRX_Testnet_RPC = [
    "https://api.shasta.trongrid.io",
];



export enum OperationType {
	rebroadcastTransaction = "Rebroadcast",
    getTransaction = "Get Transaction",
    getNonce = "Get Nonce",
    getBatchTransactionFromCSV = "Get Transaction from CSV",
    getMempool = "Get Mempool content (NOT SUPPORTED FOR ALL CHAINS)"
}