import inquirer from "inquirer";
import fs from "fs";
import { EVMclass } from "../models/EVMclass.models"
import fuzzy from "fuzzy";
const rpcURLList = fs.readFileSync("./RPClist.json", "utf-8");
const rpcURLs = JSON.parse(rpcURLList);
import { chooseOperation } from "../operations/evm.operation";
import { OperationType } from "../const";


export async function evmPrompt(){
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


                const rpcUrltoChoose = await inquirer.prompt({
                    type: "list",
                    name: "rpcUrltoChoose",
                    message: "Select RPC URL:",
                    choices: rpcs,
                });

                const rpcURL = rpcUrltoChoose.rpcUrltoChoose;
                console.log(rpcURL);
                const rpcOBJ = new EVMclass(chainName, rpcURL);

                const { Operation } = await inquirer.prompt({
                    type: "list" /*  */,
                    name: "Operation",
                    message: "Choose Operation:",
                    choices: [
                        OperationType.rebroadcastTransaction,
                        OperationType.getTransaction,
                        OperationType.getNonce,
                        OperationType.getBatchTransactionFromCSV,
                        OperationType.getMempool,
                        "BATCH REBROADCAST FROM CSV",
                    ],
                });

                chooseOperation(Operation, rpcOBJ);
}