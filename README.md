# ConditionalLayer – Privacy-Preserving Conditional Data Protocol

[![License: BSL-1.1](https://img.shields.io/badge/license-BSL--1.1-blue)](LICENSE)
[![Deployed on Sepolia](https://img.shields.io/badge/contract-sepolia-blue)](https://sepolia.etherscan.io/address/0xcCAB3A9966A62f50f8A1Bc3aeb09a67966Ca370F)
[![GitHub Repo](https://img.shields.io/badge/github-frederikgoossens%2Fconditionallayer-blue?logo=github)](https://github.com/frederikgoossens/conditionallayer)

ConditionalLayer is a modular EVM-compatible protocol that allows users to register content on-chain with time-bound, access-controlled, and deletion-governed logic. It ensures users retain control over visibility, expiry, and off-chain encrypted content while proving the data's authenticity immutably on blockchain.

---

## Tech Stack

* Smart Contracts: Solidity, Hardhat, Ethereum Sepolia
* Frontend: Next.js, TailwindCSS, Ethers.js
* Storage: IPFS (Pinata / Lighthouse)
* Access: Lit Protocol (wallet-gated decryption)
* Governance (optional): Snapshot, Gnosis Safe

## Features

* Register content hash and expiry date
* Conditional deletion (by uploader or DAO)
* Time-based unlocks (deadman switch, expiry)
* IPFS storage with Lit-based decryption (coming)
* Role-based access (viewer, uploader, guardian)
* DAO proposals for expiry extension or deletion

---

## Getting Started

### Smart Contracts

* `contracts/ConditionalRegistry.sol`: Registers IPFS hash and expiry, deletable only by owner.
* `scripts/deploy.ts`: Deployment script to Sepolia.

```bash
npx hardhat compile
npx hardhat run scripts/deploy.ts --network sepolia
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

### Frontend Features

* `components/UploadForm.tsx`: IPFS hash + expiry + connect wallet
* `components/RegistryViewer.tsx`: Fetches all on-chain entries

---

## File Structure

```
conditionallayer/
├── contracts/
│   └── ConditionalRegistry.sol
├── scripts/
│   └── deploy.ts
├── test/
│   └── registry.test.ts
├── hardhat.config.ts
├── .env
├── .gitignore
├── LICENSE
├── LICENSE_REQUEST.md
├── README.md
├── frontend/
│   ├── components/
│   │   ├── UploadForm.tsx
│   │   └── RegistryViewer.tsx
│   ├── contracts/
│   │   └── ConditionalRegistry.json
│   ├── pages/
│   │   └── index.tsx
│   ├── public/
│   ├── styles/
│   │   └── globals.css
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
```

---

## License – Business Source License 1.1

```
Licensor: Frederik Goossens / Merlaz Ltd
Licensed Work: ConditionalLayer Protocol
Additional Use Grant: Allowed for personal, research, and non-commercial testing only
Change Date: 1 July 2027
Change License: Apache License, Version 2.0
```

Use is restricted to non-commercial projects unless otherwise licensed.

---

## Contact

Frederik Goossens — [frederikg.com](https://frederikg.com)
GitHub: [@frederikgoossens](https://github.com/frederikgoossens)
