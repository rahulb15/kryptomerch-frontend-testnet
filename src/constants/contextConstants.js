// export const CHAIN_ID = process.env.NEXT_PUBLIC_KDA_CHAIN_ID || "0";
export const CHAIN_ID = process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE === "mainnet" ? process.env.NEXT_PUBLIC_MAINNET_CHAIN_ID : process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID;
// export const PRECISION = Number(process.env.NEXT_PUBLIC_KDA_PRECISION) || 12;
export const PRECISION = Number(process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE === "mainnet" ? process.env.NEXT_PUBLIC_MAINNET_CHAIN_PRECISION : process.env.NEXT_PUBLIC_TESTNET_CHAIN_PRECISION) || 12;
// export const NETWORKID = process.env.NEXT_PUBLIC_KDA_NETWORK_ID || "testnet04";
export const NETWORKID = process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE === "mainnet" ? process.env.NEXT_PUBLIC_MAINNET_CHAIN_NETWORK_ID : process.env.NEXT_PUBLIC_TESTNET_CHAIN_NETWORK_ID;
// export const FEE = process.env.NEXT_PUBLIC_KDA_FEE || 0.003;
export const FEE = process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE === "mainnet" ? process.env.NEXT_PUBLIC_MAINNET_CHAIN_FEE : process.env.NEXT_PUBLIC_TESTNET_CHAIN_FEE;
// export const APR_FEE = process.env.NEXT_PUBLIC_APR_FEE || 0.0025;
export const APR_FEE = process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE === "mainnet" ? process.env.NEXT_PUBLIC_MAINNET_CHAIN_APR_FEE : process.env.NEXT_PUBLIC_TESTNET_CHAIN_APR_FEE;
// export const GAS_PRICE =
//     Number(process.env.NEXT_PUBLIC_KDA_GAS_PRICE) || 0.0000001;
export const GAS_PRICE =
    Number(process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE === "mainnet" ? process.env.NEXT_PUBLIC_MAINNET_CHAIN_GAS_PRICE : process.env.NEXT_PUBLIC_TESTNET_CHAIN_GAS_PRICE) || 0.0000001;
export const GAS_LIMIT =
    Number(process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE === "mainnet" ? process.env.NEXT_PUBLIC_MAINNET_CHAIN_GAS_LIMIT : process.env.NEXT_PUBLIC_TESTNET_CHAIN_GAS_LIMIT) || 400000;
// export const NETWORK_VERSION =
//     process.env.NEXT_PUBLIC_KDA_NETWORK_VERSION || "0.0";
export const NETWORK_VERSION = process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE === "mainnet" ? process.env.NEXT_PUBLIC_MAINNET_CHAIN_VERSION : process.env.NEXT_PUBLIC_TESTNET_CHAIN_VERSION;

export const CHAIN_NETWORK = process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE === "mainnet" ? process.env.NEXT_PUBLIC_MAINNET_CHAIN_NETWORK : process.env.NEXT_PUBLIC_TESTNET_CHAIN_NETWORK;

export const NETWORK = `${CHAIN_NETWORK}/chainweb/${NETWORK_VERSION}/${NETWORKID}/chain/${CHAIN_ID}/pact`;

export const creationTime = () => Math.round(new Date().getTime() / 1000) - 10;