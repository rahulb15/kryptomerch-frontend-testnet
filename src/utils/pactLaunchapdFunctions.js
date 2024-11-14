// pactFunctions.js

const testnetFunctions = {
    getCollectionLaunchFee: 'free.lptest003.get-collection-launch-fee',
    getPrimeRole: 'free.lptest003.get-prime-role',
    getDiscountRole: 'free.lptest003.get-discount-role',
    getCollectionDiscountFee: 'free.lptest003.get-collection-discount-fee',
    getCollectionCreator: 'free.lptest003.get-collection-creator',
    checkPublic: 'free.lptest003.check-public',
    checkWhitelist: 'free.lptest003.check-whitelist',
    checkPresale: 'free.lptest003.check-presale',
    getMintPrice: 'free.lptest003.get-mint-price',
    getWlPrice: 'free.lptest003.get-wl-price',
    getPresalePrice: 'free.lptest003.get-presale-price',
    getPriorityUsers: 'free.kmpasstest003.get-priority-users',
    getPassBalance: 'free.kmpasstest003.get-pass-balance',
    getPassClaim: 'free.lptest003.get-pass-claim',
    reserveToken: 'free.lptest003.reserve-token',
    nftCollectionRequest: 'free.lptest003.nft-collection-request',
    getTokenDetails: 'free.mp-ng-004.get-token-details',
    mintNftCapability: 'free.lptest003.MINT-NFT',
    uriIPFS: 'free.lptest003.get-urisIPFS',
};

const mainnetFunctions = {
    getCollectionLaunchFee: 'free.KMLPV2.get-collection-launch-fee',
    getPrimeRole: 'free.KMLPV2.get-prime-role',
    getDiscountRole: 'free.KMLPV2.get-discount-role',
    getCollectionDiscountFee: 'free.KMLPV2.get-collection-discount-fee',
    getCollectionCreator: 'free.KMLPV2.get-collection-creator',
    checkPublic: 'free.KMLPV2.check-public',
    checkWhitelist: 'free.KMLPV2.check-whitelist',
    checkPresale: 'free.KMLPV2.check-presale',
    getMintPrice: 'free.KMLPV2.get-mint-price',
    getWlPrice: 'free.KMLPV2.get-wl-price',
    getPresalePrice: 'free.KMLPV2.get-presale-price',
    getPriorityUsers: 'free.KMPPV2.get-priority-users',
    getPassBalance: 'free.KMPPV2.get-pass-balance',
    getPassClaim: 'free.KMLPV2.get-pass-claim',
    reserveToken: 'free.KMLPV2.reserve-token',
    nftCollectionRequest: 'free.KMLPV2.nft-collection-request',
    getTokenDetails: 'free.KMMMV2.get-token-details',
    mintNftCapability: 'free.KMLPV2.MINT-NFT',
    uriIPFS: 'free.KMLPV2.get-urisIPFS',
};

const networkType = process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE || 'testnet';

const pactFunctions = networkType === 'mainnet' ? mainnetFunctions : testnetFunctions;

export default pactFunctions;