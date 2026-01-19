// evm.operation-list.tsx
import { useState } from 'react';

interface OperationListProps {
    onSelectedOperation?: (operation: string, input: string) => void;
}

export function TRXOperationList({ onSelectedOperation }: OperationListProps) {
    const [selectedOperation, setSelectedOperation] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');

    const operations = [
        'rebroadcastTransaction',
        'getTransaction',
    ];

    const handleOperationChange = (operation: string) => {
        setSelectedOperation(operation);
        setInputValue('');
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        // Pass both operation and input back to parent
        if (onSelectedOperation && selectedOperation) {
            onSelectedOperation(selectedOperation, value);
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Select Operation</h3>
            <select
                value={selectedOperation}
                onChange={(e) => handleOperationChange(e.target.value)}
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
                <option value="">Choose an operation...</option>
                {operations.map((operation, index) => (
                    <option key={index} value={operation}>
                        {operation}
                    </option>
                ))}
            </select>

            {selectedOperation && (
                <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#e8f5e9',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50'
                }}>
                    <strong>Selected Operation:</strong> {selectedOperation}

                    {selectedOperation === 'rebroadcastTransaction' && (
                        <div style={{ marginTop: '15px' }}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder="Enter transaction hex (0x...)"
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    fontSize: '18px',
                                    border: '2px solid #ccc',
                                    borderRadius: '8px',
                                    boxSizing: 'border-box',
                                    outline: 'none',
                                    minHeight: '60px'
                                }}
                            />
                        </div>
                    )}

                    {selectedOperation === 'getTransaction' && (
                        <div style={{ marginTop: '15px' }}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder="Enter transaction hash (0x...)"
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    fontSize: '18px',
                                    border: '2px solid #ccc',
                                    borderRadius: '8px',
                                    boxSizing: 'border-box',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}