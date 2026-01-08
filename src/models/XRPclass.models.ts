import { rebroadcastTransaction } from "../rpc/xrp.rpc";
export class XRPclass{
    rpc:string
    constructor(rpc:string){
        this.rpc = rpc;
    }
    rebroadcastTransaction = async (txHex: string) => {
        return await rebroadcastTransaction(this.rpc, txHex);
    }

}