import { ethers } from "hardhat"

async function main() {
  const ConditionalRegistry = await ethers.getContractFactory("ConditionalRegistry")
  const contract = await ConditionalRegistry.deploy()
  await contract.deployed()
  console.log("ConditionalRegistry deployed to:", contract.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
