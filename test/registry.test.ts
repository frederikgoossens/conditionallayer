import { ethers } from "hardhat"
import { expect } from "chai"

describe("ConditionalRegistry", function () {
  let contract: any
  let owner: any
  let addr1: any

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners()
    const ConditionalRegistry = await ethers.getContractFactory("ConditionalRegistry")
    contract = await ConditionalRegistry.deploy()
    await contract.deployed()
  })

  it("should register a new entry", async function () {
    await contract.register("QmTestHash", Math.floor(Date.now() / 1000) + 3600)
    const entry = await contract.entries("QmTestHash")
    expect(entry.owner).to.equal(owner.address)
  })

  it("should allow owner to delete entry", async function () {
    await contract.register("QmTestHash", Math.floor(Date.now() / 1000) + 3600)
    await contract.deleteEntry("QmTestHash")
    const entry = await contract.entries("QmTestHash")
    expect(entry.owner).to.equal(ethers.constants.AddressZero)
  })

  it("should reject deletion by non-owner", async function () {
    await contract.register("QmTestHash", Math.floor(Date.now() / 1000) + 3600)
    await expect(
      contract.connect(addr1).deleteEntry("QmTestHash")
    ).to.be.revertedWith("Not your entry")
  })
})
