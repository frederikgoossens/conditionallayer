'use client'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import ConditionalRegistry from '../contracts/ConditionalRegistry.json'

const CONTRACT_ADDRESS = '0xcCAB3A9966A62f50f8A1Bc3aeb09a67966Ca370F'
const RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/JLDhK4ENHrBpF5pqQ4cjL'

interface Entry {
  id: number
  hash: string
  owner: string
  expiry: number
}

export default function RegistryViewer() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(RPC_URL)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ConditionalRegistry.abi, provider)
        const count = await contract.counter()
        const results: Entry[] = []

        for (let i = 0; i < count; i++) {
          const [hash, owner, expiry] = await contract.getEntryByIndex(i)
          if (owner !== ethers.ZeroAddress) {
            results.push({
              id: i,
              hash,
              owner,
              expiry: Number(expiry)
            })
          }
        }

        setEntries(results)
      } catch (error) {
        setEntries([])
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  if (loading) return <div className="text-center">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">Registered Entries</h2>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">IPFS Hash</th>
            <th className="border p-2">Expires</th>
            <th className="border p-2">Owner</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id} className="border-t">
              <td className="border p-2">{entry.id}</td>
              <td className="border p-2">{entry.hash}</td>
              <td className="border p-2">{new Date(entry.expiry * 1000).toLocaleString()}</td>
              <td className="border p-2">{entry.owner.slice(0, 6)}...{entry.owner.slice(-4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!entries.length && <div className="mt-4 text-gray-600">No entries found.</div>}
    </div>
  )
}
