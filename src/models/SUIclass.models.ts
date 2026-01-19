import { rebroadcastTransaction } from "../rpc/sui.rpc";

export class SUIclass {
    rpc:string
    constructor(rpc:string) {
        this.rpc = rpc;
    }

    async rebroadcastTransaction(txHex:string, sig:string) {
        return await rebroadcastTransaction(this.rpc, txHex, sig);
    }
}