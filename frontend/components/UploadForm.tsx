'use client'
import { useState } from 'react'
import { ethers } from 'ethers'
import ConditionalRegistry from '../contracts/ConditionalRegistry.json'

const CONTRACT_ADDRESS = '0xcCAB3A9966A62f50f8A1Bc3aeb09a67966Ca370F'

export default function UploadForm() {
  const [ipfsHash, setIpfsHash] = useState('')
  const [expiry, setExpiry] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [status, setStatus] = useState('')

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not found')
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', [])
      setWalletAddress(accounts[0])
    } catch (err) {
      setStatus('Wallet connection failed')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!ipfsHash || !expiry) return
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ConditionalRegistry.abi, signer)
      const timestamp = Math.floor(new Date(expiry).getTime() / 1000)
      const tx = await contract.register(ipfsHash, timestamp)
      setStatus('Waiting for confirmation...')
      await tx.wait()
      setStatus('Successfully registered on-chain!')
    } catch (err) {
      setStatus('Failed to register')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">IPFS Hash</label>
          <input
            type="text"
            value={ipfsHash}
            onChange={e => setIpfsHash(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g., Qm..."
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Expiry (UTC)</label>
          <input
            type="datetime-local"
            value={expiry}
            onChange={e => setExpiry(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={connectWallet}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {walletAddress ? `Wallet: ${walletAddress.slice(0, 6)}...` : 'Connect Wallet'}
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </div>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  )
}
