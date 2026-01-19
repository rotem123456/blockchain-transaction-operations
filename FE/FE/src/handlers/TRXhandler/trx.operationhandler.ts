import { trxService } from "../../services/trx.service";

export async function TRXoperationhandler(operation:string,selectedRPC:string,inputValue:string)
{
    let response;
    switch (operation) {
                        case 'rebroadcastTransaction':
                            response = await trxService.rebroadcastTransaction(
                                selectedRPC,
                                inputValue
                            );
                            return response
                            break;
                        case 'getTransaction':
                            response = await trxService.getTransaction(
                                selectedRPC,
                                inputValue
                            );
                            return response
                            break;
                        default:
                            throw new Error('Operation not implemented');
                    }

}

