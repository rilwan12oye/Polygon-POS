const hre = require("hardhat");

async function main() {

  const polyNFT = await hre.ethers.deployContract("PolyNFT");
  const [signer] =   await hre.ethers.getSigners();

  const deployedAddress = await polyNFT.getAddress();

  console.log(`
    ${signer.address} 
    deploys PolyNFT contract to 
    ${deployedAddress}
    `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});