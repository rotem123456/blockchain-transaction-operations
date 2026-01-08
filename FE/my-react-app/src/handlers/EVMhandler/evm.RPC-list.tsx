// evm.RPC-list.tsx
import { useState, useEffect } from 'react';
import { OperationList } from './evm.operation-list';
interface RPCListProps {
    chainName: string;
    onSelectRPC?: (rpc: string) => void;
}

export function RPCList({ chainName, onSelectRPC }: RPCListProps) {
    const [rpcUrls, setRpcUrls] = useState<string[]>([]);
    const [selectedRPC, setSelectedRPC] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRPCs = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/evm/rpc-urls', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (data.success && data.data?.rpcUrls) {
                    let rpcData = data.data.rpcUrls;
                    if (typeof rpcData === 'string') {
                        rpcData = JSON.parse(rpcData);
                    }

                    // Find the chain and get its RPCs
                    const chain = rpcData.find((item: any) => item.name === chainName);
                    const rpcs = chain?.rpc?.map((item: any) => item.url) || [];
                    setRpcUrls(rpcs);
                }
            } catch (error) {
                console.error("Error fetching RPC URLs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRPCs();
    }, [chainName]);

    const handleRPCChange = (url: string) => {
        setSelectedRPC(url);
        if (onSelectRPC) {
            onSelectRPC(url);
        }
    };

    if (loading) return <div>Loading RPCs...</div>;

    if (rpcUrls.length === 0) return <div>No RPCs found for {chainName}</div>;

    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Select RPC for {chainName}</h3>
            <select
                value={selectedRPC}
                onChange={(e) => handleRPCChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '14px',
                    border: '2px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    outline: 'none'
                }}
            >
                <option value="">Choose an RPC endpoint ({rpcUrls.length} available)...</option>
                {rpcUrls.map((url, index) => (
                    <option key={index} value={url}>
                        {url}
                    </option>
                ))}
            </select>

            {selectedRPC && (
                <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#e8f5e9',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50',
                    wordBreak: 'break-all'
                }}>
                    <strong>Selected RPC:</strong><br />
                    {selectedRPC}
                </div>
            )}


        </div>
    );
}