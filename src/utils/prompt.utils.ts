import inquirer from "inquirer";
import inquirerAutocomplete from "inquirer-autocomplete-prompt";
import fs from "fs";
import { evmPrompt } from "../prompts/evm.prompt";
import { xrpPrompt } from "../prompts/xrp.prompt";
import { trxPrompt } from "../prompts/trx.prompt";
import { tonPrompt } from "../prompts/ton.prompt";
import { suiPrompt } from "../prompts/sui.prompt";

const rpcURLList = fs.readFileSync("./RPClist.json", "utf-8");
const rpcURLs = JSON.parse(rpcURLList);

inquirer.registerPrompt("autocomplete", inquirerAutocomplete);

export async function getPrompt() {
	const { blockchain } = await inquirer.prompt({
		type: "list",
		name: "blockchain",
		message: "Select Blockchain:",
		choices: ["XRP", "EVM","TRX","TON","SUI"],
	});

	switch (blockchain) {
		case "EVM":
			await evmPrompt();
			break;

		case "XRP":
			await xrpPrompt();
			break;

		case "TRX":
           await trxPrompt();
			break;

		case "TON":
			await tonPrompt();
			break;

		case "SUI":
			await suiPrompt();
			break;
		}






}
