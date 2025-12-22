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
			"get Batch Transaction from CSV",
            "Get Mempool content (NOT SUPPORTED FOR ALL CHAINS)"
		],
	});

	chooseOperation(Operation, rpcOBJ);
}

