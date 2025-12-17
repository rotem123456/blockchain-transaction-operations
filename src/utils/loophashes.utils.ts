import { getTransaction } from "../operations";
import { sleep } from "./sleep.utils";
import * as fs from "fs";

export async function loopHashes(
	hashes: string[],
	rpc: string,
	writetoCSV: string
) {
	if (writetoCSV === "Yes") {
		const successfilePath = "./success.csv";
		const failfilePath = "./success.csv";
		const successfileStream = fs.createWriteStream(successfilePath);
		const failedfileStream = fs.createWriteStream(failfilePath);
		successfileStream.write("Hash,Block Number,Status\n");
		failedfileStream.write("Hash,Status\n");
		for (const [index, hash] of hashes.entries()) {
			console.log(`Processing ${index + 1}/${hashes.length}: ${hash}`);
			const tx = await getTransaction(rpc, hash);
			const { result } = tx;
			const blockNumber = result ? parseInt(result.blockNumber, 16) : "Pending";
			const status = result
				? parseInt(result.status, 16) === 1
					? "Success"
					: "Failed"
				: "Pending";
			if (status === "Success") {
				successfileStream.write(`${hash},${blockNumber},${status}\n`);
			} else {
				failedfileStream.write(`${hash},${status}\n`);
			}
			console.log(hash, " Block Number: ", blockNumber, " Status: ", status);
			await sleep(1000);
		}
	} else {
		for (const [index, hash] of hashes.entries()) {
			console.log(`Processing ${index + 1}/${hashes.length}: ${hash}`);
			const tx = await getTransaction(rpc, hash);
			const { result } = tx;
			const blockNumber = result ? parseInt(result.blockNumber, 16) : "Pending";
			const status = result
				? parseInt(result.status, 16) === 1
					? "Success"
					: "Failed"
				: "Pending";
			console.log(hash, " Block Number: ", blockNumber, " Status: ", status);
			await sleep(1000);
		}
	}
}
