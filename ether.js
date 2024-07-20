import { ethers } from 'ethers';

let provider;
let signer;
let contract;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    signer = provider.getSigner();
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
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
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
              },
              {
                "internalType": "uint8",
                "name": "level",
                "type": "uint8"
              }
            ],
            "name": "findFreeX3Referrer",
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
                "name": "userAddress",
                "type": "address"
              },
              {
                "internalType": "uint8",
                "name": "level",
                "type": "uint8"
              }
            ],
            "name": "findFreeX6Referrer",
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

    contract = new ethers.Contract(contractAddress, abi, signer);
}

export async function registerUser(referrerAddress) {
    try {
        const tx = await contract.registrationExt(referrerAddress, { value: ethers.utils.parseEther("0.05") });
        await tx.wait();
        console.log('User registered successfully');
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

export async function buyNewLevel(matrix, level) {
    try {
        const levelPrice = await contract.levelPrice(level);
        const tx = await contract.buyNewLevel(matrix, level, { value: levelPrice });
        await tx.wait();
        console.log('Level bought successfully');
    } catch (error) {
        console.error('Error during level purchase:', error);
        throw error;
    }
}






















// import Web3 from 'web3';
// import SmartMatrixForsageABI from './SmartMatrixForsageABI.json';

// // Replace with your actual deployed contract address
// const contractAddress = '0xd764b4a56A49E2780355CD585832B26B7DeF0147';

// let web3;

// // Initialize Web3 instance
// if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
//   // Use MetaMask's provider
//   web3 = new Web3(window.ethereum);
//   // Request account access if needed
//   window.ethereum.enable().catch(error => {
//     console.error('User denied account access', error);
//   });
// } else {
//   // Fallback to a local provider or Infura if MetaMask is not available
//   web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// }

// // Create contract instance
// const smartMatrixForsageContract = new web3.eth.Contract(
//   SmartMatrixForsageABI,
//   contractAddress
// );

// // Register user function
// export async function registerUser(userAddress, referrerAddress) {
//   try {
//     const accounts = await web3.eth.getAccounts();
//     console.log('Attempting to register user with account:', accounts[0]);

//     const gasPrice = await web3.eth.getGasPrice();
//     console.log('Current gas price:', gasPrice.toString());

//     const gas = await smartMatrixForsageContract.methods
//       .registrationExt(referrerAddress)
//       .estimateGas({ from: accounts[0], value: web3.utils.toWei('0.05', 'ether') });
//     console.log('Gas estimated:', gas);

//     const result = await smartMatrixForsageContract.methods
//       .registrationExt(referrerAddress)
//       .send({
//         from: accounts[0],
//         gas: gas.toString(),
//         gasPrice: gasPrice.toString(),
//         value: web3.utils.toWei('0.05', 'ether'),
//       });

//     console.log('Registration successful. Transaction hash:', result.transactionHash);
//     return result;
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw error; // Rethrow the error to handle in the calling function if needed
//   }
// }

// // Buy new level function
// export async function buyNewLevel(userAddress, matrix, level) {
//   try {
//     const accounts = await web3.eth.getAccounts();
//     const levelPrice = await smartMatrixForsageContract.methods.levelPrice(level).call();
//     const gas = await smartMatrixForsageContract.methods.buyNewLevel(matrix, level).estimateGas({
//       from: accounts[0],
//       value: levelPrice.toString(),
//     });

//     const result = await smartMatrixForsageContract.methods
//       .buyNewLevel(matrix, level)
//       .send({
//         from: accounts[0],
//         gas: gas.toString(),
//         value: levelPrice.toString(),
//       });

//     console.log(`Level ${level} purchase successful in matrix ${matrix}:`, result);
//     return result;
//   } catch (error) {
//     console.error(`Error buying new level ${level} in matrix ${matrix}:`, error);
//     throw error; // Rethrow the error to handle in the calling function if needed
//   }
// }

// // Check if user exists function
// export async function checkUserExists(userAddress) {
//   try {
//     const isUserExists = await smartMatrixForsageContract.methods
//       .isUserExists(userAddress)
//       .call();
//     console.log('User exists:', isUserExists);
//     return isUserExists;
//   } catch (error) {
//     console.error('Error checking if user exists:', error);
//     throw error; // Rethrow the error to handle in the calling function if needed
//   }
// }

// // Get user details function
// export async function getUserDetails(userAddress) {
//   try {
//     const userDetails = await smartMatrixForsageContract.methods
//       .users(userAddress)
//       .call();
//     console.log('User details:', userDetails);
//     return userDetails;
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     throw error; // Rethrow the error to handle in the calling function if needed
//   }
// }

// // Get the last user ID function
// export async function getLastUserId() {
//   try {
//     const lastUserId = await smartMatrixForsageContract.methods.lastUserId().call();
//     console.log('Last user ID:', lastUserId.toString()); // Ensure it's returned as a string
//     return lastUserId.toString(); // Ensure it's returned as a string
//   } catch (error) {
//     console.error('Error fetching last user ID:', error);
//     throw error; // Rethrow the error to handle in the calling function if needed
//   }
// }

// // Get the level price function
// export async function getLevelPrice(level) {
//   try {
//     const levelPrice = await smartMatrixForsageContract.methods.levelPrice(level).call();
//     console.log(`Price for level ${level}:`, levelPrice.toString()); // Ensure it's returned as a string
//     return levelPrice.toString(); // Ensure it's returned as a string
//   } catch (error) {
//     console.error(`Error fetching price for level ${level}:`, error);
//     throw error; // Rethrow the error to handle in the calling function if needed
//   }
// }

// // Find free X3 referrer function
// export async function findFreeX3Referrer(userAddress, level) {
//   try {
//     const freeX3Referrer = await smartMatrixForsageContract.methods
//       .findFreeX3Referrer(userAddress, level)
//       .call();
//     console.log(`Free X3 referrer for user ${userAddress} at level ${level}:`, freeX3Referrer);
//     return freeX3Referrer;
//   } catch (error) {
//     console.error(`Error finding free X3 referrer for user ${userAddress} at level ${level}:`, error);
//     throw error; // Rethrow the error to handle in the calling function if needed
//   }
// }

// // Find free X6 referrer function
// export async function findFreeX6Referrer(userAddress, level) {
//   try {
//     const freeX6Referrer = await smartMatrixForsageContract.methods
//       .findFreeX6Referrer(userAddress, level)
//       .call();
//     console.log(`Free X6 referrer for user ${userAddress} at level ${level}:`, freeX6Referrer);
//     return freeX6Referrer;
//   } catch (error) {
//     console.error(`Error finding free X6 referrer for user ${userAddress} at level ${level}:`, error);
//     throw error; // Rethrow the error to handle in the calling function if needed
//   }
// }
