# POLYNFT
PolyNFT is a a simple solidity smart contract that bridges NFT from the Ethereum Sepolia testnet to Polygon Amoy testnet. 

## Description
This smart contract deploys an NFT smart contract on the Ethereum chain, mints the NFT to an address, and then approves and transfers the NFT to the Polygon chain.

The smart contract has 4 functions:
```javascript
// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.20;

import "erc721a/contracts/ERC721A.sol";

contract PolyNFT is ERC721A {

    constructor() ERC721A("MetaNFT", "MNFT") {}

    function safeMint(uint8 _quantity) external payable {
        _safeMint(msg.sender, _quantity);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/QmQVQCaW65eFaHJ68hZbqnRF4xz5ifi4KF1qWEqVn5RNgB/1.png";
    }

    function promptDescription() external pure returns (string memory) {
        return "These are bikes with steeze!";
    }

    function balanceOf(address owner) public view override returns (uint256) {
        return super.balanceOf(owner);
    }
}
```

- ```safeMint()```: This acts as the batchMint in the ERC1155 where you can mint as many quantities of NFT in a single transaction.
-  ```_baseURI()```: This gets the base URI for the images. This is mostly useful for the NFT marketplace to display the NFTs.
- ```promptDescription()```: This gets the prompt description.
- ```balanceOf()```: This allows user to check how many NFTs they have in their balance.
- ```fxRootContract.deposit()```: This function is not part of my smart contract functions, but this is the function that does all the magic. The fxRootContract is the bridge contract and in it is the deposit function that does all the transfer from Ethereum Sepolia testnet to Polygon Amoy testnet.

## Getting Started
```git clone https://github.com/rilwan12oye/Polygon-POS``` to clone the project. 
After cloning the project on Github, do the following to get the code running on your computer.

- Inside the project directory, in the terminal type:
  ```npm i```
  to install all the necessary dependencies
- When all of the dependencies are downloaded, change the .env.example to .env and fill in all the necessary information. NOTE: Make sure you added .env into your .gitignore so you don't push your private key to GitHub.
- Once these are done, go ahead to deploy your contract by running this command
  ```npx hardhat run scripts/metaNFT/deploy.js --network sepolia```. 
- When you have deployed your contract, update your .env file by adding the newly deployed contract address.
- Go ahead and batchMint by running this command
  ```npx hardhat run scripts/metaNFT/batchMint.js --network sepolia```.
  This will mint all the NFTs to your address.
- When the minting is done, go ahead and approve and transfer to the Polygon chain by running the following command
  ```run scripts/metaNFT/approveTransfer.js --network sepolia```. 
- It will take about 20-30minutes before the transaction reflects on Polygon.
- After about 20-30minutes and the transaction has reflected, copy the amoy contract address, paste it in the ```getBalance.js``` file where you have...
 ```javascript
  const polygonContract = "0x784e1648d9e045949E37089aB40065d9Fb203a35";
  ```
- Once that is done, check the balance on Polygon by running this command
  ```npx hardhat run scripts/metaNFT/getBalance.js --network amoy```

## Authors
Rilwan Oyewole

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
