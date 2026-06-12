export const ARCNS_ADDRESS = "0x641F19Cd75D997871faAAAd89594F83a63F3179f" as const;
export const USDC_ADDRESS = "0x3600000000000000000000000000000000000000" as const;
export const EURC_ADDRESS = "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a" as const;
export const OWNER_ADDRESS = "0xEc54281E81ce7777F610f28926791C5D258Eea0C" as const;

export const ARCNS_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [{ name: "name", type: "string" }], name: "mintWithUSDC", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "name", type: "string" }], name: "mintWithEURC", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "name", type: "string" }], name: "isAvailable", outputs: [{ name: "", type: "bool" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "user", type: "address" }], name: "getUserDomains", outputs: [{ name: "", type: "string[]" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "getAllDomains", outputs: [{ name: "", type: "string[]" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "getTotalMinted", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "getUSDCBalance", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "getEURCBalance", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "token", type: "address" }], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "owner", outputs: [{ name: "", type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "PRICE", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
] as const;

export const ERC20_ABI = [
  { inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], name: "allowance", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], name: "approve", outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "account", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], stateMutability: "view", type: "function" },
] as const;

export const PRICE = 1_000_000n; // 1 USDC/EURC (6 decimals)