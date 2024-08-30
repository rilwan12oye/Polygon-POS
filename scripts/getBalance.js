const hre = require("hardhat");
require("dotenv").config();

const { ACCOUNT_ADDRESS, CONTRACT_ADDRESS } = process.env;

const polygonContract = "0xE4E9aE0Ea1Dfc216867594fb55428C2726b607a1";

async function main() {
  const PolyNFT = await hre.ethers.getContractFactory("PolyNFT");
  const amoyContract = await PolyNFT.attach(polygonContract);

  const balance = await amoyContract.balanceOf(ACCOUNT_ADDRESS);

  const [signer] =   await hre.ethers.getSigners();

  console.log(`
    Your PolyNFT Balance on
    ${polygonContract}
    is: ${balance.toString()}
    `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});