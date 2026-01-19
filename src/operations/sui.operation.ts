import inquirer from "inquirer";
import { SUIclass } from "../models/SUIclass.models";
import { OperationType } from "../const";

export async function chooseOperations(Operation: string, rpcOBJ: SUIclass) {
    switch (Operation) {
        case OperationType.rebroadcastTransaction:
            const { txHex } = await inquirer.prompt({
                type: "input",
                name: "txHex",
                message: "Enter Transaction Hex:",
            });
            const { sig } = await inquirer.prompt({
                type: "input",
                name: "sig",
                message: "Enter Signature:",
            });
            const result = await rpcOBJ.rebroadcastTransaction(txHex,sig);
            console.log("Rebroadcast Result:", result);
            break;

        default:
            break;
    }
}
