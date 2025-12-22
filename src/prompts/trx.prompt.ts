import inquirer from "inquirer";
import { sleep } from "../utils/sleep.utils";
import { TRX_Mainnet_RPC, TRX_Testnet_RPC } from "../const";
import { TRXclass } from "../models/TRXclass.model";
import { OperationType } from "../const";
import { chooseOperations } from "../operations/trx.operation";


export async function trxPrompt() {
    const { network } = await inquirer.prompt({
        type: "list",
        name: "network",
        message: "Select TRX Network:",
        choices: ["Mainnet", "Testnet"],
    });

    console.log(`Selected TRX Network: ${network}`);
    sleep(500);

    let rpcUrl: string = "";

    switch (network) {
        case "Mainnet":
            const { rpcURL_Mainnet } = await inquirer.prompt({
                type: "list",
                name: "rpcURL_Mainnet",
                message: "Select RPC URL:",
                choices: TRX_Mainnet_RPC,
            });
            rpcUrl = rpcURL_Mainnet;
            break;

        case "Testnet":
            const { rpcURL_Testnet } = await inquirer.prompt({
                type: "list",
                name: "rpcURL_Testnet",
                message: "Select RPC URL:",
                choices: TRX_Testnet_RPC,
            });
            rpcUrl = rpcURL_Testnet;
            break;

        default:
            break;
    }
    const { chooseOperation } = await inquirer.prompt({
        type: "list",
        name: "chooseOperation",
        message: "Select Operation:",
        choices: [OperationType.rebroadcastTransaction],
    });

    console.log(`Selected Operation: ${chooseOperation}`);
    sleep(500);
    const TRXInstance = new TRXclass(network, rpcUrl);

    chooseOperations(chooseOperation, TRXInstance);
}
