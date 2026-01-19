// App.jsx
import { useState } from 'react';
import { ChainNameList } from './handlers/EVMhandler/evm.ChainName-list';
import { RPCList } from './handlers/EVMhandler/evm.RPC-list';
import { OperationList } from './handlers/EVMhandler/evm.operation-list';

import { EVMoperationhandler } from './handlers/EVMhandler/evm.operationhandler';

import { XRPnetworkList } from './handlers/XRPhandler/xrp.network';
import { XRPRPCList } from './handlers/XRPhandler/xrp.RPC-list';
import { XRPOperationList } from './handlers/XRPhandler/xrp.operation-list';
import { XRPoperationhandler } from './handlers/XRPhandler/xrp.operationhandler';

import { TRXnetworkList } from './handlers/TRXhandler/trx.network';
import { TRXRPCList } from './handlers/TRXhandler/trx-RPC-list';
import { TRXOperationList } from './handlers/TRXhandler/trx.operation-list';
import { TRXoperationhandler } from './handlers/TRXhandler/trx.operationhandler';

function App() {

    const [chainType, setChainType] = useState(''); // 'EVM', 'XRP', 'TON'


    const [selectedChain, setSelectedChain] = useState('');
    const [selectedRPC, setSelectedRPC] = useState('');
    const [selectedOperation, setSelectedOperation] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const resetState = () => {
        setSelectedChain('');
        setSelectedRPC('');
        setSelectedOperation('');
        setInputValue('');
        setResult(null);
    };

    const handleExecute = async () => {
        if (!inputValue.trim()) {
            alert('Please enter a value');
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            let response;
            if(chainType === "EVM")
                {
                    response = await EVMoperationhandler(selectedOperation,selectedRPC,inputValue)
                }

            else if (chainType === 'XRP') {
                    response = await XRPoperationhandler(selectedOperation,selectedRPC,inputValue)
            }

            else if (chainType === 'TRX') {
                response = await TRXoperationhandler(selectedOperation,selectedRPC,inputValue)
            }

            setResult(response);
            alert('Success! Check the result below.');
            console.log('Result:', response);

        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h1>Multi-Chain Transaction Tool</h1>

            {/* Chain Type Selection */}
            <div style={{ marginBottom: '30px' }}>
                <h2>Select Chain Type</h2>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button
                        onClick={() => {
                            setChainType('EVM');
                            resetState();
                        }}
                        style={{
                            flex: 1,
                            padding: '15px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            backgroundColor: chainType === 'EVM' ? '#4CAF50' : '#f0f0f0',
                            color: chainType === 'EVM' ? 'white' : '#333',
                            border: chainType === 'EVM' ? '3px solid #4CAF50' : '2px solid #ccc',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        EVM Chains
                    </button>

                    <button
                        onClick={() => {
                            setChainType('XRP');
                            resetState();
                        }}
                        style={{
                            flex: 1,
                            padding: '15px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            backgroundColor: chainType === 'XRP' ? '#4CAF50' : '#f0f0f0',
                            color: chainType === 'XRP' ? 'white' : '#333',
                            border: chainType === 'XRP' ? '3px solid #4CAF50' : '2px solid #ccc',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        XRP
                    </button>

                    <button
                        onClick={() => {
                            setChainType('TON');
                            resetState();
                        }}
                        style={{
                            flex: 1,
                            padding: '15px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            backgroundColor: chainType === 'TON' ? '#4CAF50' : '#f0f0f0',
                            color: chainType === 'TON' ? 'white' : '#333',
                            border: chainType === 'TON' ? '3px solid #4CAF50' : '2px solid #ccc',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        TON
                    </button>
                    <button
                        onClick={() => {
                            setChainType('TRX');
                            resetState();
                        }}
                        style={{
                            flex: 1,
                            padding: '15px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            backgroundColor: chainType === 'TRX' ? '#4CAF50' : '#f0f0f0',
                            color: chainType === 'TRX' ? 'white' : '#333',
                            border: chainType === 'TRX' ? '3px solid #4CAF50' : '2px solid #ccc',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>
                        TRX
                    </button>
                </div>
            </div>

            {/* EVM Chain Flow */}
            {chainType === 'EVM' && (
                <>
                    <ChainNameList
                        onSelectChain={(chain) => {
                            setSelectedChain(chain);
                            setSelectedRPC('');
                            setSelectedOperation('');
                            setInputValue('');
                        }}
                    />

                    {selectedChain && (
                        <RPCList
                            chainName={selectedChain}
                            onSelectRPC={(rpc) => {
                                setSelectedRPC(rpc);
                                setSelectedOperation('');
                                setInputValue('');
                            }}
                        />
                    )}

                    {selectedChain && selectedRPC && (
                        <OperationList
                            onSelectedOperation={(operation, input) => {
                                setSelectedOperation(operation);
                                setInputValue(input);
                            }}
                        />
                    )}
                </>
            )}

            {/* XRP Chain Flow */}
            {chainType === 'XRP' && (
                <>
                    <XRPnetworkList
                        onSelectNetwork={(network) => {
                            setSelectedChain(network);
                            setSelectedRPC('');
                            setSelectedOperation('');
                            setInputValue('');
                        }}
                    />

                    {selectedChain && (
                    <XRPRPCList
                        network={selectedChain}
                        onSelectRPC={(rpc) => {
                            setSelectedRPC(rpc);
                            setSelectedOperation('');
                            setInputValue('');
                        }}
                    />
                )}

                    {selectedChain && (
                        <XRPOperationList
                            onSelectedOperation={(operation, input) => {
                                setSelectedOperation(operation);
                                setInputValue(input);
                            }}
                        />
                    )}
                </>
            )}

            {/* TON Chain Flow */}
            {chainType === 'TON' && (
                <div style={{
                    padding: '20px',
                    backgroundColor: '#fff3cd',
                    borderRadius: '8px',
                    border: '2px solid #ffc107'
                }}>
                    <p>TON support coming soon...</p>
                </div>
            )}


            {chainType === 'TRX' && (
                <>
                    <TRXnetworkList
                        onSelectNetwork={(network) => {
                            setSelectedChain(network);
                            setSelectedRPC('');
                            setSelectedOperation('');
                            setInputValue('');
                        }}
                    />
                    {selectedChain && (
                        <TRXRPCList
                            network={selectedChain}
                            onSelectRPC={(rpc) => {
                                setSelectedRPC(rpc);
                                setSelectedOperation('');
                                setInputValue('');
                            }}
                        />
                    )}
                    {selectedChain && (
                        <TRXOperationList
                            onSelectedOperation={(operation, input) => {
                                setSelectedOperation(operation);
                                setInputValue(input);
                            }}
                        />
                    )}
                </>
)}

            {/* Execute Button - Shows for all chain types when ready */}
            {chainType && selectedChain && selectedOperation && inputValue && (
                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '8px',
                    border: '2px solid #2196F3'
                }}>
                    <h3>✓ Ready to Execute</h3>
                    <p><strong>Chain Type:</strong> {chainType}</p>
                    <p><strong>Chain/Network:</strong> {selectedChain}</p>
                    {chainType === 'EVM' && <p><strong>RPC:</strong> {selectedRPC}</p>}
                    <p><strong>Operation:</strong> {selectedOperation}</p>
                    <p><strong>Input:</strong> {inputValue.substring(0, 20)}...</p>

                    <button
                        onClick={handleExecute}
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '15px',
                            marginTop: '15px',
                            backgroundColor: loading ? '#ccc' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '18px',
                            fontWeight: 'bold'
                        }}
                    >
                        {loading ? 'Executing...' : 'Execute Operation'}
                    </button>
                </div>
            )}

            {/* Display Result */}
            {result && (
                <div style={{
                    marginTop: '20px',
                    padding: '20px',
                    backgroundColor: '#e8f5e9',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50'
                }}>
                    <h3>✓ Result</h3>
                    <pre style={{
                        backgroundColor: '#f5f5f5',
                        padding: '15px',
                        borderRadius: '4px',
                        overflow: 'auto',
                        maxHeight: '300px',
                        fontSize: '12px'
                    }}>
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default App;
