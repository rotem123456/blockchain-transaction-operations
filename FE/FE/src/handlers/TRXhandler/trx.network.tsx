import { useState } from 'react';

interface TRXnetworkListProps {
    onSelectNetwork?: (network: string) => void;
}

export function TRXnetworkList({ onSelectNetwork }: TRXnetworkListProps) {
    const [selectedNetwork, setSelectedNetwork] = useState<string>('');

    const handleNetworkSelect = (network: string) => {
        setSelectedNetwork(network);
        if (onSelectNetwork) {
            onSelectNetwork(network);
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Select XRP Network</h3>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button
                    onClick={() => handleNetworkSelect('mainnet')}
                    style={{
                        flex: 1,
                        padding: '15px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        backgroundColor: selectedNetwork === 'mainnet' ? '#4CAF50' : '#f0f0f0',
                        color: selectedNetwork === 'mainnet' ? 'white' : '#333',
                        border: selectedNetwork === 'mainnet' ? '3px solid #4CAF50' : '2px solid #ccc',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    Mainnet
                </button>

                <button
                    onClick={() => handleNetworkSelect('testnet')}
                    style={{
                        flex: 1,
                        padding: '15px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        backgroundColor: selectedNetwork === 'testnet' ? '#4CAF50' : '#f0f0f0',
                        color: selectedNetwork === 'testnet' ? 'white' : '#333',
                        border: selectedNetwork === 'testnet' ? '3px solid #4CAF50' : '2px solid #ccc',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    Testnet
                </button>
            </div>

            {selectedNetwork && (
                <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#e8f5e9',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50'
                }}>
                    <strong>Selected Network:</strong> {selectedNetwork.toUpperCase()}
                </div>
            )}
        </div>
    );
}