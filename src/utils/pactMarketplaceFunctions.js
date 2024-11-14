// marketplacePactFunctions.js
import { DEFAULT_INSTANCE } from "@utils/api/OnChainRefs";
console.log(DEFAULT_INSTANCE)

// {
//     name: 'Testnet Chain 1',
//     node: 'https://api.testnet.chainweb.com',
//     network: 'testnet04',
//     chain: '1',
//     ns: 'n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db',
//     bridge_ns: 'n_a55cdf159bc9fda0a8af03a71bb046942b1e4faf'
//   }

const testnetFunctions = {
    getLaunchCollectionFee: 'free.mp-ng-004.get-fee "mint"',
    launchCollection: "free.mp-ng-004.launch-collection",
    reserveToken: "free.mp-ng-004.reserve-token",
    mintNft: "free.mp-ng-004.MINT-NFT",
    getUnrevealedTokens: "free.mp-ng-004.get-unrevealed-tokens-for-collection",
    checkPublic: "free.mp-ng-004.check-public",
    checkWhitelist: "free.mp-ng-004.check-whitelist",
    checkPresale: "free.mp-ng-004.check-presale",
    getMintPrice: "free.mp-ng-004.get-mint-price",
    getWlPrice: "free.mp-ng-004.get-wl-price",
    getPresalePrice: "free.mp-ng-004.get-presale-price",
    getRoyaltyInfo: "free.mp-ng-004.get-royalty-info",
    bulkSyncWithNg: "free.mp-ng-004.bulk-sync-with-ng",
    createAirdrop: "free.mp-ng-004.create-airdrop",
    bulkAirdrop: "free.mp-ng-004.bulk-airdrop",
    launchSingleNft: "free.mp-ng-004.launch-single-nft",
    reserveSingleNft: "free.mp-ng-004.reserve-single-nft",
    denyCollection: "free.mp-ng-004.deny-collection",
    getTokenDetails: "free.mp-ng-004.get-token-details",
    getSingleNftMinter: "free.mp-ng-004.get-single-nft-minter",
    mintSingleNft: "free.mp-ng-004.mint-single-nft",
    getAllTokensByAccount: "free.mp-ng-004.get-all-tokens-by-account",
    getCollectionCreator: "free.mp-ng-004.get-collection-creator",
    getCollectionId: "free.mp-ng-004.get-collection-id",
    getSingleNftMintPrice: "free.mp-ng-004.get-single-nft-mint-price",
    getSingleNftCreator: "free.mp-ng-004.get-single-nft-creator",
    getRoyaltyInfoSingleNft: "free.mp-ng-004.get-royalty-info-single-nft",
    uriIPFS: 'free.mp-ng-004.get-urisIPFS',
    marmaladeLedgerSale:
        `${DEFAULT_INSTANCE?.ns}.ledger.sale`,
    marmaladeLedgerOffer:
        `${DEFAULT_INSTANCE?.ns}.ledger.OFFER`,
    marmaladePolicyDutchAuctionSaleComputePrice:
        `${DEFAULT_INSTANCE?.ns}.policy-dutch-auction-sale.compute-price`,
    ledgerTransfer:
        `${DEFAULT_INSTANCE?.ns}.ledger.TRANSFER`,
    isAdmin: "free.mp-ng-004.IS_ADMIN",
    ledgerSale: `${DEFAULT_INSTANCE?.ns}.ledger.sale`,
    ledgerNoTimeout:
        `${DEFAULT_INSTANCE?.ns}.ledger.NO-TIMEOUT`,
};

const mainnetFunctions = {
    getLaunchCollectionFee: 'free.KMMMV2.get-fee "mint"',
    launchCollection: "free.KMMMV2.launch-collection",
    reserveToken: "free.KMMMV2.reserve-token",
    mintNft: "free.KMMMV2.MINT-NFT",
    getUnrevealedTokens: "free.KMMMV2.get-unrevealed-tokens-for-collection",
    checkPublic: "free.KMMMV2.check-public",
    checkWhitelist: "free.KMMMV2.check-whitelist",
    checkPresale: "free.KMMMV2.check-presale",
    getMintPrice: "free.KMMMV2.get-mint-price",
    getWlPrice: "free.KMMMV2.get-wl-price",
    getPresalePrice: "free.KMMMV2.get-presale-price",
    getRoyaltyInfo: "free.KMMMV2.get-royalty-info",
    bulkSyncWithNg: "free.KMMMV2.bulk-sync-with-ng",
    createAirdrop: "free.KMMMV2.create-airdrop",
    bulkAirdrop: "free.KMMMV2.bulk-airdrop",
    launchSingleNft: "free.KMMMV2.launch-single-nft",
    reserveSingleNft: "free.KMMMV2.reserve-single-nft",
    denyCollection: "free.KMMMV2.deny-collection",
    getTokenDetails: "free.KMMMV2.get-token-details",
    getSingleNftMinter: "free.KMMMV2.get-single-nft-minter",
    mintSingleNft: "free.KMMMV2.mint-single-nft",
    getAllTokensByAccount: "free.KMMMV2.get-all-tokens-by-account",
    getCollectionCreator: "free.KMMMV2.get-collection-creator",
    getCollectionId: "free.KMMMV2.get-collection-id",
    getSingleNftMintPrice: "free.KMMMV2.get-single-nft-mint-price",
    getSingleNftCreator: "free.KMMMV2.get-single-nft-creator",
    getRoyaltyInfoSingleNft: "free.KMMMV2.get-royalty-info-single-nft",
    uriIPFS: 'free.KMMMV2.get-urisIPFS',
    marmaladeLedgerSale:
        `${DEFAULT_INSTANCE?.ns}.ledger.sale`,
    marmaladeLedgerOffer:
        `${DEFAULT_INSTANCE?.ns}.ledger.OFFER`,
    marmaladePolicyDutchAuctionSaleComputePrice:
        `${DEFAULT_INSTANCE?.ns}.policy-dutch-auction-sale.compute-price`,
    ledgerTransfer:
        `${DEFAULT_INSTANCE?.ns}.ledger.TRANSFER`,
    isAdmin: "free.KMMMV2.IS_ADMIN",
    ledgerSale: `${DEFAULT_INSTANCE?.ns}.ledger.sale`,
    ledgerNoTimeout:
        `${DEFAULT_INSTANCE?.ns}.ledger.NO-TIMEOUT`,
};

const networkType = process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE || "testnet";

const marketplacePactFunctions =
    networkType === "mainnet" ? mainnetFunctions : testnetFunctions;

export default marketplacePactFunctions;
