// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//     createClient,
//     Pact,
//     createSignWithChainweaver,
//     createEckoWalletQuicksign,
// } from "@kadena/client";
// import {
//     NETWORKID,
//     GAS_PRICE,
//     GAS_LIMIT,
//     creationTime,
//     CHAIN_ID,
//     NETWORK,
// } from "../constants/contextConstants";

// const API_HOST = NETWORK;
// const client = createClient(API_HOST);
// const signWithChainweaver = createSignWithChainweaver();
// const eckoWallet = createEckoWalletQuicksign();

// const admin = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";

// const signFunction = async (signedTx) => {
//     const transactionDescriptor = await client.submit(signedTx);
//     console.log("transactionDescriptor", transactionDescriptor);

//     const response = await client.listen(transactionDescriptor, {});
//     console.log("response", response);
//     return response;
// };

// const getFee = async () => {
//     const pactCode = `(free.mp-ng-004.get-fee "mint")`;

//     const transaction = Pact.builder
//         .execution(pactCode)
//         .setMeta({ chainId: CHAIN_ID })
//         .setNetworkId(NETWORKID)
//         .createTransaction();

//     const response = await client.local(transaction, {
//         preflight: false,
//         signatureVerification: false,
//     });

//     if (response.result.status === "success") {
//         let fee = response.result.data;
//         console.log(fee);
//         return fee;
//     }
// };

// export const marketplaceApi = createApi({
//     reducerPath: "marketplaceApi",
//     baseQuery: fetchBaseQuery({ baseUrl: API_HOST }),
//     endpoints: (builder) => ({
//         launchCollection: builder.mutation({
//             async queryFn(args) {
//                 const {
//                     collectionRequestName,
//                     collectionRequestSymbol,
//                     collectionRequestCreator,
//                     collectionRequestDescription,
//                     collectionRequestCategory,
//                     collectionRequestRoyalityPerc,
//                     collectionRequestRoyalityAddress,
//                     collectionRequestCoverImgUrl,
//                     collectionRequestBannerImgUrl,
//                     collectionRequestStartDate,
//                     collectionRequesEndDate,
//                     collectionRequestEnableAirdrop,
//                     collectionRequestPolicy,
//                     collectionRequestUriList,
//                     collectionRequestSupply,
//                     walletName
//                 } = args;
//                 console.log(args);

//                 const account = collectionRequestCreator;
//                 const publicKey = account.slice(2, account.length);
//                 const guard = { keys: [publicKey], pred: "keys-all" };

//                 const pactCode = `(free.mp-ng-004.launch-collection
//                     ${JSON.stringify(collectionRequestName)}
//                     ${JSON.stringify(collectionRequestSymbol)}
//                     ${JSON.stringify(account)}
//                     (read-keyset "guard")
//                     ${JSON.stringify(collectionRequestDescription)}
//                     ${JSON.stringify(collectionRequestCategory)}
//                     ${collectionRequestSupply}
//                     ${JSON.stringify(collectionRequestUriList)}
//                     1.0
//                     ${collectionRequestRoyalityPerc}
//                     ${JSON.stringify(collectionRequestRoyalityAddress)}
//                     ${JSON.stringify(collectionRequestCoverImgUrl)}
//                     ${JSON.stringify(collectionRequestBannerImgUrl)}
//                     ${JSON.stringify(collectionRequestStartDate)}
//                     (${collectionRequestStartDate})
//                     ${JSON.stringify(collectionRequesEndDate)}
//                     (${collectionRequesEndDate})
//                     ${collectionRequestEnableAirdrop}
//                     ${JSON.stringify(collectionRequestPolicy)}
//                 )`;
//                 console.log(pactCode);
//                 const txn = Pact.builder
//                     .execution(pactCode)
//                     .addData("guard", guard)
//                     .addSigner(publicKey)
//                     .setMeta({
//                         creationTime: creationTime(),
//                         sender: account,
//                         gasLimit: 150000,
//                         chainId: CHAIN_ID,
//                         ttl: 28800,
//                     })
//                     .setNetworkId(NETWORKID)
//                     .createTransaction();

//                 try {
//                     const localResponse = await client.local(txn, {
//                         preflight: false,
//                         signatureVerification: false,
//                     });

//                     if (localResponse.result.status === "success") {
//                         console.log("localResponse", localResponse);
//                         let signedTx;
//                         if (walletName === "Ecko Wallet") {
//                             console.log("Ecko Wallet");
//                             signedTx = await eckoWallet(txn);
//                         } else if (walletName === "Chainweaver") {
//                             signedTx = await signWithChainweaver(txn);
//                         }
//                         const response = await signFunction(signedTx);
//                         if (response.result.data === true) {
//                             console.log(`Collection: ${collectionRequestName} Requested Successfully`);
//                         }
//                         return { data: response };
//                     } else {
//                         return { error: localResponse.result.error };
//                     }
//                 } catch (error) {
//                     return { error: error.message };
//                 }
//             },
//         }),

//         reserveTokens: builder.mutation({
//             async queryFn(args) {
//                 const { reseveTknColName, reserverAcc, reserveTknAmount, wallet } = args;
//                 const fee = await getFee();
//                 const price = await checkPublicPrice(reseveTknColName);

//                 const account = reserverAcc;
//                 const creator = await getColCreator(reseveTknColName);
//                 const publicKey = account.slice(2, account.length);
//                 const guard = { keys: [publicKey], pred: "keys-all" };

//                 let mintPrice = reserveTknAmount * price;
//                 let mintFee = mintPrice * fee;

//                 const pactCode = `(free.mp-ng-004.reserve-token ${JSON.stringify(reseveTknColName)} ${JSON.stringify(account)} ${reserveTknAmount})`;

