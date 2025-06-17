import { expect } from "chai";
import { ethers } from "hardhat";

describe("ConditionalRegistry", function () {
  let contract: any;
  let owner: any;
  let other: any;

  beforeEach(async () => {
    [owner, other] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("ConditionalRegistry");
    contract = await Factory.deploy();
    await contract.waitForDeployment();
  });

  it("should register a new entry", async () => {
    const tx = await contract
      .connect(owner)
      .register("QmTestHash", Math.floor(Date.now() / 1000 + 3600));
    await tx.wait();
    const entry = await contract.getEntry(0);
    expect(entry.ipfsHash).to.equal("QmTestHash");
    expect(entry.owner).to.equal(owner.address);
  });

  it("should allow owner to delete entry", async () => {
    await contract.register("QmTestHash", Math.floor(Date.now() / 1000 + 3600));
    await contract.deleteEntry(0);
    const entry = await contract.getEntry(0);
    expect(entry.deleted).to.be.true;
  });

  it("should reject deletion by non-owner", async () => {
    await contract.register("QmTestHash", Math.floor(Date.now() / 1000 + 3600));
    await expect(contract.connect(other).deleteEntry(0)).to.be.revertedWith(
      "Not owner"
    );
  });
});
