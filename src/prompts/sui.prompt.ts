import inquirer from "inquirer";
import fs from "fs";
import fuzzy from "fuzzy";
const rpcURLList = fs.readFileSync("./RPClist.json", "utf-8");
const rpcURLs = JSON.parse(rpcURLList);
import { chooseOperations } from "../operations/sui.operation";
import { sleep } from "../utils/sleep.utils";
import { SUIclass } from "../models/SUIclass.models";
import { OperationType } from "../const";


export async function suiPrompt() {
    const { network } = await inquirer.prompt({
        type: "list",
        name: "network",
        message: "Select SUI Network:",
        choices: ["Mainnet", "Testnet"],
    });

    console.log(`Selected SUI Network: ${network}`);
    sleep(500);

    let rpcUrl: string = "";

    switch (network) {
        case "Mainnet":
            const { rpcURL_Mainnet } = await inquirer.prompt({
                type: "list",
                name: "rpcURL_Mainnet",
                message: "Select RPC URL:",
                choices: ["https://fullnode.mainnet.sui.io:443"]
            });
            rpcUrl = rpcURL_Mainnet;
            break;

        case "Testnet":
            const { rpcURL_Testnet } = await inquirer.prompt({
                type: "list",
                name: "rpcURL_Testnet",
                message: "Select RPC URL:",
                choices: ["https://fullnode.testnet.sui.io:443"],
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
    const suiInstance = new SUIclass(rpcUrl);

    chooseOperations(chooseOperation, suiInstance);
}