//                 let txn;
//                 if (account === creator) {
//                     txn = Pact.builder
//                         .execution(pactCode)
//                         .addData("guard", guard)
//                         .addSigner(publicKey, (withCapability) => [
//                             withCapability("coin.GAS"),
//                             withCapability("free.mp-ng-004.MINT-NFT", account),
//                             withCapability("coin.TRANSFER", account, admin, mintFee),
//                         ])
//                         .setMeta({
//                             creationTime: creationTime(),
//                             sender: account,
//                             gasLimit: 150000,
//                             chainId: CHAIN_ID,
//                             ttl: 28800,
//                         })
//                         .setNetworkId(NETWORKID)
//                         .createTransaction();
//                 } else {
//                     txn = Pact.builder
//                         .execution(pactCode)
//                         .addData("guard", guard)
//                         .addSigner(publicKey, (withCapability) => [
//                             withCapability("coin.GAS"),
//                             withCapability("free.mp-ng-004.MINT-NFT", account),
//                             withCapability("coin.TRANSFER", account, admin, mintFee),
//                             withCapability("coin.TRANSFER", account, creator, mintPrice),
//                         ])
//                         .setMeta({
//                             creationTime: creationTime(),
//                             sender: account,
//                             gasLimit: 150000,
//                             chainId: CHAIN_ID,
//                             ttl: 28800,
//                         })
//                         .setNetworkId(NETWORKID)
//                         .createTransaction();
//                 }

//                 try {
//                     const localResponse = await client.local(txn, {
//                         preflight: false,
//                         signatureVerification: false,
//                     });

//                     if (localResponse.result.status === "success") {
//                         let signedTx;
//                         if (wallet === "ecko") {
//                             signedTx = await eckoWallet(txn);
//                         } else if (wallet === "CW") {
//                             signedTx = await signWithChainweaver(txn);
//                         }
//                         const response = await signFunction(signedTx);
//                         return { data: response };
//                     } else {
//                         return { error: localResponse.result.error };
//                     }
//                 } catch (error) {
//                     return { error: error.message };
//                 }
//             },
//         }),

//     }),
// });

// export const {
//     useLaunchCollectionMutation,
//     useReserveTokensMutation,
// } = marketplaceApi;

// // Helper functions
// const checkPublicPrice = async (colName) => {
//     const pactCode = `(free.mp-ng-004.get-mint-price ${JSON.stringify(colName)})`;

//     const transaction = Pact.builder
//         .execution(pactCode)
//         .setMeta({ chainId: CHAIN_ID })
//         .setNetworkId(NETWORKID)
//         .createTransaction();

//     const response = await client.local(transaction, {
//         preflight: false,
//         signatureVerification: false,
//     });

//     if (response.result.status === "success") {
//         return response.result.data;
//     } else {
//         throw new Error("Failed to get public price");
//     }
// };

// const getColCreator = async (colName) => {
//     const pactCode = `(free.mp-ng-004.get-collection-creator ${JSON.stringify(colName)})`;

//     const transaction = Pact.builder
//         .execution(pactCode)
//         .setMeta({ chainId: CHAIN_ID })
//         .setNetworkId(NETWORKID)
//         .createTransaction();

//     const response = await client.local(transaction, {
//         preflight: false,
//         signatureVerification: false,
//     });

//     if (response.result.status === "success") {
//         return response.result.data;
//     } else {
//         throw new Error("Failed to get collection creator");
//     }
// };

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    createClient,
    Pact,
    createSignWithChainweaver,
    createEckoWalletQuicksign,
} from "@kadena/client";
import {
    NETWORKID,
    GAS_PRICE,
    GAS_LIMIT,
    creationTime,
    CHAIN_ID,
    NETWORK,
} from "../constants/contextConstants";
import marketplacePactFunctions from "@utils/pactMarketplaceFunctions";

const API_HOST = NETWORK;
const client = createClient(API_HOST);
const signWithChainweaver = createSignWithChainweaver();
const eckoWallet = createEckoWalletQuicksign();

// const admin =
//     "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";
const admin = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;


const signFunction = async (signedTx) => {
    const transactionDescriptor = await client.submit(signedTx);
    console.log("transactionDescriptor", transactionDescriptor);

    const response = await client.listen(transactionDescriptor, {});
    console.log("response", response);
    return response;
};

const coin_fungible = {
    refSpec: [{ name: "fungible-v2" }],
    refName: { name: "coin" },
};

