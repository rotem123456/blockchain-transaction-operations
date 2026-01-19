import inquirer from "inquirer";
import {EVMclass } from "../models/EVMclass.models";
import {OperationType } from "../const";

export async function chooseOperation(
	Operation: string,
	rpcOBJ: EVMclass
) {
	//rt
	switch (Operation) {
		case OperationType.rebroadcastTransaction:
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

		case OperationType.getTransaction:
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

		case OperationType.getNonce:
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

		case OperationType.getBatchTransactionFromCSV:
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

        case OperationType.getMempool:
            try {
                const result = await rpcOBJ.getMempool();
                console.log("Mempool Content:", result);
            } catch (error) {
                console.error("Error during mempool retrieval:", error);
            }
            break;

		case "BATCH REBROADCAST FROM CSV":
			const { csvPath: rebroadcastCsvPath } = await inquirer.prompt({
				type: "input",
				name: "csvPath",
				message: "Enter CSV Path:",
			});
			try {
				const result = await rpcOBJ.batchRebroadcastFromCSV(rebroadcastCsvPath,"rebroadcast_results.csv");
				console.log("Rebroadcast Batch Result:", result);
			} catch (error) {
				console.error("Error during batch rebroadcast:", error);
			}
			break;
		default:
			break;
	}
}


