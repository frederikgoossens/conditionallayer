import { ethers } from "hardhat";

async function main() {
  const ContractFactory = await ethers.getContractFactory(
    "ConditionalRegistry"
  );
  const contract = await ContractFactory.deploy();

  // Wait for the deployment transaction to be mined
  await contract.waitForDeployment();

  console.log(`Contract deployed at: ${await contract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
