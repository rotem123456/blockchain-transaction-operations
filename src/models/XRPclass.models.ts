import { rebroadcastTransaction } from "../operations/xrp.operation";
export class XRPclass{
    network:string
    rpc:string
    constructor(network:string, rpc:string){
        this.network = network;
        this.rpc = rpc;
    }
    rebroadcastTransaction = async (txHex: string) => {
        return await rebroadcastTransaction(this.rpc, txHex);
    }

    //todo add more functionality, need to check docs

}