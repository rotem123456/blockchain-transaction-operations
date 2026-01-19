import axios from "axios";
import https from "https";

export async function rebroadcastTransaction(
	rpcURL: string,
	txHex: string,
	sig: string
): Promise<any> {
	try {
		const response = await axios.post(
			rpcURL,
			{
				jsonrpc: "2.0",
				id: 1,
				method: "sui_executeTransactionBlock",
				params: [
					txHex,
					[sig],
					{
						showEffects: true,
						showEvents: true,
						showInput: false,
						showRawInput: false,
						showObjectChanges: false,
						showBalanceChanges: false
					},
					"WaitForLocalExecution"
				],
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
		console.error("Error rebroadcasting transaction:", error);
		throw error;
	}
}
