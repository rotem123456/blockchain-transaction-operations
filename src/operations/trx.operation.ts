import inquirer from "inquirer";
import { TRXclass } from "../models/TRXclass.model";
import {OperationType } from "../const";

export async function chooseOperations(
    Operation: string,
    rpcOBJ: TRXclass
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