const getFee = async () => {
    // const pactCode = `(free.mp-ng-004.get-fee "mint")`;
    // const pactCode = `(${
    //     pactFunctions.getCollectionCreator
    // } ${JSON.stringify(colName)})`;


    const pactCode = `(${marketplacePactFunctions.getLaunchCollectionFee})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        let fee = response.result.data;
        console.log(fee);
        return fee;
    }
};

export const marketplaceApi = createApi({
    reducerPath: "marketplaceApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_HOST }),
    endpoints: (builder) => ({
        // launchCollection: builder.mutation({
        //     async queryFn(args) {
        //         const {
        //             collectionRequestName,
        //             collectionRequestSymbol,
        //             collectionRequestCreator,
        //             collectionRequestDescription,
        //             collectionRequestCategory,
        //             collectionRequestMintPrice,
        //             collectionRequestRoyalityPerc,
        //             collectionRequestRoyalityAddress,
        //             collectionRequestCoverImgUrl,
        //             collectionRequestBannerImgUrl,
        //             collectionRequestStartDate,
        //             collectionRequesEndDate,
        //             collectionRequestEnableAirdrop,
        //             collectionRequestPolicy,
        //             collectionRequestUriList,
        //             collectionRequestSupply,
        //             walletName,
        //         } = args;
        //         console.log(walletName);


        //         let decimalPrice;
        //         const calculateDecimal = (price) => {
        //           const priceString = price.toString();
        //           const priceArray = priceString.split(".");
        //           if (priceArray.length === 1) {
        //             decimalPrice = `${priceArray[0]}.0`;
        //           } else {
        //             decimalPrice = priceString;
        //           }
        //         };
        //         calculateDecimal(collectionRequestMintPrice);
        //         console.log("decimalPrice", decimalPrice);


        //         let royalityPercentage;
        //         const calculateRoyalityPercentage = (royality) => {
        //             royalityPercentage = royality / 100;
        //         };
        //         calculateRoyalityPercentage(collectionRequestRoyalityPerc);


        //         const account = collectionRequestCreator;
        //         const publicKey = account.slice(2, account.length);
        //         const guard = { keys: [publicKey], pred: "keys-all" };

        //         // const pactCode = `(free.mp-ng-004.launch-collection
        //         const pactCode = `(${marketplacePactFunctions.launchCollection}
        //             ${JSON.stringify(collectionRequestName)}  
        //             ${JSON.stringify(collectionRequestSymbol)}  
        //             ${JSON.stringify(account)}        
        //             (read-keyset "guard")
        //             ${JSON.stringify(collectionRequestDescription)}
        //             ${JSON.stringify(collectionRequestCategory)}
        //             ${collectionRequestSupply}
        //             ${JSON.stringify(collectionRequestUriList)}
        //             ${decimalPrice}
        //             ${royalityPercentage}
        //             ${JSON.stringify(collectionRequestRoyalityAddress)}
        //             ${JSON.stringify(collectionRequestCoverImgUrl)}
        //             ${JSON.stringify(collectionRequestBannerImgUrl)}
        //             ${JSON.stringify(collectionRequestStartDate)}
        //             (${collectionRequestStartDate})
        //             ${JSON.stringify(collectionRequesEndDate)}       
        //             (${collectionRequesEndDate})
        //             ${collectionRequestEnableAirdrop} 
        //             ${JSON.stringify(collectionRequestPolicy)}
        //         )`;

        //         const txn = Pact.builder
        //             .execution(pactCode)
        //             .addData("guard", guard)
        //             .addSigner(publicKey)
        //             .setMeta({
        //                 creationTime: creationTime(),
        //                 sender: account,
        //                 gasLimit: 150000,
        //                 chainId: CHAIN_ID,
        //                 ttl: 28800,
        //             })
        //             .setNetworkId(NETWORKID)
        //             .createTransaction();

        //         try {
        //             const localResponse = await client.local(txn, {
        //                 preflight: false,
        //                 signatureVerification: false,
        //             });

        //             if (localResponse.result.status === "success") {
        //                 let signedTx;
        //                 if (walletName === "Ecko Wallet") {
        //                     console.log("Ecko Wallet");
        //                     signedTx = await eckoWallet(txn);
        //                 } else if (walletName === "Chainweaver") {
        //                     console.log("Chainweaver");
        //                     signedTx = await signWithChainweaver(txn);
        //                 }
        //                 const response = await signFunction(signedTx);
        //                 return { data: response };
        //             } else {
        //                 return { error: localResponse.result.error };
        //             }
        //         } catch (error) {
        //             return { error: error.message };
        //         }
        //     },
        // }),

        launchCollection: builder.mutation({
            async queryFn(args) {
                const {
                    collectionRequestName,
                    collectionRequestSymbol,
                    collectionRequestCreator,
                    collectionRequestDescription,
                    collectionRequestCategory,
                    collectionRequestMintPrice,
                    collectionRequestRoyalityPerc,
                    collectionRequestRoyalityAddress,
                    collectionRequestCoverImgUrl,
                    collectionRequestBannerImgUrl,
                    collectionRequestStartDate,
                    collectionRequesEndDate,
                    collectionRequestEnableAirdrop,
                    collectionRequestPolicy,
                    collectionRequestUriList,
                    collectionRequestSupply,
                    walletName,
                } = args;
                console.log(walletName);


                let decimalPrice;
                const calculateDecimal = (price) => {
                  const priceString = price.toString();
                  const priceArray = priceString.split(".");
                  if (priceArray.length === 1) {
                    decimalPrice = `${priceArray[0]}.0`;
                  } else {
                    decimalPrice = priceString;
                  }
                };
                calculateDecimal(collectionRequestMintPrice);
                console.log("decimalPrice", decimalPrice);


                let royalityPercentage;
                const calculateRoyalityPercentage = (royality) => {
                    royalityPercentage = royality / 100;
                };
                calculateRoyalityPercentage(collectionRequestRoyalityPerc);


                const account = collectionRequestCreator;
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                // const pactCode = `(free.mp-ng-004.launch-collection
                const pactCode = `(${marketplacePactFunctions.launchCollection}
                    ${JSON.stringify(collectionRequestName)}  
                    ${JSON.stringify(collectionRequestSymbol)}  
                    ${JSON.stringify(account)}        
                    (read-keyset "guard")
                    ${JSON.stringify(collectionRequestDescription)}
                    ${JSON.stringify(collectionRequestCategory)}
                    ${collectionRequestSupply}
                    ${JSON.stringify(collectionRequestUriList)}
                    ${decimalPrice}
                    ${royalityPercentage}
                    ${JSON.stringify(collectionRequestRoyalityAddress)}
                    ${JSON.stringify(collectionRequestCoverImgUrl)}
                    ${JSON.stringify(collectionRequestBannerImgUrl)}
                    ${JSON.stringify(collectionRequestStartDate)}
                    (${collectionRequestStartDate})
                    ${JSON.stringify(collectionRequesEndDate)}       
                    (${collectionRequesEndDate})
                    ${collectionRequestEnableAirdrop} 
                    ${JSON.stringify(collectionRequestPolicy)}
                )`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .addData("guard", guard)
                    .addSigner(publicKey)
                    .setMeta({
                        creationTime: creationTime(),
                        sender: account,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            console.log("Ecko Wallet");
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
                            console.log("Chainweaver");
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        marketReserveTokens: builder.mutation({
            async queryFn(args) {
                const {
                    reseveTknColName,
                    reserverAcc,
                    reserveTknAmount,
                    walletName,
                } = args;
                console.log(args);
                const fee = await getFee();
                const price = await checkPublicPrice(reseveTknColName);

                const account = reserverAcc;
                const creator = await getColCreator(reseveTknColName);
                console.log(creator);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                let mintPrice = reserveTknAmount * price;
                let mintFee = mintPrice * fee;

                // const pactCode = `(free.mp-ng-004.reserve-token ${JSON.stringify(
                //     reseveTknColName
                // )} ${JSON.stringify(account)} ${reserveTknAmount})`;
                const pactCode = `(${marketplacePactFunctions.reserveToken} ${JSON.stringify(
                    reseveTknColName
                )} ${JSON.stringify(account)} ${reserveTknAmount})`;


                let txn;
                if (account === creator) {
                    console.log("Creator");
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            // withCapability("free.mp-ng-004.MINT-NFT", account),
                            withCapability(`${marketplacePactFunctions.mintNft}`, account),
                            withCapability(
                                "coin.TRANSFER",
                                account,
                                admin,
                                mintFee
                            ),
                        ])
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                } else {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            // withCapability("free.mp-ng-004.MINT-NFT", account),
                            withCapability(`${marketplacePactFunctions.mintNft}`, account),
                            withCapability(
                                "coin.TRANSFER",
                                account,
                                admin,
                                mintFee
                            ),
                            withCapability(
                                "coin.TRANSFER",
                                account,
                                creator,
                                mintPrice
                            ),
                        ])
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                }

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });
                    console.log(localResponse.result);

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            console.log("Ecko Wallet");
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        unrevealedTokens: builder.mutation({
            async queryFn(args) {
                const { unrevealedColName, wallet } = args;
                console.log(unrevealedColName);
                const account = await getColCreator(unrevealedColName);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                // const pactCode = `(free.mp-ng-004.get-unrevealed-tokens-for-collection ${JSON.stringify(
                //     unrevealedColName
                // )} (read-keyset  "guard"))`;
                const pactCode = `(${marketplacePactFunctions.getUnrevealedTokens} ${JSON.stringify(
                    unrevealedColName
                )} (read-keyset  "guard"))`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .addData("guard", guard)
                    .addSigner(publicKey, (withCapability) => [
                        withCapability("coin.GAS"),
                    ])
                    .setMeta({
                        creationTime: creationTime(),
                        sender: account,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        console.log(localResponse.result.data);
                        return { data: localResponse.result.data };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),
        // checkMarketPublic: builder.mutation({
        //     async queryFn(args) {
        //         const { colName } = args;
        //         console.log(args);
        //         const pactCode = `(free.mp-ng-004.check-public ${JSON.stringify(
        //             colName
        //         )})`;

        //         const transaction = Pact.builder
        //             .execution(pactCode)
        //             .setMeta({ chainId: "1" })
        //             .createTransaction();

        //         const response = await client.local(transaction, {
        //             preflight: false,
        //             signatureVerification: false,
        //         });

        //         if (response.result.status === "success") {
        //             return { data: response.result.data };
        //         } else {
        //             return { error: response.result.error };
        //         }
        //     },
        // }),
        // checkMarketPublicPrice: builder.mutation({
        //     async queryFn(args) {
        //         const { colName } = args;
        //         console.log(args);
        //         const pactCode = `(free.mp-ng-004.get-mint-price ${JSON.stringify(
        //             colName
        //         )})`;

        //         const transaction = Pact.builder
        //             .execution(pactCode)
        //             .setMeta({ chainId: "1" })
        //             .createTransaction();

        //         const response = await client.local(transaction, {
        //             preflight: false,
        //             signatureVerification: false,
        //         });

        //         if (response.result.status === "success") {
        //             return { data: response.result.data };
        //         } else {
        //             return { error: response.result.error };
        //         }
        //     },
        // }),

        checkMarketPublic: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                // const pactCode = `(free.mp-ng-004.check-public ${JSON.stringify(colName)})`;
                const pactCode = `(${marketplacePactFunctions.checkPublic} ${JSON.stringify(colName)})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        checkMarketWl: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                // const pactCode = `(free.mp-ng-004.check-whitelist ${JSON.stringify(colName)})`;
                const pactCode = `(${marketplacePactFunctions.checkWhitelist} ${JSON.stringify(colName)})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        checkMarketPresale: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                // const pactCode = `(free.mp-ng-004.check-presale ${JSON.stringify(colName)})`;
                const pactCode = `(${marketplacePactFunctions.checkPresale} ${JSON.stringify(colName)})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        checkMarketPublicPrice: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                // const pactCode = `(free.mp-ng-004.get-mint-price ${JSON.stringify(colName)})`;
                const pactCode = `(${marketplacePactFunctions.getMintPrice} ${JSON.stringify(colName)})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        checkMarketWlPrice: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                // const pactCode = `(free.mp-ng-004.get-wl-price ${JSON.stringify(colName)})`;
                const pactCode = `(${marketplacePactFunctions.getWlPrice} ${JSON.stringify(colName)})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        checkMarketPresalePrice: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                // const pactCode = `(free.mp-ng-004.get-presale-price ${JSON.stringify(colName)})`;
                const pactCode = `(${marketplacePactFunctions.getPresalePrice} ${JSON.stringify(colName)})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),
    //     marketReserveTokens: builder.mutation({
    //         async queryFn(args, api, extraOptions, baseQuery) {
    //             const {
    //                 reseveTknColName,
    //                 reserverAcc,
    //                 reserveTknAmount,
    //                 walletName,
    //                 wcClient,
    //                 wcSession,
    //             } = args;
    //             console.log(args);

    //             const chkPublic = await api.dispatch(
    //                 marketplaceApi.endpoints.checkMarketPublic.initiate({
    //                     colName: reseveTknColName,
    //                 })
    //             ).unwrap();
    //             console.log("chkPublic", chkPublic);

    //             const chkWl = await api.dispatch(
    //                 marketplaceApi.endpoints.checkMarketWl.initiate({
    //                     colName: reseveTknColName,
    //                 })
    //             ).unwrap();
    //             console.log("chkWl", chkWl);

    //             const chkPresale = await api.dispatch(
    //                 marketplaceApi.endpoints.checkMarketPresale.initiate({
    //                     colName: reseveTknColName,
    //                 })
    //             ).unwrap();
    //             console.log("chkPresale", chkPresale);

    //             let price;
    //             if (chkPresale) {
    //                 price = await api.dispatch(
    //                     marketplaceApi.endpoints.checkMarketPresalePrice.initiate({
    //                         colName: reseveTknColName,
    //                     })
    //                 ).unwrap();
    //             } else if (chkWl) {
    //                 price = await api.dispatch(
    //                     marketplaceApi.endpoints.checkMarketWlPrice.initiate({
    //                         colName: reseveTknColName,
    //                     })
    //                 ).unwrap();
    //             } else if (chkPublic) {
    //                 price = await api.dispatch(
    //                     marketplaceApi.endpoints.checkMarketPublicPrice.initiate({
    //                         colName: reseveTknColName,
    //                     })
    //                 ).unwrap();
    //             } else {
    //                 throw new Error("Sale is not live");
    //             }

    //             console.log("Determined price:", price);

    //             const account = reserverAcc;
    //             const creator = await api.dispatch(
    //                 marketplaceApi.endpoints.getColCreator.initiate({
    //                     colName: reseveTknColName,
    //                 })
    //             ).unwrap();
    //             console.log("creator", creator);

    //             const publicKey = account.slice(2, account.length);
    //             const guard = { keys: [publicKey], pred: "keys-all" };

    //             let mintPrice = reserveTknAmount * price;

    //             const pactCode = `(free.mp-ng-004.reserve-token ${JSON.stringify(reseveTknColName)} ${JSON.stringify(account)} ${reserveTknAmount})`;

    //             let txn;
    //             if (account === creator) {
    //                 txn = Pact.builder
    //                     .execution(pactCode)
    //                     .addData("guard", guard)
    //                     .addSigner(publicKey, (withCapability) => [
    //                         withCapability("coin.GAS"),
    //                         withCapability("free.mp-ng-004.MINT-NFT", account),
    //                     ])
    //                     .setMeta({
    //                         creationTime: creationTime(),
    //                         sender: account,
    //                         gasLimit: 150000,
    //                         chainId: CHAIN_ID,
    //                         ttl: 28800,
    //                     })
    //                     .setNetworkId(NETWORKID)
    //                     .createTransaction();
    //             } else {
    //                 txn = Pact.builder
    //                 .execution(pactCode)
    //                 .addData("guard", guard)
    //                 .addSigner(publicKey, (withCapability) => [
    //                     withCapability("coin.GAS"),
    //                     withCapability("free.mp-ng-004.MINT-NFT", account),
    //                     withCapability(
    //                         "coin.TRANSFER",
    //                         account,
    //                         creator,
    //                         mintPrice
    //                     ),
    //                 ])
    //                 .setMeta({
    //                     creationTime: creationTime(),
    //                     sender: account,
    //                     gasLimit: 150000,
    //                     chainId: CHAIN_ID,
    //                     ttl: 28800,
    //                 })
    //                 .setNetworkId(NETWORKID)
    //                 .createTransaction();
    //         }

    //         console.log("transaction", txn);

    //         try {
    //             const localResponse = await client.local(txn, {
    //                 preflight: false,
    //                 signatureVerification: false,
    //             });

    //             if (localResponse.result.status === "success") {
    //                 let signedTx;
    //                 if (walletName === "Ecko Wallet") {
    //                     signedTx = await eckoWallet(txn);
    //                 } else if (walletName === "Chainweaver") {
    //                     signedTx = await signWithChainweaver(txn);
    //                 } else if (walletName === "WalletConnect") {
    //                     if (wcClient && wcSession) {
    //                         const signWithWalletConnect = createWalletConnectSign(
    //                             wcClient,
    //                             wcSession,
    //                             "kadena:testnet04"
    //                         );
    //                         signedTx = await signWithWalletConnect(txn);
    //                     } else {
    //                         return { error: "WalletConnect not initialized" };
    //                     }
    //                 }
                    
    //                 const response = await signFunction(signedTx);
    //                 return { data: response };
    //             } else {
    //                 return { error: localResponse.result.error };
    //             }
    //         } catch (error) {
    //             return { error: error.message };
    //         }
    //     },
    // }),

        getRoyaltyAddress: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                // const pactCode = `(free.mp-ng-004.get-royalty-info ${JSON.stringify(
                //     colName
                // )} "account")`;
                const pactCode = `(${marketplacePactFunctions.getRoyaltyInfo} ${JSON.stringify(
                    colName
                )} "account")`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const response = await client.local(transaction, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (response.result.status === "success") {
                        return { data: response.result.data };
                    } else {
                        return { error: response.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        getRoyaltyPerc: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                // const pactCode = `(free.mp-ng-004.get-royalty-info ${JSON.stringify(
                //     colName
                // )} "rate")`;
                const pactCode = `(${marketplacePactFunctions.getRoyaltyInfo} ${JSON.stringify(
                    colName
                )} "rate")`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const response = await client.local(transaction, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (response.result.status === "success") {
                        return { data: response.result.data };
                    } else {
                        return { error: response.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        syncWithNg: builder.mutation({
            async queryFn(args) {
                const { syncColName, syncTkns, walletName } = args;
                console.log(args);

                const colId = await collectionId(syncColName);
                const account = await getColCreator(syncColName);

                const royaltyAddress = await getRoyaltyAddress({
                    colName: syncColName,
                });
                const royaltyPerc = await getRoyaltyPerc({
                    colName: syncColName,
                });

                const publicKey = account.slice(2, account.length);
                const publicKeyRoyalty = royaltyAddress.slice(
                    2,
                    royaltyAddress.length
                );

                const guard = { keys: [publicKey], pred: "keys-all" };
                const guardRoyalty = {
                    keys: [publicKeyRoyalty],
                    pred: "keys-all",
                };
                const formattedSyncTkns = `[${syncTkns}]`;

                // const pactCode = `(free.mp-ng-004.bulk-sync-with-ng ${JSON.stringify(
                //     syncColName
                // )} ${formattedSyncTkns} )`;
                const pactCode = `(${marketplacePactFunctions.bulkSyncWithNg} ${JSON.stringify(
                    syncColName
                )} ${formattedSyncTkns} )`;

                let txn;
                console.log(royaltyAddress, royaltyPerc);
                console.log(royaltyPerc > 0.0 && royaltyPerc <= 1.0);

                if (
                    royaltyAddress !== "" &&
                    royaltyPerc > 0.0 &&
                    royaltyPerc <= 1.0
                ) {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addData("marmalade_collection", { id: colId })
                        .addData("marmalade_royalty", {
                            creator_acct: royaltyAddress,
                            creator_guard: guardRoyalty,
                            rate: royaltyPerc,
                            currencies: [coin_fungible],
                        })
                        .addSigner(publicKey)
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                } else {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addData("marmalade_collection", { id: colId })
                        .addSigner(publicKey)
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                }

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });
                    console.log(localResponse.result);

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            console.log("Ecko Wallet");
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        createAirdrop: builder.mutation({
            async queryFn(args) {
                const { createAirdropCol, accounts, wallet } = args;
                const account = await getColCreator(createAirdropCol);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                // const pactCode = `(free.mp-ng-004.create-airdrop  
                //     ${JSON.stringify(createAirdropCol)} 
                //     (read-keyset  "guard") 
                //     ${JSON.stringify(accounts)} )`;
                const pactCode = `(${marketplacePactFunctions.createAirdrop}
                    ${JSON.stringify(createAirdropCol)}
                    (read-keyset  "guard")
                    ${JSON.stringify(accounts)} )`;


                const txn = Pact.builder
                    .execution(pactCode)
                    .addData("guard", guard)
                    .addSigner(publicKey, (withCapability) => [
                        withCapability("coin.GAS"),
                    ])
                    .setMeta({
                        creationTime: creationTime(),
                        sender: account,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (wallet === "ecko") {
                            signedTx = await eckoWallet(txn);
                        } else if (wallet === "CW") {
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        airdropNft: builder.mutation({
            async queryFn(args) {
                const { airdropCol, tokens, wallet } = args;
                const account = await getColCreator(airdropCol);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                // const pactCode = `(free.mp-ng-004.bulk-airdrop ${JSON.stringify(
                //     airdropCol
                // )} 
                //     ${JSON.stringify(tokens)} 
                //     ${JSON.stringify(account)} 
                //     (read-keyset  "guard"))`;
                const pactCode = `(${marketplacePactFunctions.bulkAirdrop} ${JSON.stringify(
                    airdropCol
                )}
                    ${JSON.stringify(tokens)}
                    ${JSON.stringify(account)}
                    (read-keyset  "guard"))`;


                const txnBuilder = Pact.builder
                    .execution(pactCode)
                    .addData("guard", guard)
                    .addSigner(publicKey, (withCapability) => [
                        withCapability("coin.GAS"),
                    ])
                    .setMeta({
                        creationTime: creationTime(),
                        sender: account,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .setNetworkId(NETWORKID);

                // Adding signer with all required capabilities for each token
                tokens.forEach((item) => {
                    txnBuilder.addSigner(publicKey, (withCapability) => [
                        withCapability(
                            // `n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.TRANSFER`,
                            marketplacePactFunctions.ledgerTransfer,
                            item["token-id"],
                            account,
                            item["account"],
                            1.0
                        ),
                    ]);
                });

                const txn = txnBuilder.createTransaction();

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (wallet === "ecko") {
                            signedTx = await eckoWallet(txn);
                        } else if (wallet === "CW") {
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),
        launchSingleNft: builder.mutation({
            async queryFn(args) {
                const {
                    account,
                    royaltyAccount,
                    nftName,
                    nftUri,
                    nftPolicy,
                    nftPrice,
                    royaltyPerc,
                    walletName,
                } = args;
                console.log(args);

                let decimalPrice;
                const calculateDecimal = (price) => {
                  const priceString = price.toString();
                  const priceArray = priceString.split(".");
                  if (priceArray.length === 1) {
                    decimalPrice = `${priceArray[0]}.0`;
                  } else {
                    decimalPrice = priceString;
                  }
                };
                calculateDecimal(nftPrice);
                console.log("decimalPrice", decimalPrice);


                let royalityPercentage;
                const calculateRoyalityPercentage = (royality) => {
                    royalityPercentage = royality / 100;
                };
                calculateRoyalityPercentage(royaltyPerc);


                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                // const pactCode = `(free.mp-ng-004.launch-single-nft
                const pactCode = `(${marketplacePactFunctions.launchSingleNft}
                    ${JSON.stringify(account)}
                    (read-keyset "guard")
                    ${JSON.stringify(nftName)}
                    ${JSON.stringify(nftUri)}
                    ${JSON.stringify(nftPolicy)}
                    ${decimalPrice}
                    ${royalityPercentage}
                    ${JSON.stringify(royaltyAccount)})`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .addData("guard", guard)
                    .addSigner(publicKey, (withCapability) => [
                        withCapability("coin.GAS"),
                    ])
                    .setMeta({
                        creationTime: creationTime(),
                        sender: account,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        reserveSingleNft: builder.mutation({
            async queryFn(args) {
                const { nftName, reserverAcc, walletName } = args;
                console.log(args);

                const fee = await getFee();
                const price = await checkSingleNftPrice(nftName);

                const account = reserverAcc;
                const creator = await getSingleNftCreator(nftName);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                let mintFee = price * fee;

                // const pactCode = `(free.mp-ng-004.reserve-single-nft ${JSON.stringify(
                //     account
                // )} (read-keyset "guard") ${JSON.stringify(nftName)})`;
                const pactCode = `(${marketplacePactFunctions.reserveSingleNft} ${JSON.stringify(
                    account
                )} (read-keyset "guard") ${JSON.stringify(nftName)})`;

                let txn;
                if (account === creator) {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability(
                                "coin.TRANSFER",
                                account,
                                admin,
                                mintFee
                            ),
                        ])
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                } else {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability(
                                "coin.TRANSFER",
                                account,
                                admin,
                                mintFee
                            ),
                            withCapability(
                                "coin.TRANSFER",
                                account,
                                creator,
                                price
                            ),
                        ])
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                }

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),
        denyCollection: builder.mutation({
            async queryFn(args) {
                const { launchCollectionName, walletName } = args;
                const account = admin;
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                // const pactCode = `(free.mp-ng-004.deny-collection ${JSON.stringify(
                //     launchCollectionName
                // )})`;
                const pactCode = `(${marketplacePactFunctions.denyCollection} ${JSON.stringify(
                    launchCollectionName
                )})`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .addData("guard", guard)
                    .addSigner(publicKey, (withCapability) => [
                        withCapability("coin.GAS"),
                        // withCapability("free.mp-ng-004.IS_ADMIN"),
                        withCapability(marketplacePactFunctions.isAdmin),
                    ])
                    .setMeta({
                        creationTime: creationTime(),
                        sender: account,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        getTokenDetails: builder.query({
            async queryFn(args) {
                const { account } = args;
                // const pactCode = `(free.mp-ng-004.get-token-details ${JSON.stringify(
                //     account
                // )})`;
                const pactCode = `(${marketplacePactFunctions.getTokenDetails} ${JSON.stringify(
                    account
                )})`;
                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({
                        creationTime: creationTime(),
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .createTransaction();

                try {
                    const response = await client.local(transaction, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (response.result.status === "success") {
                        return { data: response.result.data };
                    } else {
                        return { error: response.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        saleFunction: builder.mutation({
            async queryFn(args) {
                const { saleOwner, saleTokenId, buyNowPrice, walletName } =
                    args;
                const publicKey = saleOwner.slice(2, saleOwner.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                // const pactCode = `(n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.sale ${JSON.stringify(
                //     saleTokenId
                // )} ${JSON.stringify(
                //     saleOwner
                // )} 1.0 n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.NO-TIMEOUT )`;
                const pactCode = `(${marketplacePactFunctions.ledgerSale} ${JSON.stringify(
                    saleTokenId
                )} ${JSON.stringify(
                    saleOwner
                )} 1.0 ${marketplacePactFunctions.ledgerNoTimeout} )`;


                const txn = Pact.builder
                    .execution(pactCode)
                    .setMeta({
                        creationTime: creationTime(),
                        sender: saleOwner,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .addData("marmalade_marketplace", {
                        "marketplace-name": "Kryptomerch.io",
                        "marketplace-account": admin,
                        "shared-rate": 0.0,
                        currency: coin_fungible,
                        "min-fee": 1.0,
                        "fee-rate": 0.1,
                        "max-fee": 10000.0,
                    })
                    .addData("marmalade_sale", {
                        sale_type: "fixed",
                        currency: coin_fungible,
                    })
                    .addData("marmalade_fixed_quote", {
                        recipient: saleOwner,
                        price: buyNowPrice,
                    })
                    .addSigner(publicKey, (withCapability) => [
                        withCapability("coin.GAS"),
                    ])
                    .addSigner(publicKey, (withCapability) => [
                        withCapability(
                            // "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.OFFER",
                            marketplacePactFunctions.marmaladeLedgerOffer,
                            saleTokenId,
                            saleOwner,
                            1.0
                        ),
                    ])
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        getMinter: builder.query({
            async queryFn(args) {
                const { nftName } = args;
                // const pactCode = `(free.mp-ng-004.get-single-nft-minter ${JSON.stringify(
                //     nftName
                // )})`;
                const pactCode = `(${marketplacePactFunctions.getSingleNftMinter} ${JSON.stringify(
                    nftName
                )})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const response = await client.local(transaction, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (response.result.status === "success") {
                        return { data: response.result.data };
                    } else {
                        return { error: response.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        syncSingleNft: builder.mutation({
            async queryFn(args) {
                const { singleNftName, account, walletName } = args;
                console.log(args);
                const royaltyAddress = await getRoyaltyAddressSingleNft(
                    singleNftName
                );
                const royaltyPerc = await getRoyaltyPercSingleNft(
                    singleNftName
                );

                const publicKey = account.slice(2, account.length);
                const publicKeyRoyalty = royaltyAddress.slice(
                    2,
                    royaltyAddress.length
                );

                const guard = { keys: [publicKey], pred: "keys-all" };
                const guardRoyalty = {
                    keys: [publicKeyRoyalty],
                    pred: "keys-all",
                };

                // const pactCode = `(free.mp-ng-004.mint-single-nft ${JSON.stringify(
                //     account
                // )} (read-keyset "guard") ${JSON.stringify(singleNftName)} )`;
                const pactCode = `(${marketplacePactFunctions.mintSingleNft} ${JSON.stringify(
                    account
                )} (read-keyset "guard") ${JSON.stringify(singleNftName)} )`;


                let txnBuilder = Pact.builder
                    .execution(pactCode)
                    .addData("guard", guard)
                    .addSigner(publicKey)
                    .setMeta({
                        creationTime: creationTime(),
                        sender: account,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .setNetworkId(NETWORKID);

                if (
                    royaltyAddress !== "" &&
                    royaltyPerc > 0.0 &&
                    royaltyPerc <= 1.0
                ) {
                    txnBuilder = txnBuilder.addData("marmalade_royalty", {
                        creator_acct: royaltyAddress,
                        creator_guard: guardRoyalty,
                        rate: royaltyPerc,
                        currencies: [coin_fungible],
                    });
                }

                const txn = txnBuilder.createTransaction();

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        getTokensOwned: builder.query({
            async queryFn(args) {
                const { account } = args;
                // const pactCode = `(free.mp-ng-004.get-all-tokens-by-account ${JSON.stringify(
                //     account
                // )})`;
                const pactCode = `(${marketplacePactFunctions.getAllTokensByAccount} ${JSON.stringify(
                    account
                )})`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .setMeta({
                        creationTime: creationTime(),
                        sender: account,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let tokens = localResponse.result.data.flatMap(
                            (item) => item.tokens
                        );
                        return { data: tokens };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),
        getDutchPrice: builder.query({
            query: (saleId) => {
                console.log("getDutchPrice query called with saleId:", saleId);
                return { url: `/local`, method: 'POST', body: { 
                    // pactCode: `(n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-dutch-auction-sale.compute-price "${saleId}")`,
                    pactCode: `(${marketplacePactFunctions.marmaladePolicyDutchAuctionSaleComputePrice} "${saleId}")`,
                    meta: { chainId: CHAIN_ID },
                    networkId: NETWORKID
                }};
            },
            transformResponse: (response) => {
                console.log("getDutchPrice response:", response);
                if (response.result.status === "success") {
                    return response.result.data;
                } else {
                    throw new Error(response.result.error);
                }
            },
            async onQueryStarted(saleId, { queryFulfilled }) {
                console.log("getDutchPrice query started for saleId:", saleId);
                try {
                    const { data } = await queryFulfilled;
                    console.log("getDutchPrice query fulfilled with data:", data);
                } catch (err) {
                    console.error("getDutchPrice query failed:", err);
                }
            },
        }),

    }),
});

export const {
    useLaunchCollectionMutation,
    useMarketReserveTokensMutation,
    useUnrevealedTokensMutation,
    useCheckMarketPublicMutation,
    useCheckMarketWlMutation,
    useCheckMarketPresaleMutation,
    useCheckMarketPublicPriceMutation,
    useCheckMarketWlPriceMutation,
    useCheckMarketPresalePriceMutation,
    useGetRoyaltyAddressMutation,
    useGetRoyaltyPercMutation,
    useSyncWithNgMutation,
    useCreateAirdropMutation,
    useAirdropNftMutation,
    useLaunchSingleNftMutation,
    useReserveSingleNftMutation,
    useDenyCollectionMutation,
    useGetTokenDetailsQuery,
    useSaleFunctionMutation,
    useGetMinterQuery,
    useSyncSingleNftMutation,
    useGetTokensOwnedQuery,
    useGetDutchPriceQuery,
} = marketplaceApi;

// Helper functions
const checkPublicPrice = async (colName) => {
    // const pactCode = `(free.mp-ng-004.get-mint-price ${JSON.stringify(
    //     colName
    // )})`;
    const pactCode = `(${marketplacePactFunctions.getMintPrice} ${JSON.stringify(
        colName
    )})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get public price");
    }
};

const getColCreator = async (colName) => {
    // const pactCode = `(free.mp-ng-004.get-collection-creator ${JSON.stringify(
    //     colName
    // )})`;

    const pactCode = `(${marketplacePactFunctions.getCollectionCreator} ${JSON.stringify(
        colName
    )})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get collection creator");
    }
};

const getRoyaltyAddress = async ({ colName }) => {
    // const pactCode = `(free.mp-ng-004.get-royalty-info ${JSON.stringify(
    //     colName
    // )} "account")`;
    const pactCode = `(${marketplacePactFunctions.getRoyaltyInfo} ${JSON.stringify(
        colName
    )} "account")`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get royalty address");
    }
};

const getRoyaltyPerc = async ({ colName }) => {
    // const pactCode = `(free.mp-ng-004.get-royalty-info ${JSON.stringify(
    //     colName
    // )} "rate")`;
    const pactCode = `(${marketplacePactFunctions.getRoyaltyInfo} ${JSON.stringify(
        colName
    )} "rate")`;


    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get royalty percentage");
    }
};

const collectionId = async (colNameId) => {
    // const pactCode = `(free.mp-ng-004.get-collection-id ${JSON.stringify(
    //     colNameId
    // )})`;
    const pactCode = `(${marketplacePactFunctions.getCollectionId} ${JSON.stringify(
        colNameId
    )})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        let colId = response.result.data;
        return colId;
    } else {
        throw new Error("Failed to get collection ID");
    }
};

const checkSingleNftPrice = async (nftName) => {
    // const pactCode = `(free.mp-ng-004.get-single-nft-mint-price ${JSON.stringify(
    //     nftName
    // )})`;
    const pactCode = `(${marketplacePactFunctions.getSingleNftMintPrice} ${JSON.stringify(
        nftName
    )})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get single NFT price");
    }
};

const getSingleNftCreator = async (nftName) => {
    // const pactCode = `(free.mp-ng-004.get-single-nft-creator ${JSON.stringify(
    //     nftName
    // )})`;
    const pactCode = `(${marketplacePactFunctions.getSingleNftCreator} ${JSON.stringify(
        nftName
    )})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get single NFT creator");
    }
};

const getRoyaltyAddressSingleNft = async (nftName) => {
    // const pactCode = `(free.mp-ng-004.get-royalty-info-single-nft ${JSON.stringify(
    //     nftName
    // )} "account")`;
    const pactCode = `(${marketplacePactFunctions.getRoyaltyInfoSingleNft} ${JSON.stringify(
        nftName
    )} "account")`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get single NFT royalty address");
    }
};

const getRoyaltyPercSingleNft = async (nftName) => {
    // const pactCode = `(free.mp-ng-004.get-royalty-info-single-nft ${JSON.stringify(
    //     nftName
    // )} "rate")`;
    const pactCode = `(${marketplacePactFunctions.getRoyaltyInfoSingleNft} ${JSON.stringify(
        nftName
    )} "rate")`;


    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get single NFT royalty percentage");
    }
};
