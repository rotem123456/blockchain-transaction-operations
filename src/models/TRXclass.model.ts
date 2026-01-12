import { rebroadcastTransaction,getTransaction } from "../rpc/trx.rpc";

export class TRXclass {

    rpc: string;
    constructor(rpc: string) {

        this.rpc = rpc;
    }
    async rebroadcastTransaction(txHex: string) {
        return await rebroadcastTransaction(this.rpc, txHex);
    }

    async getTransaction(txHash: string) {
        return await getTransaction(this.rpc, txHash);
    }
}