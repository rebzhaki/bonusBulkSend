const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const bonusContract = await ethers.getContractFactory("BonusSendBulk");

  const deployedExchangeContract = await bonusContract.deploy();
  await deployedExchangeContract.deployed();

  // print the address of the deployed contract
  console.log("Bonus Contract Address:", deployedExchangeContract.address);//0x4fa1Cc664a9b4A8Dc968C2710b531B51CD95f993
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });