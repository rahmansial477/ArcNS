<div align="center">

#  ArcNS

### Your identity on Arc Testnet

Claim your own `.arc` domain and build your on-chain identity

<br>

<img src="https://img.shields.io/badge/Network-Arc%20Testnet-06b6d4?style=for-the-badge" alt="Arc Testnet">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">

<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">

<img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">

<br><br>

<a href="https://arc-ns.lovable.app/">
<img src="https://img.shields.io/badge/%20LIVE%20DEMO-OPEN%20ARCNS-06b6d4?style=for-the-badge" alt="Live Demo">
</a>

</div>

---

##  What is ArcNS?

**ArcNS** is an on-chain naming application built for **Arc Testnet**.

It allows users to search for a `.arc` domain, check its availability, connect their wallet and mint the domain directly on-chain using **USDC or EURC**.

ArcNS is designed to make blockchain identity more human-readable by giving users recognizable `.arc` names instead of relying only on long wallet addresses.

---

##  Features

-  Real-time domain availability checking
-  On-chain `.arc` domain minting
-  Mint with USDC
-  Mint with EURC
-  Web3 wallet connection
-  Automatic token allowance checking
-  ERC-20 approval flow
-  Smart contract interaction
-  Transaction tracking through ArcScan
-  Live total minted counter
-  Responsive Web3 interface
---

 How It Works

        Connect Wallet
              │
              ▼
       Enter .arc Name
              │
              ▼
      Check Availability
              │
        ┌─────┴─────┐
        │           │
      Taken      Available
        │           │
        ▼           ▼
   Try Another   Choose Token
                    │
             ┌──────┴──────┐
             │             │
            USDC          EURC
             │             │
             └──────┬──────┘
                    ▼
           Check Allowance
                    │
                    ▼
             Approve if Needed
                    │
                    ▼
               Mint Domain
                    │
                    ▼
            Transaction Done
                    │
                    ▼
              Own .arc Domain

---

 Domain Minting

Users can enter a domain name and instantly check whether it is available.

Current domain rules

- Minimum length: 3 characters
- Maximum length: 30 characters
- Lowercase letters and numbers only
- No spaces or special characters

Examples:

rahman.arc
builder123.arc
web3.arc

---

 Mint Price

Each domain currently costs:

Payment Token| Price
USDC| 1 USDC
EURC| 1 EURC

The application handles the ERC-20 approval flow automatically when the wallet does not have sufficient allowance.

---

 Smart Contract

ArcNS currently interacts with a deployed contract on Arc Testnet.

ArcNS Contract

0x641F19Cd75D997871faAAAd89594F83a63F3179f

USDC

0x3600000000000000000000000000000000000000

EURC

0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a

Contract functionality

ArcNS integrates with contract functions for:

- checking domain availability
- minting with USDC
- minting with EURC
- retrieving domains owned by a wallet
- retrieving registered domains
- retrieving total minted domains
- reading contract token balances

---

 Tech Stack

Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Sonner

Web3

- Wagmi
- Viem
- RainbowKit
- ERC-20 interactions
- Smart contract integration

Application

- TanStack Router
- TanStack React Query

---

 Getting Started

Requirements

Before running ArcNS locally you need:

- Node.js
- npm
- a Web3 wallet
- Arc Testnet access
- testnet USDC or EURC for minting

Clone the repository

git clone https://github.com/rahmansial477/arc-ns.git
cd arc-ns

Install dependencies

npm install

Start development server

npm run dev

The development server URL will be shown in your terminal.

---

 Production Build

Build the application:

npm run build

Preview the production build:

npm run preview

---

 Development

Run ESLint:

npm run lint

Format the project:

npm run format

---

 Live Demo

<div align="center"><a href="https://arc-ns.lovable.app/"><img src="https://img.shields.io/badge/🚀%20Open%20ArcNS-Live%20Demo-06b6d4?style=for-the-badge" /></a></div>---

 Why ArcNS?

Blockchain addresses are difficult to remember, read and share.

ArcNS explores a more human-friendly identity layer for Arc by allowing users to claim readable ".arc" names.

Instead of sharing:

0x7f...long-wallet-address

users can represent their on-chain identity with something easier to recognize:

yourname.arc

---

 Roadmap

- [x] ".arc" domain availability checking
- [x] USDC minting
- [x] EURC minting
- [x] Wallet integration
- [x] On-chain domain registration
- [x] Transaction tracking
- [x] Total minted counter
- [ ] Domain ownership dashboard
- [ ] User profile pages
- [ ] Domain management
- [ ] Domain transfer functionality
- [ ] Additional identity utilities
- [ ] More Arc ecosystem integrations
- [ ] Mainnet deployment when appropriate

---

 Testnet Notice

ArcNS is currently deployed for Arc Testnet.

Testnet assets are for testing purposes and should not be treated as real-world funds.

---

Contributing

Contributions, ideas and feedback are welcome.

# Fork the repository

# Create your branch
git checkout -b feature/your-feature

# Make your changes

# Commit
git commit -m "add your feature"

# Push
git push origin feature/your-feature

Then open a Pull Request.

---

 License

Please check the repository for the current license and usage terms.

---

<div align="center"> Built for Arc Testnet

ArcNS — Your identity on Arc Testnet

<br/><a href="https://arc-ns.lovable.app/">
<img src="https://img.shields.io/badge/%20Try%20ArcNS-06b6d4?style=for-the-badge" />
</a></div>
