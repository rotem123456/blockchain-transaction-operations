import inquirer from "inquirer";
import inquirerAutocomplete from "inquirer-autocomplete-prompt";
import fs from "fs";
import fuzzy from "fuzzy";
import { Rebroadcaster } from "../models/class.models";
import { chooseOperation } from "./operation.utils";

const rpcURLList = fs.readFileSync("./RPClist.json", "utf-8");
const rpcURLs = JSON.parse(rpcURLList);

inquirer.registerPrompt("autocomplete", inquirerAutocomplete);

export async function getPrompt() {
	//Get chain
	const { chainName } = await inquirer.prompt({
		type: "autocomplete",
		pageSize: 40,
		name: "chainName",
		message: "Select RPC URL from the list:",
		source: (answers: any, input: string) => {
			input = input || "";
			return new Promise((resolve) => {
				const fuzzyResult = fuzzy.filter(
					input,
					rpcURLs.map((rpc: any) => rpc.name)
				);
				resolve(fuzzyResult.map((el) => el.string));
			});
		},
	} as any);
	console.log(chainName);

	const { rpc } = rpcURLs.find((item: any) => item.name === chainName);

	const rpcs = rpc.map((item: any) => item.url);

	//Get RPC
	const rpcUrltoChoose = await inquirer.prompt({
		type: "list",
		name: "rpcUrltoChoose",
		message: "Select RPC URL:",
		choices: rpcs,
	});

	const rpcURL = rpcUrltoChoose.rpcUrltoChoose;
	console.log(rpcURL);
	const rpcOBJ = new Rebroadcaster(chainName, rpcURL);

	const { Operation } = await inquirer.prompt({
		type: "list",
		name: "Operation",
		message: "Choose Operation:",
		choices: [
			"Rebroadcast",
			"Get Transaction",
			"Get Nonce",
			"GET URLS",
			"CSV test",
		],
	});

	chooseOperation(Operation, rpcOBJ);
}

//02f87383aa36a780843b9aca00843b9aca1082520894df3fae8a29fd75dd5749557326102641171dbc718609184e72a00080c080a0bfe8bd222d35a210a635fdea870d8a6eeb2f00e8c1056bfa9d2d480b635860b6a06b691b9afdc7ee4460cf7b49525241eb921a6b4700b49a10f1fde84027f56206
