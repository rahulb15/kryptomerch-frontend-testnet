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
import priorityPassPactFunctions from "@utils/pactPriorityPassFunctions";

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

const getPassPrice = async () => {
    // const pactCode = `(free.kmpasstest003.get-mint-price )`;
    const pactCode = `(${priorityPassPactFunctions.getMintPrice})`;
    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status == "success") {
        let price = response.result.data;
        // console.log("price", price);
        // console.log("Price",response.result.data)
        // alert(`Pass Price: ${price} KDA`);
        return price;
    } else {
        let error = response.result.error.message;
        console.log("Error:", error);
    }
};

export const priorityPassApi = createApi({
    reducerPath: "priorityPassApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_HOST }),
    endpoints: (builder) => ({
        createCollection: builder.mutation({
            async queryFn(args) {
                const {
                    totalSupply,
                    creator,
                    collectionRequestUriList,
                    mintPrice,
                    policy,
                    wallet,
                } = args;
                console.log("Total Supply", totalSupply);
                console.log("Creator", creator);
                console.log("URI List", collectionRequestUriList);
                console.log("Mint Price", mintPrice);
                console.log("Policy", policy);

                const account = creator;
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };
                // const pactCode = `(free.kmpasstest003.create-collection 
                const pactCode = `(${priorityPassPactFunctions.createCollection}
                            ${totalSupply}
                            (read-keyset 'guard)
                            ${JSON.stringify(account)}
                            ${JSON.stringify(collectionRequestUriList)}
                            ${parseFloat(mintPrice).toFixed(2)}
                                  ${JSON.stringify(policy)}
)`;
                console.log("pactCode", pactCode);
                const txn = Pact.builder
                    .execution(pactCode)
                    .addData("guard", guard)
                    .addSigner(account, (withCapability) => [
                        withCapability("coin.GAS"),
                        // withCapability("free.kmpasstest003.IS_ADMIN"),
                        withCapability(priorityPassPactFunctions.isAdmin),
                        // withCapability("free.kmpasstest003.CREATE-COLLECTION"),
                        withCapability(priorityPassPactFunctions.createCollectionCapability),
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

                console.log("create_collection", txn);
                console.log("sign");

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
                        console.log("sign1");
                        const response = await signFunction(signedTx);
                        if (response.result.data === true) {
                            console.log(
                                `Collection: ${args.collectionRequestName} Created Successfully`
                            );
                        }
                        console.log("response", response);
                        return { data: response };
                    } else {
                        console.log(
                            "Error in local response",
                            localResponse.result.error
                        );
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),
        unrevealedTokens: builder.mutation({
            async queryFn(args) {
                console.log("args", args);
                const account = admin;
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                // const pactCode = `(free.kmpasstest003.get-unrevealed-tokens-for-collection)`;
                const pactCode = `(${priorityPassPactFunctions.getUnrevealedTokensForCollection})`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .addData("guard", guard)
                    .addSigner(publicKey, (withCapability) => [
                        withCapability("coin.GAS"),
                        // withCapability("free.kmpasstest003.IS_ADMIN"),
                        withCapability(priorityPassPactFunctions.isAdmin),
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

                console.log("unrevealedTokens", txn);
                console.log("sign");

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

        checkPublicPrice: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                // const pactCode = `(free.lptest001.get-mint-price ${JSON.stringify(
                //     colName
                // )})`;
                const collectionName = "priority_pass";
                const pactCode = `(${
                    priorityPassPactFunctions.getMintPrice
                } ${JSON.stringify(collectionName)})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .createTransaction();

                    console.log("checkPublicPrice", transaction);

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });
                console.log("response", response);

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        reserveTokens: builder.mutation({
            async queryFn(args) {
                const {
                    minter,
                    amount,
                    creator,
                    walletName,
                    wcClient,
                    wcSession,
                } = args;
                const passPrice = await getPassPrice();
                console.log("Pass Price", passPrice);
                console.log("Minter", minter);
                console.log("Amount", amount);

                const account = minter;
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                // const pactCode = `(free.kmpasstest003.reserve-token ${JSON.stringify(
                //     account
                // )} ${amount})`;
                const pactCode = `(${priorityPassPactFunctions.reserveToken} ${JSON.stringify(
                    account
                )} ${amount})`;


                let txn;
                if (account === admin) {
                    console.log("Admin");
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability(
                                // "free.kmpasstest003.MINT-PASS",
                                priorityPassPactFunctions.mintPassCapability,
                                account
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
                    console.log("Not Admin");
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability(
                                // "free.kmpasstest003.MINT-PASS",
                                priorityPassPactFunctions.mintPassCapability,
                                account
                            ),
                            withCapability(
                                "coin.TRANSFER",
                                account,
                                creator,
                                passPrice
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

                console.log("reserve tokens", txn);
                console.log("sign");

                const localResponse = await client.local(txn, {
                    preflight: false,
                    signatureVerification: false,
                });
                console.log("localResponse", localResponse);

                if (localResponse.result.status == "success") {
                    let signedTx;
                    if (walletName == "Ecko Wallet") {
                        signedTx = await eckoWallet(txn);
                    }
                    if (walletName == "Chainweaver") {
                        signedTx = await signWithChainweaver(txn);
                    } else if (walletName == "WalletConnect") {
                        if (wcClient && wcSession) {
                            const signWithWalletConnect =
                                createWalletConnectSign(
                                    wcClient,
                                    wcSession,
                                    // "kadena:testnet04"
                                    // process.env.NEXT_PUBLIC_WALLETCONNECT_CHAIN_ID || "kadena:testnet04"
                                    process.env.NEXT_PUBLIC_KDA_NETWORK_TYPE ===
                                        "mainnet"
                                        ? process.env
                                              .NEXT_PUBLIC_MAINNET_WALLETCONNECT_CHAIN_ID
                                        : process.env
                                              .NEXT_PUBLIC_TESTNET_WALLETCONNECT_CHAIN_ID
                                );
                            signedTx = await signWithWalletConnect(txn);
                        } else {
                            return { error: "WalletConnect not initialized" };
                        }
                    }
                    console.log("sign1");
                    const response = await signFunction(signedTx);
                    console.log("response", response);
                    if (response.result.status == "success") {
                        return { data: response };
                    } else {
                        console.log("Error in response", response.result.error);
                    }
                } else {
                    console.log(
                        "Error in local response",
                        localResponse.result.error
                    );
                }
            },
        }),
    }),
});

export const {
    useCreateCollectionMutation,
    useUnrevealedTokensMutation,
    useCheckPublicPriceMutation,
    useReserveTokensMutation,
} = priorityPassApi;
