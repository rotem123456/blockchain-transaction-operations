// App.jsx
import { useState } from 'react';
import { ChainNameList } from './handlers/EVMhandler/evm.ChainName-list';
import { RPCList } from './handlers/EVMhandler/evm.RPC-list';
import { OperationList } from './handlers/EVMhandler/evm.operation-list';
import { evmService } from './services/evm.service';

function App() {
    const [selectedChain, setSelectedChain] = useState('');
    const [selectedRPC, setSelectedRPC] = useState('');
    const [selectedOperation, setSelectedOperation] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleExecute = async () => {
        if (!inputValue.trim()) {
            alert('Please enter a value');
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            let response;

            switch (selectedOperation) {
                case 'rebroadcastTransaction':

                    response = await evmService.rebroadcastTransaction(
                        selectedRPC,
                        inputValue
                    );
                    break;

                case 'getTransaction':
                    console.log("sending to BE:",selectedOperation,selectedRPC,inputValue)
                    response = await evmService.getTransaction(
                        selectedRPC,
                        inputValue
                    );
                    break;

                case 'getNonce':
                    response = await evmService.getNonce(
                        selectedRPC,
                        inputValue
                    );
                    break;

                default:
                    throw new Error('Operation not implemented');
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
            <h1>EVM Rebroadcaster</h1>

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

            {/* Execute button appears when all data is ready */}
            {selectedChain && selectedRPC && selectedOperation && inputValue && (
                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '8px',
                    border: '2px solid #2196F3'
                }}>
                    <h3>✓ Ready to Execute</h3>
                    <p><strong>Chain:</strong> {selectedChain}</p>
                    <p><strong>RPC:</strong> {selectedRPC}</p>
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

            {/* Display result */}
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