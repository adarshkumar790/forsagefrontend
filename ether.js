"use client";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';


const contractABI = [
  {
        "inputs": [
          {
            "internalType": "address",
            "name": "ownerAddress",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "matrix",
            "type": "uint8"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "level",
            "type": "uint8"
          }
        ],
        "name": "MissedEthReceive",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "referrer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "matrix",
            "type": "uint8"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "level",
            "type": "uint8"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "place",
            "type": "uint8"
          }
        ],
        "name": "NewUserPlace",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "referrer",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "userId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "referrerId",
            "type": "uint256"
          }
        ],
        "name": "Registration",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "currentReferrer",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "caller",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "matrix",
            "type": "uint8"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "level",
            "type": "uint8"
          }
        ],
        "name": "Reinvest",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "matrix",
            "type": "uint8"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "level",
            "type": "uint8"
          }
        ],
        "name": "SentExtraEthDividends",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "referrer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "matrix",
            "type": "uint8"
          },
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "level",
            "type": "uint8"
          }
        ],
        "name": "Upgrade",
        "type": "event"
      },
      {
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [],
        "name": "LAST_LEVEL",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "balances",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint8",
            "name": "matrix",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "level",
            "type": "uint8"
          }
        ],
        "name": "buyNewLevel",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "idToAddress",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "isUserExists",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "lastUserId",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "name": "levelPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "referrerAddress",
            "type": "address"
          }
        ],
        "name": "registrationExt",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "userIds",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "users",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "referrer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "partnersCount",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
];

const contractAddress = '0xa955d1c9d2B7D1C187613e5473eeC2aa1dc5f4c8';
function App() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [referrerAddress, setReferrerAddress] = useState('');
    const [referredUsers, setReferredUsers] = useState([]);
  
    useEffect(() => {
      const initWeb3 = async () => {
        if (window.ethereum) {
          try {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
  
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
  
            const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
            setContract(contractInstance);
  
            console.log('Web3, account, and contract successfully loaded.');
          } catch (error) {
            console.error('Error loading Web3, account, or contract:', error);
          }
        } else {
          alert('Please install MetaMask!');
        }
      };
  
      initWeb3();
    }, []);
  
    const fetchReferredUsers = async () => {
      if (!web3 || !contract || !account) {
        alert('Web3, contract, or account not loaded');
        console.error('Web3:', web3);
        console.error('Contract:', contract);
        console.error('Account:', account);
        return;
      }
  
      try {
        const users = await fetchReferredUsersFunc(web3, contract, referrerAddress);
        setReferredUsers(users);
      } catch (error) {
        console.error('Error fetching referred users:', error);
        alert('Failed to fetch referred users');
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <h1 className="text-3xl font-bold mb-8">SmartMatrixForsage Registration</h1>
        
        <div className="mb-4">
          <label className="block text-lg mb-2">
            Referrer Address:
            <input
              className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={referrerAddress}
              onChange={e => setReferrerAddress(e.target.value)}
              placeholder="Enter referrer address"
            />
          </label>
        </div>
        
        <button
          onClick={fetchReferredUsers}
          className="px-6 py-2 bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
        >
          Show Referred Users
        </button>
  
        {referredUsers.length > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Referred Users</h2>
            <ul>
              {referredUsers.map((user, index) => (
                <li key={index} className="mb-2">
                  <p>Address: {user.address}</p>
                  <p>User ID: {user.id}</p>
                  <p>Partners Count: {user.partnersCount}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  
  export default App;
  
  // Helper function to fetch referred users
  async function fetchReferredUsersFunc(web3, contract, referrerAddress) {
    try {
      const lastUserId = await contract.methods.lastUserId().call();
      console.log('Last User ID:', lastUserId);
  
      const referredUsers = [];
  
      for (let id = 1; id <= lastUserId; id++) {
        const address = await contract.methods.idToAddress(id).call();
        const user = await contract.methods.users(address).call();
        console.log('User ID:', id, 'Address:', address, 'User:', user);
  
        if (user.referrer.toLowerCase() === referrerAddress.toLowerCase()) {
          referredUsers.push({
            address: address,
            id: user.id,
            referrer: user.referrer,
            partnersCount: user.partnersCount
          });
        }
      }
  
      console.log('Referred Users:', referredUsers);
      return referredUsers;
    } catch (error) {
      console.error('Error fetching referred users:', error);
      throw error;
    }
  }