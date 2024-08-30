const hre = require("hardhat");
require("dotenv").config();

const { CONTRACT_ADDRESS } = process.env;

async function main() {
  const PolyNFT = await hre.ethers.getContractFactory("PolyNFT");
  const polyNFT = PolyNFT.attach(CONTRACT_ADDRESS);

  console.log(await polyNFT.promptDescription());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});