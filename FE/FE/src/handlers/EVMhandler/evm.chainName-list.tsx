// evm.ChainName-list.tsx
import { useState, useEffect } from 'react';

const BE = "localhost:3000/evm";

const getRPCurls = async () => {
    try {
        const response = await fetch(`http://${BE}/rpc-urls`, { method: 'GET' });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching RPC URLs:', error);
        return null;
    }
}

interface ChainNameListProps {
    onSelectChain?: (chain: string) => void;
}

export function ChainNameList({ onSelectChain }: ChainNameListProps) {
    const [rpcs, setRpcs] = useState<any[]>([]);
    const [chainNames, setChainNames] = useState<string[]>([]);
    const [filteredNames, setFilteredNames] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedChain, setSelectedChain] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRPCs = async () => {
            try {
                setLoading(true);
                const data = await getRPCurls();
                if (data?.success && data.data?.rpcUrls) {
                    let rpcData = data.data.rpcUrls;
                    if (typeof rpcData === 'string') {
                        rpcData = JSON.parse(rpcData);
                    }

                    setRpcs(rpcData);
                    const names = rpcData.map((item: any) => item.name);
                    setChainNames(names);
                    setFilteredNames(names);
                }
            } catch (err) {
                console.error('Error loading chains:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRPCs();
    }, []);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setShowDropdown(true);

        if (value === '') {
            setFilteredNames(chainNames);
        } else {
            const filtered = chainNames.filter(name =>
                name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredNames(filtered);
        }
    };

    const handleSelect = (name: string) => {
        setSelectedChain(name);
        setSearchTerm(name);
        setShowDropdown(false);

        // Call the callback to notify parent component
        if (onSelectChain) {
            onSelectChain(name);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.autocomplete-container')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (loading) return <div>Loading chains...</div>;

    return (
        <div className="autocomplete-container" style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
            <h2>Select Blockchain</h2>

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search for a chain (e.g., Ethereum, Polygon)..."
                style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ccc',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                }}
            />

            {showDropdown && filteredNames.length > 0 && (
                <ul
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        maxHeight: '300px',
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        border: '2px solid #ccc',
                        borderRadius: '8px',
                        marginTop: '4px',
                        padding: 0,
                        listStyle: 'none',
                        zIndex: 1000,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                >
                    {filteredNames.map((name, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(name)}
                            style={{
                                padding: '12px',
                                cursor: 'pointer',
                                borderBottom: index < filteredNames.length - 1 ? '1px solid #eee' : 'none',
                                backgroundColor: name === selectedChain ? '#e8f5e9' : 'white',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = name === selectedChain ? '#e8f5e9' : '#f5f5f5';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = name === selectedChain ? '#e8f5e9' : 'white';
                            }}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            )}

            {selectedChain && (
                <button
                    onClick={() => {
                        setSelectedChain('');
                        setSearchTerm('');
                    }}
                    style={{
                        marginTop: '10px',
                        padding: '8px 16px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Hide RPC for {selectedChain}
                </button>
            )}

            <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                {chainNames.length} chains available
            </div>
        </div>
    );
}