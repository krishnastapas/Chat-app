const hre = require("hardhat");

const main = async () => {
  const chatFactory = await hre.ethers.getContractFactory("ChatApp");
  const chatContract = await chatFactory.deploy();

  await chatContract.deployed();

  console.log("chatContract address: ", chatContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
