import { xrpService } from "../../services/xrp.service";

export async function XRPoperationhandler(operation:string,selectedRPC:string,inputValue:string)
{
    let response;
    switch (operation) {
                        case 'rebroadcastTransaction':
                            response = await xrpService.rebroadcastTransaction(
                                selectedRPC,
                                inputValue
                            );
                            return response
                            break;
                        case 'getTransaction':
                            response = await xrpService.getTransaction(
                                selectedRPC,
                                inputValue
                            );
                            return response
                            break;
                        default:
                            throw new Error('Operation not implemented');
                    }

}

