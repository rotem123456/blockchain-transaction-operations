import { evmService } from "../../services/evm.service";

export async function EVMoperationhandler(operation:string,selectedRPC:string,inputValue:string)
{
    let response;
    switch (operation) {
                        case 'rebroadcastTransaction':
                            response = await evmService.rebroadcastTransaction(
                                selectedRPC,
                                inputValue
                            );
                            return response
                            break;
                        case 'getTransaction':
                            response = await evmService.getTransaction(
                                selectedRPC,
                                inputValue
                            );
                            return response
                            break;
                        case 'getNonce':
                            response = await evmService.getNonce(
                                selectedRPC,
                                inputValue
                            );
                            return response
                            break;
                        default:
                            throw new Error('Operation not implemented');
                    }

}

