import { Router, Request, Response, NextFunction } from 'express';
import { TRXclass } from '../../models/TRXclass.model';
import { XRProuter } from './xrp.routes';


const TRXrouter = Router();

TRXrouter.post('/rebroadcast', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rpcURL, txHex } = req.body;

        if (!rpcURL || !txHex) {
            console.log("ERROR")
        }

        const trxInstance = new TRXclass(rpcURL);
        const result = await trxInstance.rebroadcastTransaction(txHex);

        res.status(200).json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});


TRXrouter.post('/transaction', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rpcURL, txHash } = req.body;

        if (!rpcURL || !txHash) {
            console.log("ERROR")
        }

        const trxInstance = new TRXclass(rpcURL);
        const result = await trxInstance.getTransaction(txHash);

        res.status(200).json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});

export { TRXrouter };