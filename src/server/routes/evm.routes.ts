// src/routes/evm.routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { EVMclass } from '../../models/EVMclass.models.js';

const EVMrouter = Router();

EVMrouter.post('/rebroadcast', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chainName, rpcURL, txHex } = req.body;

        if (!chainName || !rpcURL || !txHex) {
            console.log("ERROR")
        }

        const evmInstance = new EVMclass(chainName, rpcURL);
        const result = await evmInstance.rebroadcastTransaction(txHex);

        res.status(200).json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});

EVMrouter.post('/transaction', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chainName, rpcURL, txHash } = req.body;

        if (!rpcURL || !txHash) {
            console.log("ERROR")
        }

        const evmInstance = new EVMclass(chainName, rpcURL);
        const result = await evmInstance.getTransaction(txHash);

        res.status(200).json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});

EVMrouter.post('/nonce', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chainName, rpcURL, address } = req.body;

        if (!rpcURL || !address) {
            console.log("ERROR")
        }

        const evmInstance = new EVMclass(chainName, rpcURL);
        const nonce = await evmInstance.getNonce(address);

        res.status(200).json({
            success: true,
            data: { address, nonce },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});

EVMrouter.post('/mempool', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chainName, rpcURL } = req.body;

        if (!rpcURL) {
            console.log("ERROR")
        }

        const evmInstance = new EVMclass(chainName, rpcURL);
        const mempool = await evmInstance.getMempool();

        res.status(200).json({
            success: true,
            data: mempool,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});

EVMrouter.get('/rpc-urls', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const evmInstance = new EVMclass('', '');

        res.status(200).json({
            success: true,
            data: { rpcUrls: await evmInstance.getRPCurls() },
            message: 'RPC URLs fetched and saved successfully',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        next(error);
    }
});


export { EVMrouter };