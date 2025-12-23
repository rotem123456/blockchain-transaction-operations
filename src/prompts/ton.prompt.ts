import inquirer from "inquirer";
import { sleep } from "../utils/sleep.utils";
import { TRX_Mainnet_RPC, TRX_Testnet_RPC } from "../const";
import { TONclass } from "../models/TONclass.model";
import { OperationType,TON_RPC } from "../const";
import { chooseOperations } from "../operations/ton.operation";


export async function tonPrompt() {
    const { network } = await inquirer.prompt({
        type: "list",
        name: "network",
        message: "Select TON Network:",
        choices: [TON_RPC.mainnet, TON_RPC.testnet],
    });

    console.log(`Selected TON Network: ${network}`);
    sleep(500);

    let rpcUrl: string = "";

    const { chooseOperation } = await inquirer.prompt({
        type: "list",
        name: "chooseOperation",
        message: "Select Operation:",
        choices: [OperationType.rebroadcastTransaction],
    });

    console.log(`Selected Operation: ${chooseOperation}`);
    sleep(500);
    const TONInstance = new TONclass(network, rpcUrl);

    chooseOperations(chooseOperation, TONInstance);
}
