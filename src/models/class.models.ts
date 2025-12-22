import axios from "axios";
import inquirer from "inquirer";
import {
	rebroadcastTransaction,
	getTransaction,
	getNonce,
	getBatchTransactionFromCSV,
	getMempoolContent
} from "../operations";
import inquirerAutocomplete from "inquirer-autocomplete-prompt";
import fs from "fs";
import fuzzy from "fuzzy";

export class Rebroadcaster {
	chainName: string;
	rpc: string;
	constructor(chainName: string, rpc: string) {
		this.chainName = chainName;
		this.rpc = rpc;
	}
	async rebroadcastTransaction(txHex: string) {
		return await rebroadcastTransaction(this.rpc, txHex);
	}
	async getTransaction(txHash: string) {
		return await getTransaction(this.rpc, txHash);
	}
	async getNonce(address: string) {
		return await getNonce(this.rpc, address);
	}
	async getBatchTransactionFromCSV(csvPath: string, writetoCSV: string) {
		return await getBatchTransactionFromCSV(this.rpc, csvPath, writetoCSV);
	}

	async getMempool()
	{
		return await getMempoolContent(this.rpc);
	}


}