import inquirer from "inquirer";
import fs from "fs";
import fuzzy from "fuzzy";
const rpcURLList = fs.readFileSync("./RPClist.json", "utf-8");
const rpcURLs = JSON.parse(rpcURLList);
import { chooseOperations } from "../operations/xrp.operation";
import { sleep } from "../utils/sleep.utils";
import { XRP_Mainnet_RPC, XRP_Testnet_RPC } from "../const";
import { XRPclass } from "../models/XRPclass.models";
import { OperationType } from "../const";


export async function xrpPrompt() {
	const { network } = await inquirer.prompt({
		type: "list",
		name: "network",
		message: "Select XRP Network:",
		choices: ["Mainnet", "Testnet"],
	});

	console.log(`Selected XRP Network: ${network}`);
	sleep(500);

	let rpcUrl: string = "";

	switch (network) {
		case "Mainnet":
			const { rpcURL_Mainnet } = await inquirer.prompt({
				type: "list",
				name: "rpcURL_Mainnet",
				message: "Select RPC URL:",
				choices: XRP_Mainnet_RPC,
			});
			rpcUrl = rpcURL_Mainnet;
			break;

		case "Testnet":
			const { rpcURL_Testnet } = await inquirer.prompt({
				type: "list",
				name: "rpcURL_Testnet",
				message: "Select RPC URL:",
				choices: XRP_Testnet_RPC,
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
    const xrpInstance = new XRPclass(network, rpcUrl);

	chooseOperations(chooseOperation, xrpInstance);
}
