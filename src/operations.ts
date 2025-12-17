import axios from "axios";
import https from "https";
import fs, { write } from "fs";
import { parseCsv } from "./utils/parseCsv.utils";
import { getPrompt } from "./utils/prompt.utils";
import { loopHashes } from "./utils/loophashes.utils";

export async function rebroadcastTransaction(
	rpcURL: string,
	txHex: string
): Promise<any> {
	try {
		const formattedHex: string = txHex.startsWith("0x") ? txHex : `0x${txHex}`;
		console.log(formattedHex);

		const response: any = await axios.post(
			rpcURL,
			{
				jsonrpc: "2.0",
				method: "eth_sendRawTransaction",
				params: [formattedHex],
				id: 1,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
				httpsAgent: new https.Agent({
					rejectUnauthorized: false,
				}),
			} as any
		);
		if (response.data.error.code === -32603) {
			console.log("TRY AND USE A DIFFERENT RPC URL");

			getPrompt();
		}
	} catch (error: any) {
		if (error.response) {
			return error.response.data;
		}
		throw new Error(`Error during rebroadcast: ${error.message}`);
	}
}

export async function getTransaction(
	rpcURL: string,
	txHash: string
): Promise<any> {
	try {
		const response = await axios.post(
			rpcURL,
			{
				jsonrpc: "2.0",
				method: "eth_getTransactionReceipt",
				params: [txHash],
				id: 1,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
				httpsAgent: new https.Agent({
					rejectUnauthorized: false,
				}),
			} as any
		);
		return response.data;
	} catch (error) {
		throw new Error(`Error during transaction retrieval: ${error}`);
	}
}

export async function getRPCurls(): Promise<any> {
	try {
		const outputPath = "./RPClist.json";
		const response = await axios.get("https://chainlist.org/rpcs.json", {
			httpsAgent: new https.Agent({
				rejectUnauthorized: false,
			}),
		} as any);
		fs.writeFileSync(outputPath, JSON.stringify(response.data, null, 2));
	} catch (error: any) {
		console.error("Error details:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw new Error(`Error fetching RPC URLs: ${error.message}`);
	}
}

export async function getNonce(
	rpcURL: string,
	address: string
): Promise<number> {
	const response: any = await axios.post(
		rpcURL,
		{
			jsonrpc: "2.0",
			method: "eth_getTransactionCount",
			params: [address, "latest"],
			id: 1,
		},
		{
			headers: {
				"Content-Type": "application/json",
			},
			httpsAgent: new https.Agent({
				rejectUnauthorized: false,
			}),
		} as any
	);
	return parseInt(response.data.result, 16);
}

export async function getBatchTransactionFromCSV(
	rpc: string,
	csvpath: string,
	writetoCSV: string
) {
	const hashes: string[] = parseCsv(csvpath);
	loopHashes(hashes, rpc, writetoCSV);
}
