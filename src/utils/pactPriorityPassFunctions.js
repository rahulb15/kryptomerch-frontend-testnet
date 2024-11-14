// priorityPassPactFunctions.js

const testnetFunctions = {
    getMintPrice: 'free.kmpasstest003.get-mint-price',
    createCollection: 'free.kmpasstest003.create-collection',
    getUnrevealedTokensForCollection: 'free.kmpasstest003.get-unrevealed-tokens-for-collection',
    reserveToken: 'free.kmpasstest003.reserve-token',
    isAdmin: 'free.kmpasstest003.IS_ADMIN',
    createCollectionCapability: 'free.kmpasstest003.CREATE-COLLECTION',
    mintPassCapability: 'free.kmpasstest003.MINT-PASS'
};

const mainnetFunctions = {
    getMintPrice: 'free.KMPPV2.get-mint-price',
    createCollection: 'free.KMPPV2.create-collection',
    getUnrevealedTokensForCollection: 'free.KMPPV2.get-unrevealed-tokens-for-collection',
    reserveToken: 'free.KMPPV2.reserve-token',
    isAdmin: 'free.KMPPV2.IS_ADMIN',
    createCollectionCapability: 'free.KMPPV2.CREATE-COLLECTION',
    mintPassCapability: 'free.KMPPV2.MINT-PASS'
};

const networkType = process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE || 'testnet';

const priorityPassPactFunctions = networkType === 'mainnet' ? mainnetFunctions : testnetFunctions;

export default priorityPassPactFunctions;