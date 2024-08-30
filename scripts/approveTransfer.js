const hre = require("hardhat");
require("dotenv").config();
const fxERC721RootContractABI = require("../ERC721FxRootContractABI.json");

const { ACCOUNT_ADDRESS, CONTRACT_ADDRESS } = process.env;

fxERC721RootAddress = "0x9e688939cb5d484e401933d850207d6750852053";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const PolyNFT = await hre.ethers.getContractFactory("PolyNFT");

  const polyNFT = await PolyNFT.attach(CONTRACT_ADDRESS);

  const approveTx = await polyNFT
    .connect(deployer)
    .setApprovalForAll(fxERC721RootAddress, true);

  await approveTx.wait();

  console.log("Approval done!");

  const fxRootContract = await hre.ethers.getContractAt(
    fxERC721RootContractABI,
    fxERC721RootAddress
  );

  for (let i = 0; i < 5; i++) {
    const depositTx = await fxRootContract
      .connect(deployer)
      .deposit(CONTRACT_ADDRESS, ACCOUNT_ADDRESS, i, "0x6566");
    await depositTx.wait();

    console.log(`NFTs transfterred from Sepolia to Polygon successfully`);
  }

  // console.log("NFT transfterred to Polygon successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
