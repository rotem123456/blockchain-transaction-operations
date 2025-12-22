import axios from "axios";
import https from "https";

export async function rebroadcastTransaction(
	rpcURL: string,
	txHex: string
): Promise<any> {
	try {
		const response = await axios.post(
			rpcURL,
			{
				method: "submit",
				params: [{ tx_blob: txHex }],
				id: 1,
				jsonrpc: "2.0",
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
