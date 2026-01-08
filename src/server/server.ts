// src/server.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { EVMrouter } from './routes/evm.routes.js';
import { XRProuter } from './routes/xrp.routes.js';
import { TONrouter } from './routes/ton.routes.js';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));



app.use('/evm', EVMrouter);
app.use('/xrp', XRProuter);
app.use('/ton', TONrouter);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
    console.log(`🔗 API endpoints at http://localhost:${PORT}/api/evm`)
});

export default app;