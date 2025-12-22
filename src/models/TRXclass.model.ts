import { rebroadcastTransaction } from "../rpc/trx.rpc";

export class TRXclass {
    chainName: string;
    rpc: string;
    constructor(chainName: string, rpc: string) {
        this.chainName = chainName;
        this.rpc = rpc;
    }
    async rebroadcastTransaction(txHex: string) {
        return await rebroadcastTransaction(this.rpc, txHex);
    }

    //add more functionality as needed
}