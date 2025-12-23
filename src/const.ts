/* XRP rpcs */
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
	"https://xahau-test.net/",
];

/* TRX rpcs */

export const TRX_Mainnet_RPC = ["https://api.trongrid.io"];

export const TRX_Testnet_RPC = ["https://api.shasta.trongrid.io"];

/* TON rpcs */

export enum TON_RPC {
	mainnet = "https://toncenter.com",
	testnet = "https://testnet.toncenter.com",
}



export enum OperationType {
	rebroadcastTransaction = "Rebroadcast",
	getTransaction = "Get Transaction",
	getNonce = "Get Nonce",
	getBatchTransactionFromCSV = "Get Transaction from CSV",
	getMempool = "Get Mempool content (NOT SUPPORTED FOR ALL CHAINS)",
}

/* TON Error codes according to https://docs.ton.org/tvm/exit-codes */

export enum TONExitCode {
	SUCCESS = 0,
	ALTERNATIVE_SUCCESS = 1,
	STACK_UNDERFLOW = 2,
	STACK_OVERFLOW = 3,
	INTEGER_OVERFLOW = 4,
	RANGE_CHECK_ERROR = 5,
	INVALID_OPCODE = 6,
	TYPE_CHECK_ERROR = 7,
	CELL_OVERFLOW = 8,
	CELL_UNDERFLOW = 9,
	DICTIONARY_ERROR = 10,
	UNKNOWN_ERROR = 11,
	FATAL_ERROR = 12,
	OUT_OF_GAS = 13,
	OUT_OF_GAS_NEG = -14,
	VM_VIRTUALIZATION_ERROR = 14,
	INVALID_ACTION_LIST = 32,
	ACTION_LIST_TOO_LONG = 33,
	INVALID_ACTION = 34,
	INVALID_SOURCE_ADDRESS = 35,
	INVALID_DESTINATION_ADDRESS = 36,
	NOT_ENOUGH_TON = 37,
	NOT_ENOUGH_EXTRA_CURRENCIES = 38,
	OUTBOUND_MESSAGE_TOO_LARGE = 39,
	CANNOT_PROCESS_MESSAGE = 40,
	LIBRARY_REFERENCE_NULL = 41,
	LIBRARY_CHANGE_ERROR = 42,
	LIBRARY_EXCEEDED_LIMITS = 43,
	ACCOUNT_STATE_SIZE_EXCEEDED = 50,
}

export enum TONPhase {
	COMPUTE = "Compute phase",
	ACTION = "Action phase",
	COMPUTE_AND_ACTION = "Compute and action phases",
}

export interface TONExitCodeInfo {
	code: number;
	phase: TONPhase;
	description: string;
}

export const TON_EXIT_CODE_MAP: Record<number, TONExitCodeInfo> = {
	0: {
		code: 0,
		phase: TONPhase.COMPUTE_AND_ACTION,
		description: "Standard successful execution exit code.",
	},
	1: {
		code: 1,
		phase: TONPhase.COMPUTE,
		description:
			"Alternative successful execution exit code. Reserved, but does not occur.",
	},
	2: {
		code: 2,
		phase: TONPhase.COMPUTE,
		description: "Stack underflow.",
	},
	3: {
		code: 3,
		phase: TONPhase.COMPUTE,
		description: "Stack overflow.",
	},
	4: {
		code: 4,
		phase: TONPhase.COMPUTE,
		description: "Integer overflow.",
	},
	5: {
		code: 5,
		phase: TONPhase.COMPUTE,
		description: "Range check error — an integer is out of its expected range.",
	},
	6: {
		code: 6,
		phase: TONPhase.COMPUTE,
		description: "Invalid TVM opcode.",
	},
	7: {
		code: 7,
		phase: TONPhase.COMPUTE,
		description: "Type check error.",
	},
	8: {
		code: 8,
		phase: TONPhase.COMPUTE,
		description: "Cell overflow.",
	},
	9: {
		code: 9,
		phase: TONPhase.COMPUTE,
		description: "Cell underflow.",
	},
	10: {
		code: 10,
		phase: TONPhase.COMPUTE,
		description: "Dictionary error.",
	},
	11: {
		code: 11,
		phase: TONPhase.COMPUTE,
		description: "Unknown error, may be thrown by user programs.",
	},
	12: {
		code: 12,
		phase: TONPhase.COMPUTE,
		description: "Fatal error. Thrown by TVM in situations deemed impossible.",
	},
	13: {
		code: 13,
		phase: TONPhase.COMPUTE,
		description: "Out of gas error.",
	},
	[-14]: {
		code: -14,
		phase: TONPhase.COMPUTE,
		description: "Same as 13. Negative, so that it cannot be faked.",
	},
	14: {
		code: 14,
		phase: TONPhase.COMPUTE,
		description: "VM virtualization error. Reserved, but never thrown.",
	},
	32: {
		code: 32,
		phase: TONPhase.ACTION,
		description: "Action list is invalid.",
	},
	33: {
		code: 33,
		phase: TONPhase.ACTION,
		description: "Action list is too long.",
	},
	34: {
		code: 34,
		phase: TONPhase.ACTION,
		description: "Action is invalid or not supported.",
	},
	35: {
		code: 35,
		phase: TONPhase.ACTION,
		description: "Invalid source address in outbound message.",
	},
	36: {
		code: 36,
		phase: TONPhase.ACTION,
		description: "Invalid destination address in outbound message.",
	},
	37: {
		code: 37,
		phase: TONPhase.ACTION,
		description: "Not enough Toncoin.",
	},
	38: {
		code: 38,
		phase: TONPhase.ACTION,
		description: "Not enough extra currencies.",
	},
	39: {
		code: 39,
		phase: TONPhase.ACTION,
		description: "Outbound message does not fit into a cell after rewriting.",
	},
	40: {
		code: 40,
		phase: TONPhase.ACTION,
		description:
			"Cannot process a message — not enough funds, the message is too large, or its Merkle depth is too big.",
	},
	41: {
		code: 41,
		phase: TONPhase.ACTION,
		description: "Library reference is null during library change action.",
	},
	42: {
		code: 42,
		phase: TONPhase.ACTION,
		description: "Library change action error.",
	},
	43: {
		code: 43,
		phase: TONPhase.ACTION,
		description:
			"Exceeded the maximum number of cells in the library or the maximum depth of the Merkle tree.",
	},
	50: {
		code: 50,
		phase: TONPhase.ACTION,
		description: "Account state size exceeded limits.",
	},
};
