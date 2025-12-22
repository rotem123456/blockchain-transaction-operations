import inquirer from "inquirer";
import {EVMclass } from "../models/EVMclass.models";

export async function chooseOperation(
	Operation: string,
	rpcOBJ: EVMclass
) {
	switch (Operation) {
		case "Rebroadcast":
			const { txHex } = await inquirer.prompt({
				type: "input",
				name: "txHex",
				message: "Enter Transaction Hex:",
			});
			try {
				const result = await rpcOBJ.rebroadcastTransaction(txHex);
				console.log("Rebroadcast Result:", result);
			} catch (error) {
				console.error("Error during rebroadcast:", error);
			}
			break;

		case "Get Transaction":
			const { txHash } = await inquirer.prompt({
				type: "input",
				name: "txHash",
				message: "Enter Transaction Hash:",
			});

			try {
				const result = await rpcOBJ.getTransaction(txHash);
				console.log("Transaction Result:", result);
			} catch (error) {
				console.error("Error during transaction retrieval:", error);
			}
			break;

		case "Get Nonce":
			const { address } = await inquirer.prompt({
				type: "input",
				name: "address",
				message: "Enter Address:",
			});

			try {
				const result = await rpcOBJ.getNonce(address);
				console.log("Nonce for", address, " is  :", result);
			} catch (error) {
				console.error("Error during nonce retrieval:", error);
			}
			break;

		case "CSV test":
			const { csvPath } = await inquirer.prompt({
				type: "input",
				name: "csvPath",
				message: "Enter PATH:",
			});
			const { writeToCSV } = await inquirer.prompt({
				type: "list",
				name: "writeToCSV",
				message: "WriteTo CSV?:",
				choices: ["Yes", "No"],
			});
			try {
				const result = await rpcOBJ.getBatchTransactionFromCSV(
					csvPath,
					writeToCSV
				);
				console.log("CSV Transaction Result:", result);
			} catch (error) {
				console.error("Error during CSV transaction retrieval:", error);
			}

        case "Get Mempool content (NOT SUPPORTED FOR ALL CHAINS)":
            try {
                const result = await rpcOBJ.getMempool();
                console.log("Mempool Content:", result);
            } catch (error) {
                console.error("Error during mempool retrieval:", error);
            }
            break;

		default:
			break;
	}
}


