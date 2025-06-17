# ConditionalLayer

ConditionalLayer is an Ethereum-based smart contract system for registering private, time-bound content references on-chain. It combines on-chain proofs with off-chain storage and optional deletion logic, allowing creators to control expiry, access, and content lifecycle.

## Use Case

This protocol is designed for inventors, content owners, or service providers who want to:
- Register a claim or proof of existence without revealing full content
- Make records optionally expire or be removed via governance
- Allow gated access to content off-chain

## Architecture

- Smart Contract: `ConditionalRegistry.sol` deployed on Ethereum Sepolia
- Storage: IPFS for off-chain encrypted content
- Access: Lit Protocol for decryption rights (optional)
- Deployment: Hardhat + TypeScript
- Frontend: Next.js with Ethers.js

## Setup

### 1. Install

```bash
npm install
