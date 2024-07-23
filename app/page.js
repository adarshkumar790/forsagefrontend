"use client";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// Contract ABI
const abi = [
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

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [referrer, setReferrer] = useState('');
  const [matrix, setMatrix] = useState(1);
  const [level, setLevel] = useState(1);
  const [userExists, setUserExists] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.requestAccounts();
        setAccount(accounts[0]);

        const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
        setContract(contractInstance);
      } else {
        console.error('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  const registerUser = async () => {
    if (!contract) return;

    try {
      const value = web3.utils.toWei('0.05', 'ether'); // Example value
      await contract.methods.registrationExt(referrer).send({
        from: account,
        value: value
      });
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const buyNewLevel = async () => {
    if (!contract) return;

    try {
      const price = await contract.methods.levelPrice(level).call();
      await contract.methods.buyNewLevel(matrix, level).send({
        from: account,
        value: price
      });
      console.log('New level purchased successfully');
    } catch (error) {
      console.error('Error buying new level:', error);
    }
  };

  const checkUserExists = async () => {
    if (!contract) return;

    try {
      const exists = await contract.methods.isUserExists(account).call();
      setUserExists(exists);
    } catch (error) {
      console.error('Error checking user existence:', error);
    }
  };

  const getUserDetails = async () => {
    if (!contract) return;

    try {
      const details = await contract.methods.users(account).call();
      setUserDetails(details);
    } catch (error) {
      console.error('Error getting user details:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Smart Contract Interaction</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Referrer Address"
          value={referrer}
          onChange={(e) => setReferrer(e.target.value)}
          className="border p-2 mb-2 w-full text-gray-900"
        />
        <input
          type="number"
          placeholder="Matrix"
          value={matrix}
          max={2}
          min={1}
          onChange={(e) => setMatrix(parseInt(e.target.value))}
          className="border p-2 mb-2 w-full text-gray-900"
        />
        <input
          type="number"
          placeholder="Level"
          value={level}
          min={1}
          max={12}
          onChange={(e) => setLevel(parseInt(e.target.value))}
          className="border p-2 mb-2 w-full text-gray-900"
        />
      </div>

      <button
        onClick={registerUser}
        className="bg-blue-500 text-white px-6 py-2 rounded mb-4 text-gray-900"
      >
        Register User
      </button>

      <button
        onClick={buyNewLevel}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Buy New Level
      </button>

      <button
        onClick={checkUserExists}
        className="bg-yellow-500 text-white px-4 py-2 rounded mb-4"
      >
        Check if User Exists
      </button>

      <button
        onClick={getUserDetails}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Get User Details
      </button>

      {userExists !== null && (
        <p className="mt-4">
          User Exists: {userExists ? 'Yes' : 'No'}
        </p>
      )}

      {userDetails && (
        <div className="mt-4">
          <p>User ID: {userDetails.id}</p>
          <p>Referrer: {userDetails.referrer}</p>
          <p>Partners Count: {userDetails.partnersCount}</p>
        </div>
      )}
    </div>
  );
};

export default App;


// "use client"
// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';

// // Contract ABI
// const abi = [
//   // Add the provided ABI code here
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "ownerAddress",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "receiver",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "matrix",
//         "type": "uint8"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "level",
//         "type": "uint8"
//       }
//     ],
//     "name": "MissedEthReceive",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "user",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "referrer",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "matrix",
//         "type": "uint8"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "level",
//         "type": "uint8"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "place",
//         "type": "uint8"
//       }
//     ],
//     "name": "NewUserPlace",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "user",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "referrer",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "userId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "referrerId",
//         "type": "uint256"
//       }
//     ],
//     "name": "Registration",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "user",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "currentReferrer",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "caller",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "matrix",
//         "type": "uint8"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "level",
//         "type": "uint8"
//       }
//     ],
//     "name": "Reinvest",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "receiver",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "matrix",
//         "type": "uint8"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "level",
//         "type": "uint8"
//       }
//     ],
//     "name": "SentExtraEthDividends",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "user",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "referrer",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "matrix",
//         "type": "uint8"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint8",
//         "name": "level",
//         "type": "uint8"
//       }
//     ],
//     "name": "Upgrade",
//     "type": "event"
//   },
//   {
//     "stateMutability": "payable",
//     "type": "fallback"
//   },
//   {
//     "inputs": [],
//     "name": "LAST_LEVEL",
//     "outputs": [
//       {
//         "internalType": "uint8",
//         "name": "",
//         "type": "uint8"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "name": "balances",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint8",
//         "name": "matrix",
//         "type": "uint8"
//       },
//       {
//         "internalType": "uint8",
//         "name": "level",
//         "type": "uint8"
//       }
//     ],
//     "name": "buyNewLevel",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "idToAddress",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "user",
//         "type": "address"
//       }
//     ],
//     "name": "isUserExists",
//     "outputs": [
//       {
//         "internalType": "bool",
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "lastUserId",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint8",
//         "name": "",
//         "type": "uint8"
//       }
//     ],
//     "name": "levelPrice",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "owner",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "referrerAddress",
//         "type": "address"
//       }
//     ],
//     "name": "registrationExt",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "userIds",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "name": "users",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "id",
//         "type": "uint256"
//       },
//       {
//         "internalType": "address",
//         "name": "referrer",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "partnersCount",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "stateMutability": "payable",
//     "type": "receive"
//   }
// ];

// const contractAddress = '0xa955d1c9d2B7D1C187613e5473eeC2aa1dc5f4c8';


// const App = () => {
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState('');
//   const [referrer, setReferrer] = useState('');
//   const [matrix, setMatrix] = useState(0);
//   const [level, setLevel] = useState(0);
//   const [userExists, setUserExists] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     const initWeb3 = async () => {
//       if (window.ethereum) {
//         const web3Instance = new Web3(window.ethereum);
//         setWeb3(web3Instance);

//         const accounts = await web3Instance.eth.requestAccounts();
//         setAccount(accounts[0]);

//         const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
//         setContract(contractInstance);
//       } else {
//         console.error('Please install MetaMask!');
//       }
//     };

//     initWeb3();
//   }, []);

//   const registerUser = async () => {
//     if (!contract) return;

//     try {
//       const value = web3.utils.toWei('0.05', 'ether'); // Example value
//       await contract.methods.registrationExt(referrer).send({
//         from: account,
//         value: value
//       });
//       console.log('User registered successfully');
//     } catch (error) {
//       console.error('Error registering user:', error);
//     }
//   };

//   const buyNewLevel = async () => {
//     if (!contract) return;

//     try {
//       const price = await contract.methods.levelPrice(level).call();
//       await contract.methods.buyNewLevel(matrix, level).send({
//         from: account,
//         value: price
//       });
//       console.log('New level purchased successfully');
//     } catch (error) {
//       console.error('Error buying new level:', error);
//     }
//   };

//   const checkUserExists = async () => {
//     if (!contract) return;

//     try {
//       const exists = await contract.methods.isUserExists(account).call();
//       setUserExists(exists);
//     } catch (error) {
//       console.error('Error checking user existence:', error);
//     }
//   };

//   const getUserDetails = async () => {
//     if (!contract) return;

//     try {
//       const details = await contract.methods.users(account).call();
//       setUserDetails(details);
//     } catch (error) {
//       console.error('Error getting user details:', error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Smart Contract Interaction</h1>
      
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Referrer Address"
//           value={referrer}
//           onChange={(e) => setReferrer(e.target.value)}
//           className="border p-2 mb-2 w-full text-gray-900"
//         />
//         <input
//           type="number"
//           placeholder="Matrix"
//           value={matrix}
//           max={2}
//           min={1}
//           onChange={(e) => setMatrix(parseInt(e.target.value))}
//           className="border p-2 mb-2 w-full text-gray-900"
//         />
//         <input
//           type="number"
//           placeholder="Level"
//           value={level}
//           min={1}
//           max={12}
//           onChange={(e) => setLevel(parseInt(e.target.value))}
//           className="border p-2 mb-2 w-full text-gray-900"      />
//       </div>

//       <button
//         onClick={registerUser}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4 text-gray-900"
//       >
//         Register User
//       </button>

//       <button
//         onClick={buyNewLevel}
//         className="bg-green-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Buy New Level
//       </button>

//       <button
//         onClick={checkUserExists}
//         className="bg-yellow-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Check if User Exists
//       </button>

//       <button
//         onClick={getUserDetails}
//         className="bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Get User Details
//       </button>

//       {userExists !== null && (
//         <p className="mt-4">
//           User Exists: {userExists ? 'Yes' : 'No'}
//         </p>
//       )}

//       {userDetails && (
//         <div className="mt-4">
//           <p>User ID: {userDetails.id}</p>
//           <p>Referrer: {userDetails.referrer}</p>
//           <p>Partners Count: {userDetails.partnersCount}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;











