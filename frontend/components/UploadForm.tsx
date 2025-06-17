"use client";

import { useState } from "react";
import { ethers } from "ethers";
import ConditionalRegistry from "../contracts/ConditionalRegistry.json";

const CONTRACT_ADDRESS = "0x6A7273dC24933A09cc61a25893cD681def84d78b";

export default function UploadForm() {
  const [ipfsHash, setIpfsHash] = useState("");
  const [expiry, setExpiry] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask not detected");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error(err);
      setStatus("Wallet connection failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ConditionalRegistry.abi,
        signer
      );
      const expiryTimestamp = Math.floor(new Date(expiry).getTime() / 1000);

      const tx = await contract.register(ipfsHash, expiryTimestamp);
      await tx.wait();
      setStatus("✅ Registered successfully on-chain");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to register");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Register IPFS Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">IPFS Hash</label>
          <input
            type="text"
            value={ipfsHash}
            onChange={(e) => setIpfsHash(e.target.value)}
            required
            placeholder="Qm..."
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Expiry Time (UTC)</label>
          <input
            type="datetime-local"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex justify-between items-center gap-2">
          <button
            type="button"
            onClick={connectWallet}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {walletAddress
              ? `Connected: ${walletAddress.slice(0, 6)}...`
              : "Connect Wallet"}
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </div>

        {status && <p className="text-sm text-gray-700 mt-2">{status}</p>}
      </form>
    </div>
  );
}
