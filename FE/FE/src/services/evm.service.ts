import axios from 'axios';

const BASE_URL = 'http://localhost:3000/evm';

export const evmService = {
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

    getNonce: async (
        rpcURL: string,
        address: string
    ) => {
        try {
            const response = await axios.post(`${BASE_URL}/nonce`, {
                rpcURL,
                address
            });
            return response.data;
        } catch (error: any) {
            console.error('Error getting nonce:', error);
            throw new Error(
                error.response?.data?.error?.message ||
                'Failed to get nonce'
            );
        }
    }
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