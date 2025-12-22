import inquirer from "inquirer";
import inquirerAutocomplete from "inquirer-autocomplete-prompt";
import fs from "fs";
import { evmPrompt } from "../prompts/evm.prompt";
import { xrpPrompt } from "../prompts/xrp.prompt";

const rpcURLList = fs.readFileSync("./RPClist.json", "utf-8");
const rpcURLs = JSON.parse(rpcURLList);

inquirer.registerPrompt("autocomplete", inquirerAutocomplete);

export async function getPrompt() {
	const { blockchain } = await inquirer.prompt({
		type: "list",
		name: "blockchain",
		message: "Select Blockchain:",
		choices: ["XRP", "EVM"],
	});

	switch (blockchain) {
		case "EVM":
			await evmPrompt();
			break;

		case "XRP":
			await xrpPrompt();
			break;
	}


}
