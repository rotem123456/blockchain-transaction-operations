import { rebroadcastTransaction } from "../rpc/ton.rpc";

export class TONclass {
	network: string;

	constructor(network: string, rpcURL: string) {
		this.network = network;
	}
	async rebroadcastTransaction(txHex: string): Promise<any> {
		return await rebroadcastTransaction(txHex, this.network);
	}
}
