import axios from "axios";
import https from "https";
import fs, { write } from "fs";
import { parseCsv } from "../utils/parseCsv.utils";
import { loopHashes } from "../utils/loophashes.utils";
import { sleep } from "../utils/sleep.utils";

interface TransactionRow {
	txId: string;
	txHex: string;
}

interface ResultRow {
	txId: string;
	response: string;
}


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
		return response.data;
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

export async function getMempoolContent(rpcURL: string): Promise<any> {
	try {
		const response = await axios.post(
			rpcURL,
			{
				jsonrpc: "2.0",
				method: "txpool_content",
				params: [],
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
		throw new Error(`Error during mempool retrieval: ${error}`);
	}
}


export async function getRPCurlsAsList(): Promise<any> {
	try {
		const outputPath = "./RPClist.json";
		const response = await axios.get("https://chainlist.org/rpcs.json", {
			httpsAgent: new https.Agent({
				rejectUnauthorized: false,
			}),
		} as any);
		return response.data;
	} catch (error: any) {
		console.error("Error details:", error.message);
		if (error.response) {
			console.error("Response status:", error.response.status);
			console.error("Response data:", error.response.data);
		}
		throw new Error(`Error fetching RPC URLs: ${error.message}`);
	}
}

export async function batchRebroadcastFromCSV(
	rpc: string,
	csvpath: string,
	writetoCSV: string
): Promise<void> {

	const lines = fs.readFileSync(csvpath, "utf-8").trim().split('\n');
	const headers = lines[0].split(',');

	const output = ['txId,response'];

	for (let i = 1; i < lines.length; i++) {
		if (!lines[i].trim()) continue;

		const [txId, txHex] = lines[i].split(',').map(v => v.trim());

		console.log(`Processing ${i}/${lines.length - 1}: ${txId}`);

		try {
			const response = await rebroadcastTransaction(rpc, txHex);
			const responseStr = JSON.stringify(response).replace(/"/g, '""');
			output.push(`${txId},"${responseStr}"`);
			console.log(`  ✓ ${response.result || response.error?.message}`);
		} catch (error: any) {
			const errorStr = JSON.stringify({ error: error.message }).replace(/"/g, '""');
			output.push(`${txId},"${errorStr}"`);
			console.error(`  ✗ ${error.message}`);
		}

		sleep(500)
	}


	fs.writeFileSync(writetoCSV, output.join('\n'));
	console.log(`\nDone! Results written to: ${writetoCSV}`);
}

