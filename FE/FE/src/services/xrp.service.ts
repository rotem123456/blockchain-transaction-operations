import axios from 'axios';

const BASE_URL = 'http://localhost:3000/xrp';

export const xrpService = {
    rebroadcastTransaction: async (
        rpcURL: string,
        txHex: string
    ) => {
        try {
            const response = await axios.post(`${BASE_URL}/rebroadcast`, {
                rpcURL,
                txHex
            });
            return response.data;
        } catch (error: any) {
            console.error('Error rebroadcasting transaction:', error);
            throw new Error(
                error.response?.data?.error?.message ||
                'Failed to send transaction to BE'
            );
        }
    },

    getTransaction: async (
        rpcURL: string,
        txHash: string
    ) => {
        try {
            const response = await axios.post(`${BASE_URL}/transaction`, {
                rpcURL,
                txHash
            });
            return response.data;
        } catch (error: any) {
            console.error('Error getting transaction:', error);
            throw new Error(
                error.response?.data?.error?.message ||
                'Failed to get transaction'
            );
        }
    },

};

export function sendOperationToBE(rpc:string,operation:string,input:string)
{
    switch (operation) {
        case "rebroadcastTransaction":
            console.log("HERE",rpc,input)
            break;

        default:
            break;
    }
}