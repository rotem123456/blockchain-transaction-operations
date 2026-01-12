import { useState, useEffect } from 'react';

export const TRX_Mainnet_RPC = [
    "https://api.trongrid.io/",
];

export const TRX_Testnet_RPC = [
    "https://api.shasta.trongrid.io",
];

interface RPCListProps {
    network: string; // 'mainnet' or 'testnet'
    onSelectRPC?: (rpc: string) => void;
}

export function TRXRPCList({ network, onSelectRPC }: RPCListProps) {
    const [rpcUrls, setRpcUrls] = useState<string[]>([]);
    const [selectedRPC, setSelectedRPC] = useState<string>('');

    useEffect(() => {

        if (network === 'mainnet') {
            setRpcUrls(TRX_Mainnet_RPC);
        } else if (network === 'testnet') {
            setRpcUrls(TRX_Testnet_RPC);
        } else {
            setRpcUrls([]);
        }

        setSelectedRPC('');
    }, [network]);

    const handleRPCChange = (url: string) => {
        setSelectedRPC(url);
        if (onSelectRPC) {
            onSelectRPC(url);
        }
    };

    if (rpcUrls.length === 0) {
        return <div>Please select a network first</div>;
    }

    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Select RPC for {network.toUpperCase()}</h3>
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