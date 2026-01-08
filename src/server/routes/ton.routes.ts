import { Router, Request, Response, NextFunction } from 'express';
import { TONclass} from '../../models/TONclass.model.js';


const TONrouter = Router();

TONrouter.post('/rebroadcast', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rpcURL, txHex } = req.body;

        if (!rpcURL || !txHex) {
            console.log("ERROR")
        }

        const xrpInstance = new TONclass(rpcURL);
        const result = await xrpInstance.rebroadcastTransaction(txHex);

        res.status(200).json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});

export { TONrouter };