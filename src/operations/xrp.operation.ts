import inquirer from "inquirer";
import { XRPclass } from "../models/XRPclass.models";
import { OperationType } from "../const";

export async function chooseOperations(Operation: string, rpcOBJ: XRPclass) {
	switch (Operation) {
		case OperationType.rebroadcastTransaction:
			const { txHex } = await inquirer.prompt({
				type: "input",
				name: "txHex",
				message: "Enter Transaction Hex:",
			});
			const result = await rpcOBJ.rebroadcastTransaction(txHex);
			console.log("Rebroadcast Result:", result);
			break;

		default:
			break;
	}
}
