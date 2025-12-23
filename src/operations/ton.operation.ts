import inquirer from "inquirer";
import { TONclass } from "../models/TONclass.model";
import {OperationType } from "../const";

export async function chooseOperations(
    Operation: string,
    rpcOBJ: TONclass
) {
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

        default:
            break;
    }
}


