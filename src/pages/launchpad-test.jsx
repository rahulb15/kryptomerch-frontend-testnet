/* eslint-disable */

// import Pact from "pact-lang-api";
import {
    createClient,
    createEckoWalletQuicksign,
    createSignWithChainweaver,
    Pact,
} from "@kadena/client";
import React, { useEffect, useState } from "react";
const signWithChainweaver = createSignWithChainweaver();
const eckoWallet = createEckoWalletQuicksign();

// ██╗░░██╗  ░░░░░░  ░██╗░░░░░░░██╗░█████╗░██╗░░░░░██╗░░░░░███████╗████████╗
// ╚██╗██╔╝  ░░░░░░  ░██║░░██╗░░██║██╔══██╗██║░░░░░██║░░░░░██╔════╝╚══██╔══╝
// ░╚███╔╝░  █████╗  ░╚██╗████╗██╔╝███████║██║░░░░░██║░░░░░█████╗░░░░░██║░░░
// ░██╔██╗░  ╚════╝  ░░████╔═████║░██╔══██║██║░░░░░██║░░░░░██╔══╝░░░░░██║░░░
// ██╔╝╚██╗  ░░░░░░  ░░╚██╔╝░╚██╔╝░██║░░██║███████╗███████╗███████╗░░░██║░░░
// ╚═╝░░╚═╝  ░░░░░░  ░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝╚══════╝╚══════╝╚══════╝░░░╚═╝░░░

const Launchpad = () => {
    useEffect(() => {
        const fetchData = async () => {
            const isEckoWalletInstalled = eckoWallet.isInstalled();
            if (!isEckoWalletInstalled) {
                alert(`Wallet not installed`);
            }

            const isEckoWalletConnected = await eckoWallet.isConnected();
            console.log(isEckoWalletConnected);

            if (!isEckoWalletConnected) {
                await eckoWallet.connect(NETWORK_ID);
            }
        };

        fetchData();
    }, []);
    // const NETWORK_ID = "mainnet01";

    const dec = (x) => ({ decimal: x.toString() });
    const coin_fungible = {
        refSpec: [{ namespace: null, name: "fungible-v2" }],
        refName: { namespace: null, name: "coin" },
    };

    const NETWORK_ID = "testnet04";
    const GAS_PRICE = 0.0000001;
    const GAS_LIMIT = 150000;
    const TTL = 28000;
    const CHAIN_ID = "1";
    const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
    const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
    const { kadena } = window;
    const client = createClient(API_HOST);

    // const admin =
    //     "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";
    const admin = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

    // const [wallet, setWallet] = useState("ecko");
    const [wallet, setWallet] = useState("CW");
    const [collectionRequestName, setCollectionRequestName] = useState("");
    const [collectionRequestSymbol, setCollectionRequestSymbol] = useState("");
    const [collectionRequestCreator, setCollectionRequestCreator] =
        useState("");
    const [collectionRequestDescription, setCollectionRequestDescription] =
        useState("");
    const [collectionRequestCategory, setCollectionRequestCategory] =
        useState("");
    const [collectionRequestSupply, setCollectionRequestSupply] = useState("");
    const [collectionRequestUriList, setCollectionRequestUriList] =
        useState("");
    const [collectionRequestMintPrice, setCollectionRequestMintPrice] =
        useState("");
    const [collectionRequestRoyalityPerc, setCollectionRequestRoyalityPerc] =
        useState("");
    const [collectionRequestCoverImgUrl, setCollectionRequestCoverImgUrl] =
        useState("");
    const [collectionRequestBannerImgUrl, setCollectionRequestBannerImgUrl] =
        useState("");
    const [collectionRequestStartDate, setCollectionRequestStartDate] =
        useState("");
    const [collectionRequestStartTime, setCollectionRequestStartTime] =
        useState();
    const [collectionRequesEndDate, setCollectionRequestEndDate] = useState("");
    const [collectionRequestEndTime, setCollectionRequestEndTime] = useState();
    const [
        collectionRequestEnableFreeMint,
        setCollectionRequestEnableFreeMint,
    ] = useState(false);
    const [collectionRequestEnableWl, setCollectionRequestEnableWl] =
        useState(false);
    const [collectionRequestEnablePresale, setCollectionRequestEnablePresale] =
        useState(false);
    const [collectionRequestEnableAirdrop, setCollectionRequestEnableAirdrop] =
        useState(false);
    const [collectionRequestPolicy, setCollectionRequestPolicy] = useState("");

    const [isRequestCollectionFormVisible, setRequestCollectionFormVisible] =
        useState(false);

    const [launchCollectionName, setLaunchCollectionName] = useState("");
    const [isLaunchCollectionFormVisible, setLaunchCollectionFormVisible] =
        useState(false);

    const [collectionNg, setCollectionNg] = useState("");
    const [creatorNg, setCreatorNg] = useState("");
    const [isNgCollectionFormVisible, setNgCollectionFormVisible] =
        useState(false);

    const [updateMintTimeCollection, setUpdateMintTimeCollection] = useState();
    const [updateMintTimeintTimeCreator, setUpdateMintTimeintTimeCreator] =
        useState();
    const [updateMintStartTime, setUpdateMintStartTime] = useState();
    const [updateMintEndTime, setUpdateMintEndTime] = useState();
    const [updateMintWLTime, setUpdateMintWLTime] = useState();
    const [isUpdateMintTimeFormVisible, setUpdateMintTimeFormVisible] =
        useState(false);

    const [priorityUsers, setPriorityUsers] = useState([]);
    const [isAddPriorityUserFormVisible, setAddPriorityUserFormVisible] =
        useState(false);

    const [colCreatorPresale, setColCreatorPresale] = useState("");
    const [colNamePresale, setColNamePresale] = useState("");
    const [presaleAccounts, setPresaleAccounts] = useState([]);
    const [isAddPresaleUserFormVisible, setAddPresaleUserFormVisible] =
        useState(false);

    const [publicCreator, setPublicCreator] = useState("");
    const [publicCol, setPublicCol] = useState("");
    const [publicPrice, setPublicPrice] = useState("");
    const [wlCreator, setWLCreator] = useState("");
    const [wlCol, setWLCol] = useState("");
    const [wlPrice, setWLPrice] = useState("");
    const [presaleUpdatePriceCreator, setPresaleCreator] = useState("");
    const [presaleUpdatePriceCol, setPresaleCol] = useState("");
    const [presaleUpdatePricePrice, setPresalePrice] = useState("");
    const [
        isUpdateMintPublicPriceFormVisible,
        setUpdateMintPublicPriceFormVisible,
    ] = useState(false);
    const [isUpdateMintWlPriceFormVisible, setUpdateMintWlPriceFormVisible] =
        useState(false);
    const [
        isUpdateMintPresalePriceFormVisible,
        setUpdateMintPresalePriceFormVisible,
    ] = useState(false);

    const [isTokenListFormVisible, setTokenListFormVisible] = useState(false);
    const [accToken, setAccToken] = useState("");

    const [colNameId, setColNameId] = useState("");
    const [isColIdFormVisible, setColIdFormVisible] = useState(false);

    const [reseveTknColName, setReseveTknColName] = useState("");
    const [reserverAcc, setReserverAcc] = useState("");
    const [reserveTknAmount, setReserveTknAmount] = useState();
    const [isReserveTknFormVisible, setReserveTknFormVisible] = useState(false);

    const [unrevealedColCreator, setUnrevealedColCreator] = useState("");
    const [unrevealedColName, setUnrevealedColName] = useState("");
    const [isUnrevealedTknsFormVisible, setUnrevealedTknsFormVisible] =
        useState(false);

    const [syncColName, setSyncColName] = useState("");
    const [syncTkns, setSyncTkns] = useState("");
    const [isSyncFormVisible, setSyncFormVisible] = useState(false);

    const [claimPassCol, setClaimPassCreator] = useState("");
    const [claimPassAccList, setClaimPassAccList] = useState("");
    const [isclaimPassFormVisible, setClaimPassFormVisible] = useState(false);

    const [accTkn, setAccTkn] = useState("");
    const [isGetTknsFormVisible, setGetTknsFormVisible] = useState(false);

    const [createPresaleCol, setCreatePresaleCol] = useState("");
    const [createPresalePrice, setCreatePresalePrice] = useState();
    const [createPresaleStartDate, setCreatePresaleStartDate] = useState("");
    const [createPresaleStartTime, setCreatePresaleStartTime] = useState();
    const [createPresaleEndDate, setCreatePresaleEndDate] = useState("");
    const [createPresaleEndTime, setCreatePresaleEndTime] = useState();
    const [isCreatePresaleFormVisible, setCreatePresaleFormVisible] =
        useState(false);

    const [createWlCol, setCreateWlCol] = useState("");
    const [createWlAdd, setCreateWlAdd] = useState([]);
    const [createPresaleAdd, setCreatePresaleAdd] = useState([]);

    const [createWlPrice, setCreateWlPrice] = useState();
    const [createWlStartTime, setCreateWlStartTime] = useState();
    const [isCreateWlFormVisible, setCreateWlFormVisible] = useState(false);

    const [createAirdropCol, setCreateAirdropCol] = useState("");
    const [createAirdropAdd, setCreateAirdropAdd] = useState([]);
    const [isCreateAirdropFormVisible, setCreateAirdropFormVisible] =
        useState(false);

    const [airdropCol, setAirdropCol] = useState("");
    const [airdropAcc, setAirdropAcc] = useState("");
    const [airdropTokenId, setAirdropTokenId] = useState("");
    const [isAirdropFormVisible, setAirdropFormVisible] = useState(false);

    const [saleTokenId, setSaleTokenId] = useState("");
    const [saleOwner, setSaleOwner] = useState("");
    const [buyNowPrice, setBuyNowPrice] = useState();
    const [saleStartDay, setSaleStartDay] = useState();
    const [saleEndDay, setSaleEndDay] = useState();
    const [saleType, setSaleType] = useState("");
    const [isSellFormVisible, setSellFormVisible] = useState(false);

    const handleCollectionRequestForm = async (event) => {
        event.preventDefault();
        console.log(collectionRequestEnableFreeMint);

        await collectionRequest(
            collectionRequestName,
            collectionRequestSymbol,
            collectionRequestCreator,
            collectionRequestDescription,
            collectionRequestCategory,
            collectionRequestSupply,
            collectionRequestUriList,
            collectionRequestMintPrice,
            collectionRequestRoyalityPerc,
            collectionRequestCoverImgUrl,
            collectionRequestBannerImgUrl,
            collectionRequestStartDate,
            collectionRequestStartTime,
            collectionRequesEndDate,
            collectionRequestEndTime,
            collectionRequestEnableFreeMint,
            collectionRequestEnableWl,
            collectionRequestEnablePresale,
            collectionRequestEnableAirdrop,
            collectionRequestPolicy
        );
        setRequestCollectionFormVisible(false);
    };

    const handleLaunchCollection = async (event) => {
        event.preventDefault();
        await launchCollection(launchCollectionName);
        setLaunchCollectionFormVisible(false);
    };

    const handleCreateNgCollection = async (event) => {
        event.preventDefault();
        await createNgCollection(collectionNg, creatorNg);
        setNgCollectionFormVisible(false);
    };

    const handleUpdateMintTime = async (event) => {
        event.preventDefault();
        await updateMintTime(
            updateMintTimeCollection,
            updateMintTimeintTimeCreator,
            updateMintStartTime,
            updateMintEndTime,
            updateMintWLTime
        );
        setUpdateMintTimeFormVisible(false);
    };

    const handleAddPriorityUsers = async (event) => {
        event.preventDefault();
        await addPassUser(priorityUsers);
        setAddPriorityUserFormVisible(false);
    };

    const handleAddPresaleUsers = async (event) => {
        event.preventDefault();
        await addPresaleUsers(
            colCreatorPresale,
            colNamePresale,
            presaleAccounts
        );
        setAddPresaleUserFormVisible(false);
    };

    const handleUpdatePublicPrice = async (event) => {
        event.preventDefault();
        await updatePublicPrice(publicCreator, publicCol, publicPrice);
        setUpdateMintPublicPriceFormVisible(false);
    };

    const handleUpdateWLPrice = async (event) => {
        event.preventDefault();
        await updateWLPrice(wlCreator, wlCol, wlPrice);
        setUpdateMintWlPriceFormVisible(false);
    };

    const handleUpdatePresalePrice = async (event) => {
        event.preventDefault();
        await updatePresalePrice(
            presaleUpdatePriceCreator,
            presaleUpdatePriceCol,
            presaleUpdatePricePrice
        );
        setUpdateMintPresalePriceFormVisible(false);
    };

    const handleCollectionId = async (event) => {
        event.preventDefault();
        await collectionId(colNameId);
        setColIdFormVisible(false);
    };

    const handleReserveTkn = async (event) => {
        event.preventDefault();
        await reserveTokens(reseveTknColName, reserverAcc, reserveTknAmount);
        setReserveTknFormVisible(false);
    };

    const handleUnrevealedTkns = async (event) => {
        event.preventDefault();
        await unrevealedTokens(unrevealedColName);
        setUnrevealedTknsFormVisible(false);
    };

    const handleSync = async (event) => {
        event.preventDefault();
        await syncWithNg(syncColName, syncTkns);
        setSyncFormVisible(false);
    };

    const handleClaimPassNft = async (event) => {
        event.preventDefault();
        await claimPassNft(claimPassCol, claimPassAccList);
        setClaimPassFormVisible(false);
    };

    const handleAccTkns = async (event) => {
        event.preventDefault();
        await getTokensOwned(accTkn);
        setGetTknsFormVisible(false);
    };

    const handleCreatePresale = async (event) => {
        event.preventDefault();
        await createPresale(
            createPresaleCol,
            createPresalePrice,
            createPresaleStartDate,
            createPresaleStartTime,
            createPresaleEndDate,
            createPresaleEndTime
        );
        setCreatePresaleFormVisible(false);
    };

    const handleCreateWl = async (event) => {
        event.preventDefault();
        await createWl(
            createWlCol,
            createWlAdd,
            createWlPrice,
            createWlStartTime
        );
        setCreateWlFormVisible(false);
    };

    const handleCreateAirdrop = async (event) => {
        event.preventDefault();
        await createAirdrop(createAirdropCol, createAirdropAdd);
        setCreateAirdropFormVisible(false);
    };

    const handleAirdrop = async (event) => {
        event.preventDefault();
        await airdropNft(airdropCol, airdropAcc, airdropTokenId);
        setAirdropFormVisible(false);
    };

    const signFunction = async (signedTx) => {
        const transactionDescriptor = await client.submit(signedTx);
        console.log("transactionDescriptor", transactionDescriptor);

        const response = await client.listen(transactionDescriptor, {});
        console.log("response", response);
        return response;
    };

    const handleTokenList = async (event) => {
        event.preventDefault();
        await tokenList();
        setTokenListFormVisible(false);
    };


    const signMultiFunction = async (signedTx1, signedTx2) => {
        const transactionDescriptor = await client.submit(signedTx1, signedTx2);
        console.log("transactionDescriptor", transactionDescriptor);

        const response = await client.listen(transactionDescriptor, {});
        console.log("response", response);
        return response;
    };

    const handleSaleForm = async (event) => {
        event.preventDefault();
        await saleFunction(
            saleTokenId,
            saleOwner,
            buyNowPrice,
            saleStartDay,
            saleEndDay,
            saleType
        );
        setSellFormVisible(false);
    };

    const collectionRequest = async () =>
        // collectionRequestName,
        // collectionRequestSymbol,
        // collectionRequestCreator,
        // collectionRequestDescription,
        // collectionRequestCategory,
        // collectionRequestSupply,
        // collectionRequestUriList,
        // collectionRequestMintPrice,
        // collectionRequestRoyalityPerc,
        // collectionRequestCoverImgUrl,
        // collectionRequestBannerImgUrl,
        // collectionRequestStartDate,
        // collectionRequestStartTime,
        // collectionRequesEndDate,
        // collectionRequestEndTime,
        // collectionRequestEnableFreeMint,
        // collectionRequestEnableWl,
        // collectionRequestEnablePresale,
        // collectionRequestEnableAirdrop,
        // collectionRequestPolicy
        {
            // [
            //   "ipfs://QmSsSuBXoWKYWJWQgaeaMPsKVFbW6GC46u1ijjDzsHNuNC",
            //   "ipfs://QmZF4tUbkZNhskWYt4kmkJsqh7KuoMimqgkXvMvmXzkyQ7",
            //   "ipfs://bafkreicdwftz5igoacayewcpmdzdybgdxeqtp4774pqfdgdit6xixl5jgy",
            //   "ipfs://bafkreibrlhemnw63b2cr7r6o3vs34fsuo77zqmx45tj3ztw7qmrycl5c5q",
            //   "ipfs://bafkreigtyofrxv33njecc5fski5q3nidktksnhugleumjde6sj7v3swljy",
            //   "ipfs://bafkreia5bz3ixnx6g3pnjvtujvahjb5jcm63552p5bdmkrc7xhl4q6vkrm",
            //   "ipfs://bafkreiaw75aajtlkmlhkjeenu6473aqfrtn4nig5etrcu2aapvjv2uf3aa",
            //   "ipfs://bafkreihxlzfjc2chgyz4ao6zlblo774oh6s3tk2duare3625r6r2nacs6y",
            //   "ipfs://bafkreid4uc4baeopme5xupafcy4ey2dm43xdlotq3eapmy672t3mfxoewa",
            //   "ipfs://bafkreih645w5xqpmglc6ejaj2duxyxrlqb7j3cdbwycxkx5r4urbysan2e",
            //   "ipfs://bafkreicd7k5ktdxjvthcm4jp2axarbpiuyvzy2orro4oqvjna2tw3xjiga",
            //   "ipfs://bafkreig6a3mvbn4blkmt3nugiwtbz5ydhtsaqe3wj7qwww6am53mgkwsb4",
            //   "ipfs://bafkreialpb4aacqsdtpifn4e2ulgxcfm5kkcsuifhz2p5iiec4vnrfomtu",
            //   "ipfs://bafkreih6zc7jvmkip7xv4nn4gymuhvo7rlr3r67cxdezif7vozbyfhcjum",
            //   "ipfs://bafkreicgffmo63z2jzdec72nwmetryn4r3g7mxjxzu63zp53lhslkfkboa",
            //   "ipfs://bafkreidsgfcwf5nnle6o7orau2llmfvxw76ckms42dwcgkzqsmbfvxp3ea",
            //   "ipfs://bafkreih6jnvfle4ddshrapwvei6dspeenooz7mq5jrfdpthh7h7nhuyfsm",
            //   "ipfs://bafkreidrejsfgzstowjv326ofeqqkr5b2da6s3wm2t4wqnmwoppamhjgiy"
            // ]

            const collectionRequestName = "K/C-CW-101";
            const collectionRequestSymbol = "";
            const collectionRequestCreator =
                "k:57dd1796e919ac60b91d4b6b345c1676b864f12ee9da10d00991b2a29f2f2b43";
            const collectionRequestDescription = "";
            const collectionRequestCategory = "ART";
            const collectionRequestSupply = 4;
            const collectionRequestUriList = [
                "ipfs://bafkreifabzsykcr23o2xyzovys6olid63oaxrb3i3byzz32caklymlvm5u",
                "ipfs://bafkreic5iyftd6mus6o7llctwpgxyarkcxzz55jiptayot3rya6y3y5teu",
                "ipfs://bafkreid3gpivbqhqcjvpcol5l7zpn4oj2na5dthygsrlkdxyjmnm4qaqta",
                "ipfs://bafkreicm7uen4kb3y7nwoexrsx7sre6ckfmtbfufslidbesfsbzfi2lguy",
            ];
            const collectionRequestMintPrice = 1.0;
            const collectionRequestRoyalityPerc = 10;
            const collectionRequestRoyalityAddress = "";
            const collectionRequestCoverImgUrl = "";
            const collectionRequestBannerImgUrl = "";
            const collectionRequestStartDate = "";

            const collectionRequesEndDate = "";
            const collectionRequestEnableFreeMint = false;
            const collectionRequestEnableWl = true;
            const collectionRequestEnablePresale = true;
            const collectionRequestEnableAirdrop = false;
            const collectionRequestPolicy =
                "COLLECTION INSTANT-MINT MARKETPLACE FIXED-SALE";

            console.log(
                collectionRequestName,
                collectionRequestSymbol,
                collectionRequestCreator,
                collectionRequestDescription,
                collectionRequestCategory,
                collectionRequestSupply,
                collectionRequestUriList,
                collectionRequestMintPrice,
                collectionRequestRoyalityPerc,
                collectionRequestRoyalityAddress,
                collectionRequestCoverImgUrl,
                collectionRequestBannerImgUrl,
                collectionRequestStartDate,
                collectionRequestStartTime,
                collectionRequesEndDate,
                collectionRequestEndTime,
                collectionRequestEnableFreeMint,
                collectionRequestEnableWl,
                collectionRequestEnablePresale,
                collectionRequestEnableAirdrop,
                collectionRequestPolicy
            );

            const account = collectionRequestCreator;
            const publicKey = account.slice(2, account.length);
            const guard = { keys: [publicKey], pred: "keys-all" };

            // "ipfs://QmVdXq6EjDEQq6U5cDqab2xvaMzHLgpQKjW56iVJYbji7a","ipfs://QmRPqajKGNCtKyA7oE5Lx3H8YijyfopS8oaVcdZCSUDyEP","ipfs://QmPJAuW9MpZwcdzw86ECFyBqVb9HvTfHsaqAQiKCvPmSPD","ipfs://QmXHR1BFLd8MYMEYbrhMkboLc1oEG2tbygomaxCknosQNN"

            const pactCode = `(free.lptest001.nft-collection-request 
                                                        ${JSON.stringify(
                                                            collectionRequestName
                                                        )}  
                                                        ${JSON.stringify(
                                                            collectionRequestSymbol
                                                        )}  
                                                        ${JSON.stringify(
                                                            account
                                                        )}        
                                                        (read-keyset  "guard")
                                                        ${JSON.stringify(
                                                            collectionRequestDescription
                                                        )}
                                                        ${JSON.stringify(
                                                            collectionRequestCategory
                                                        )}
                                                        4
[
        "ipfs://QmVdXq6EjDEQq6U5cDqab2xvaMzHLgpQKjW56iVJYbji7a",
        "ipfs://QmRPqajKGNCtKyA7oE5Lx3H8YijyfopS8oaVcdZCSUDyEP",
        "ipfs://QmPJAuW9MpZwcdzw86ECFyBqVb9HvTfHsaqAQiKCvPmSPD",
        "ipfs://QmXHR1BFLd8MYMEYbrhMkboLc1oEG2tbygomaxCknosQNN"
      ]
                                                        1.0
                                                        ${collectionRequestRoyalityPerc}
                                                        ${JSON.stringify(
                                                            collectionRequestRoyalityAddress
                                                        )}
                                                        ${JSON.stringify(
                                                            collectionRequestCoverImgUrl
                                                        )}
                                                        ${JSON.stringify(
                                                            collectionRequestBannerImgUrl
                                                        )}
                                                        ${JSON.stringify(
                                                            collectionRequestStartDate
                                                        )}
                                                        (time "2024-03-22T14:00:00Z")
                                                        ${JSON.stringify(
                                                            collectionRequesEndDate
                                                        )}       
                                                        (time "2025-03-22T14:00:00Z") 
                                                        ${collectionRequestEnableFreeMint}                 
                                                        ${collectionRequestEnableWl} 
                                                        ${collectionRequestEnablePresale} 
                                                        ${collectionRequestEnableAirdrop} 
                                                        ${JSON.stringify(
                                                            collectionRequestPolicy
                                                        )}
                                                        )
                                                        `;
            // (time "2024-05-24T00:58:27Z")
            const txn = Pact.builder
                .execution(pactCode)
                .addData("guard", guard)
                .addSigner(publicKey, (withCapability) => [
                    withCapability("coin.GAS"),
                    withCapability("coin.TRANSFER", account, admin, 1.0),
                ])
                .setMeta({
                    creationTime: creationTime(),
                    sender: account,
                    gasLimit: 150000,
                    chainId: CHAIN_ID,
                    ttl: 28800,
                })
                .setNetworkId(NETWORK_ID)
                .createTransaction();

            console.log("create_collection", txn);
            console.log("sign");

            const localResponse = await client.local(txn, {
                preflight: false,
                signatureVerification: false,
            });

            if (localResponse.result.status == "success") {
                let signedTx;
                if (wallet == "ecko") {
                    signedTx = await eckoWallet(txn);
                }
                if (wallet == "CW") {
                    signedTx = await signWithChainweaver(txn);
                }
                console.log("sign1");
                const response = await signFunction(signedTx);
                if (response.result.data == true) {
                    alert(
                        `Collection: ${collectionRequestName} Resqeusted Successfully`
                    );
                }
                console.log("response", response);
            } else {
                console.log(
                    "Error in local response",
                    localResponse.result.error
                );
            }
        };

    const launchCollection = async (launchCollectionName) => {
        const account = admin;
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.launch-collection  ${JSON.stringify(
            launchCollectionName
        )})`;

        const txn = Pact.builder
            .execution(pactCode)
            .addData("guard", guard)
            .addSigner(publicKey, (withCapability) => [
                withCapability("coin.GAS"),
                withCapability("free.lptest001.IS_ADMIN"),
            ])
            .setMeta({
                creationTime: creationTime(),
                sender: account,
                gasLimit: 150000,
                chainId: CHAIN_ID,
                ttl: 28800,
            })
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("launch_collection", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            if (response.result.status == "success") {
                alert(
                    `Collection: ${launchCollectionName} Has Launched Successfully`
                );
            }
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const createNgCollection = async (collectionNg) => {
        // setWallet("ecko");
        // const account = "k:621c4002fbced0d1c483b6f23bfeab54cdb39a69fa6c0ab9fc210a8e1751b209";
        const account = await getColCreator(collectionNg);
        // console.log("Creator",account);
        const publicKey = account.slice(2, account.length);
        // console.log(publicKey);
        const guard = { keys: [publicKey], pred: "keys-all" };
        // console.log(guard);

        const pactCode = `(free.lptest001.create-ng-collection  ${JSON.stringify(
            collectionNg
        )}
                                                            ${JSON.stringify(
                                                                account
                                                            )}
                                                            (read-keyset  "guard"))`;

        const create_Ng_Collection = Pact.builder
            .execution(pactCode)
            .addData("guard", guard)
            .addSigner(publicKey)
            // .addSigner(publicKey, (signFor) => [signFor("coin.GAS")])
            .setMeta({
                creationTime: creationTime(),
                senderAccount: account,
                gasLimit: 150000,
                chainId: CHAIN_ID,
                ttl: 28800,
            })
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("createNgCollection", create_Ng_Collection);
        console.log("sign", wallet);

        const localResponse = await client.local(create_Ng_Collection, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(create_Ng_Collection);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(create_Ng_Collection);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            if (response.result.status == "success") {
                alert(
                    `Collection: ${collectionNg} Successfully synced with NG`
                );
            }
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const updateMintTime = async (
        updateMintTimeCollection,
        updateMintTimeintTimeCreator,
        updateMintStartTime,
        updateMintEndTime,
        updateMintWLTime
    ) => {
        const account = updateMintTimeintTimeCreator;
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.update-mint-time ${JSON.stringify(
            updateMintTimeCollection
        )} (read-keyset 'guard) ${updateMintStartTime} ${updateMintEndTime} ${updateMintWLTime})`;

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
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("updateMintTime", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const addPassUser = async (priorityUsers) => {
        const account = admin;
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };
        const pactCode = `(free.lptest001.add-priority-users ${priorityUsers})`;

        const txn = Pact.builder
            .execution(pactCode)
            .addData("guard", guard)
            .addSigner(publicKey, (withCapability) => [
                withCapability("coin.GAS"),
                withCapability("free.lptest001.PRIORITY"),
            ])
            .setMeta({
                creationTime: creationTime(),
                sender: account,
                gasLimit: 150000,
                chainId: CHAIN_ID,
                ttl: 28800,
            })
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("addPassUser", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const addPresaleUsers = async (
        colCreatorPresale,
        colNamePresale,
        presaleAccounts
    ) => {
        const account = colCreatorPresale;
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.add-to-presale ${JSON.stringify(
            account
        )} (read-keyset 'guard) ${JSON.stringify(
            colNamePresale
        )} ${presaleAccounts})`;

        const txn = Pact.builder
            .execution(pactCode)
            .addData("guard", guard)
            .addSigner(publicKey, (withCapability) => [
                withCapability("coin.GAS"),
                withCapability("free.lptest001.PRIVATE"),
            ])
            .setMeta({
                creationTime: creationTime(),
                sender: account,
                gasLimit: 150000,
                chainId: CHAIN_ID,
                ttl: 28800,
            })
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("addPresaleUsers", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const updatePublicPrice = async (publicCreator, publicCol, publicPrice) => {
        const account = publicCreator;
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const a = account;

        const pactCode = `(free.lptest001.update-public-price ${JSON.stringify(
            publicCol
        )} (read-keyset 'guard) ${publicPrice})`;

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
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("updatePublicPrice", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const updateWLPrice = async (wlCreator, wlCol, wlPrice) => {
        const account = wlCreator;
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.update-wl-price ${JSON.stringify(
            wlCol
        )} (read-keyset 'guard) ${wlPrice})`;

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
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("updateWLPrice", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const updatePresalePrice = async (
        presaleUpdatePriceCreator,
        presaleUpdatePriceCol,
        presaleUpdatePricePrice
    ) => {
        const account = presaleUpdatePriceCreator;
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.update-presale-mint-price ${JSON.stringify(
            presaleUpdatePriceCol
        )} (read-keyset 'guard) ${presaleUpdatePricePrice})`;

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
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("updatePresalePrice", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const collectionId = async (colNameId) => {
        const pactCode = `(free.lptest001.get-collection-id ${JSON.stringify(
            colNameId
        )})`;

        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({ chainId: "1" })
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });

        if (response.result.status == "success") {
            let colId = response.result.data;
            // alert(`Collection Id: ${colId}`);
            console.log(colId);
            return colId;
        }
    };

    const reserveTokens = async (
        reseveTknColName,
        reserverAcc,
        reserveTknAmount
    ) => {
        const chkPublic = await checkPublic(reseveTknColName);
        const chkWl = await checkWl(reseveTknColName);
        const chkPresale = await checkPresale(reseveTknColName);
        let price;
        if (chkPresale == true) {
            price = await checkPresalePrice(reseveTknColName);
        } else if (chkWl == true) {
            price = await checkWlPrice(reseveTknColName);
        } else if (chkPublic == true) {
            price = await checkPublicPrice(reseveTknColName);
        } else {
            alert(`Sale is not live`);
        }

        console.log(price);

        const account = reserverAcc;
        const creator = await getColCreator(reseveTknColName);
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        let txn;
        let mintPrice = reserveTknAmount * price;
        console.log(
            "mintPrice",
            mintPrice,
            "Calculation",
            "reserveTknAmount",
            reserveTknAmount,
            "*",
            "price",
            price
        );

        const pactCode = `(free.lptest001.reserve-token ${JSON.stringify(
            reseveTknColName
        )} ${JSON.stringify(account)} ${reserveTknAmount})`;

        if (account == creator) {
            txn = Pact.builder
                .execution(pactCode)
                .addData("guard", guard)
                .addSigner(publicKey, (withCapability) => [
                    withCapability("coin.GAS"),
                    withCapability("free.lptest001.MINT-NFT", account),
                ])
                .setMeta({
                    creationTime: creationTime(),
                    sender: account,
                    gasLimit: 150000,
                    chainId: CHAIN_ID,
                    ttl: 28800,
                })
                .setNetworkId(NETWORK_ID)
                .createTransaction();
        } else {
            txn = Pact.builder
                .execution(pactCode)
                .addData("guard", guard)
                .addSigner(publicKey, (withCapability) => [
                    withCapability("coin.GAS"),
                    withCapability("free.lptest001.MINT-NFT", account),
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
                .setNetworkId(NETWORK_ID)
                .createTransaction();
        }

        console.log("updateMintTime", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            if (response.result.status == "success") {
                alert(
                    `${reserveTknAmount} are reserved for collection: ${reseveTknColName}`
                );
            }
            // console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const unrevealedTokens = async (unrevealedColName) => {
        const account = await getColCreator(unrevealedColName);
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.get-unrevealed-tokens-for-collection ${JSON.stringify(
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
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("unrevealedTokens", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });
        console.log("here");
        if (localResponse.result.status == "success") {
            console.log(localResponse.result.data);
            let data = localResponse.result.data;
            for (let i = 0; i < data.length; i++) {
                console.log("Account:", data[i].account);
                console.log("Account-ID:", data[i].accountId);
                // console.log("Collection-Name:",data[i].collection-name);
            }
        }

        // account
        // "k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
        // accountId
        // {int: 1}
        // collection-name
        // "K/C-CW"//

        // if (localResponse.result.status == "success") {
        //   let signedTx;
        //   if (wallet == "ecko") {
        //     signedTx = await eckoWallet(txn);
        //   }
        //   if (wallet == "CW") {
        //     signedTx = await signWithChainweaver(txn);
        //   }
        //   console.log("sign1");
        //   const response = await signFunction(signedTx);
        //   console.log("response", response);
        // } else {
        //   console.log("Error in local response", localResponse.result.error);
        // }
    };

    const syncWithNg = async (syncColName, syncTkns) => {
        const colId = await collectionId(syncColName);
        const account = await getColCreator(syncColName);
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.bulk-sync-with-ng ${JSON.stringify(
            syncColName
        )} ${syncTkns})`;

        const txn = Pact.builder
            .execution(pactCode)
            .addData("guard", guard)
            .addData("marmalade_collection", { id: colId })
            .addSigner(publicKey)
            // .addSigner(publicKey, (withCapability) => [
            //   withCapability("coin.GAS"),
            //   withCapability("free.lptest001.MINTPROCESS", syncColName),
            // ])
            .setMeta({
                creationTime: creationTime(),
                sender: account,
                gasLimit: 150000,
                chainId: CHAIN_ID,
                ttl: 28800,
            })
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("syncWithNg", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const claimPassNft = async (claimPassCol, claimPassAccList) => {
        const account = await getColCreator(claimPassCol);
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.claim-pass-nft ${JSON.stringify(
            claimPassCol
        )} ${JSON.stringify(claimPassAccList)} (read-keyset 'guard))`;

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
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("claimPassNft", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("Tokens", response.result.data);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const checkPublic = async (colName) => {
        const pactCode = `(free.lptest001.check-public ${JSON.stringify(
            colName
        )})`;

        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({ chainId: "1" })
            .createTransaction();

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });

        if (response.result.status == "success") {
            // alert(`Sale is live`);
            // console.log(response.result.data);
            return response.result.data;
        } else {
            alert(`Sale is not live`);
        }
    };

    const checkWl = async (colName) => {
        const pactCode = `(free.lptest001.check-whitelist ${JSON.stringify(
            colName
        )})`;

        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({ chainId: "1" })
            .createTransaction();

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });

        if (response.result.status == "success") {
            // alert(`Sale is live`);
            // console.log(response.result.data);
            return response.result.data;
        } else {
            alert(`Sale is not live`);
        }
    };

    const checkPresale = async (colName) => {
        const pactCode = `(free.lptest001.check-presale ${JSON.stringify(
            colName
        )})`;

        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({ chainId: "1" })
            .createTransaction();

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });

        if (response.result.status == "success") {
            // alert(`Sale is live`);
            // console.log(response.result.data);
            return response.result.data;
        } else {
            alert(`Sale is not live`);
        }
    };

    const checkPublicPrice = async (colName) => {
        const pactCode = `(free.lptest001.get-mint-price ${JSON.stringify(
            colName
        )})`;

        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({ chainId: "1" })
            .createTransaction();

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });

        if (response.result.status == "success") {
            // alert(`Sale is live`);
            // console.log(response.result.data);
            return response.result.data;
        } else {
            alert(`Sale is not live`);
        }
    };

    const checkWlPrice = async (colName) => {
        const pactCode = `(free.lptest001.get-wl-price ${JSON.stringify(
            colName
        )})`;

        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({ chainId: "1" })
            .createTransaction();

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });

        if (response.result.status == "success") {
            // alert(`Sale is live`);
            // console.log(response.result.data);
            return response.result.data;
        } else {
            alert(`Sale is not live`);
        }
    };

    const checkPresalePrice = async (colName) => {
        const pactCode = `(free.lptest001.get-presale-price ${JSON.stringify(
            colName
        )})`;

        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({ chainId: "1" })
            .createTransaction();

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });

        if (response.result.status == "success") {
            // alert(`Sale is live`);
            // console.log(response.result.data);
            return response.result.data;
        } else {
            alert(`Sale is not live`);
        }
    };

    const getColCreator = async (colName) => {
        const pactCode = `(free.lptest001.get-collection-creator ${JSON.stringify(
            colName
        )})`;

        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({ chainId: "1" })
            .createTransaction();

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });

        if (response.result.status == "success") {
            // alert(`Sale is live`);
            console.log(response.result.data);
            return response.result.data;
        } else {
            alert(`CHECK CONSOLE`);
        }
    };

    const getTokensOwned = async (accTkn) => {
        const account = accTkn;
        const pactCode = `(free.lptest001.get-all-tokens-by-account ${JSON.stringify(
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
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("getTokensOwned", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let tokens = [];
            for (let i = 0; i < localResponse.result.data.length; i++) {
                tokens.push(localResponse.result.data[i].tokens);
            }
            console.log(tokens);
            alert(`${tokens}`);
            console.log("response", localResponse);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };
    //FinalTestCol001|t:qywB2xI6TQ5aQNi_V7nRfmKdxZmjDojbWZ6_tRePzww

    const createPresale = async (
        createPresaleCol,
        createPresalePrice,
        createPresaleStartDate,
        createPresaleStartTime,
        createPresaleEndDate,
        createPresaleEndTime
    ) => {
        const account = await getColCreator(createPresaleCol);
        console.log(account);

        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.create-presale 
                                                    ${JSON.stringify(account)} 
                                                    (read-keyset  "guard")  
                                                    ${JSON.stringify(
                                                        createPresaleCol
                                                    )} 
                                                    ${createPresalePrice} 
                                                    ${JSON.stringify(
                                                        createPresaleStartDate
                                                    )} 
                                                    ${createPresaleStartTime} 
                                                    ${JSON.stringify(
                                                        createPresaleEndDate
                                                    )} 
                                                    ${createPresaleEndTime}
                                                    ${createPresaleAdd}
                                                    )`;

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
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("createPresale", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const createWl = async (
        createWlCol,
        createWlAdd,
        createWlPrice,
        createWlStartTime
    ) => {
        const account = await getColCreator(createWlCol);
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        // const a = account1

        const pactCode = `(free.lptest001.create-whitelist 
                                                      ${JSON.stringify(
                                                          createWlCol
                                                      )} 
                                                      ${JSON.stringify(account)}
                                                      (read-keyset  "guard")    
                                                      ${createWlAdd}              
                                                      ${createWlPrice}
                                                      ${createWlStartTime}
                                                      )
                                                      `;
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
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("create_collection", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const createAirdrop = async (createAirdropCol, createAirdropAdd) => {
        const account = await getColCreator(createAirdropCol);
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.create-airdrop  
                                                      ${JSON.stringify(
                                                          createAirdropCol
                                                      )} 
                                                      (read-keyset  "guard") 
                                                      ${createAirdropAdd} )`;
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
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("createAirdrop", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const airdropNft = async (airdropCol, airdropAcc, airdropTokenId) => {
        const account = await getColCreator(airdropCol);
        const publicKey = account.slice(2, account.length);
        const guard = { keys: [publicKey], pred: "keys-all" };

        const pactCode = `(free.lptest001.airdrop-nft ${JSON.stringify(
            airdropCol
        )} ${JSON.stringify(airdropAcc)} ${JSON.stringify(
            airdropTokenId
        )} ${JSON.stringify(account)} (read-keyset  "guard"))`;

        const txn = Pact.builder
            .execution(pactCode)
            .addData("guard", guard)
            .addSigner(publicKey, (withCapability) => [
                withCapability("coin.GAS"),
                withCapability(
                    "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.TRANSFER",
                    airdropTokenId,
                    account,
                    airdropAcc,
                    1.0
                ),
            ])
            .setMeta({
                creationTime: creationTime(),
                sender: account,
                gasLimit: 150000,
                chainId: CHAIN_ID,
                ttl: 28800,
            })
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        console.log("airdropNft", txn);
        console.log("sign");

        const localResponse = await client.local(txn, {
            preflight: false,
            signatureVerification: false,
        });

        if (localResponse.result.status == "success") {
            let signedTx;
            if (wallet == "ecko") {
                signedTx = await eckoWallet(txn);
            }
            if (wallet == "CW") {
                signedTx = await signWithChainweaver(txn);
            }
            console.log("sign1");
            const response = await signFunction(signedTx);
            console.log("response", response);
        } else {
            console.log("Error in local response", localResponse.result.error);
        }
    };

    const getAllColRqst = async () => {
        const pactCode = `(free.lptest001.get-collection-request)`;
        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({
                creationTime: creationTime(),
                gasLimit: 100000,
                chainId: CHAIN_ID,
                ttl: 28800,
                gasPrice: GAS_PRICE,
                sender: "",
            })
            .setNetworkId(NETWORK_ID)
            .createTransaction();

        const client = createClient(API_HOST);

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });
        if (response.result.status == "success") {
            let cols = response.result.data;
            alert(`Collections: ${cols}`);
        }
    };

    const getAllCols = async () => {
        const pactCode = `(free.lptest001.get-launched-collection)`;
        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({
                creationTime: creationTime(),
                gasLimit: 150000,
                chainId: CHAIN_ID,
                ttl: 28800,
            })
            .createTransaction();

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });
        if (response.result.status == "success") {
            let cols = response.result.data;
            alert(`Collections: ${cols}`);
        } else {
            console.log(response.result.error);
        }
    };

    const getPriorityUsers = async () => {
        const pactCode = `(free.lptest001.get-priority-users)`;
        const transaction = Pact.builder
            .execution(pactCode)
            .setMeta({
                creationTime: creationTime(),
                gasLimit: 150000,
                chainId: CHAIN_ID,
                ttl: 28800,
            })
            .createTransaction();

        const response = await client.local(transaction, {
            preflight: false,
            signatureVerification: false,
        });

        if (response.result.status == "success") {
            let accounts = response.result.data;
            alert(`Accounts: ${accounts}`);
        }
    };
    // (defun open-sale (token_id:string owner:string buy_now_price:decimal sale_start_days:integer sale_end_days:integer sale_type:string)

    const saleFunction = async () =>
        // saleTokenId,
        // saleOwner,`
        // buyNowPrice,
        // saleStartDay,
        // saleEndDay,
        // saleType
        {
            const saleOwner =
                "k:f0e2252089c002f349633b4d410ae023df419dd3939e193f6ebfaac81b048527";
            const publicKey = saleOwner.slice(2, saleOwner.length);
            const saleTokenId = "t:sg1ToUS8F9bg6qvUAkYFdEDm6JlSYrzEilanw41AzOM";
            const buyNowPrice = 2.0;
            const saleStartDay = 1;
            const saleEndDay = 3;
            const saleType = "FIXED-SALE";
            // const guard = { keys: [publicKey], pred: "keys-all" };
            const pactCodeKm = `(free.mp-ng-002.open-sale 
                                                ${JSON.stringify(saleTokenId)} 
                                                ${JSON.stringify(saleOwner)} 
                                                2.0
                                                ${saleStartDay}
                                                ${saleEndDay}
                                                ${JSON.stringify(saleType)} 
                                                )`;

            const pactCodeLedger = `(n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.sale 
                                                ${JSON.stringify(saleTokenId)} 
                                                ${JSON.stringify(saleOwner)}  
                                                1.0
                                                n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.NO-TIMEOUT
                                                )`;

            const km_marketplace_txn = Pact.builder
                .execution(pactCodeKm)
                .addSigner(publicKey, (withCapability) => [
                    withCapability("coin.GAS"),
                ])
                .setMeta({
                    creationTime: creationTime(),
                    sender: saleOwner,
                    gasLimit: 150000,
                    chainId: CHAIN_ID,
                    ttl: 28800,
                })
                .setNetworkId(NETWORK_ID)
                .createTransaction();

            const make_trx_fixed = Pact.builder
                .execution(pactCodeLedger)
                // .addData(`marmalade_marketplace_${saleTokenId}`, fee ? fee : undefined)
                .addData(`marmalade_sale_${saleTokenId}`, {
                    sale_type: "fixed",
                    currency: coin_fungible,
                })
                .addData(`marmalade_fixed_quote_${saleTokenId}`, {
                    price: dec(buyNowPrice),
                    recipient: saleOwner,
                })
                .addSigner(publicKey, (withCapability) => [
                    withCapability("coin.GAS"),
                ])
                .addSigner(publicKey, (withCapability) => [
                    withCapability(
                        "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.OFFER",
                        saleTokenId,
                        saleOwner,
                        1.0
                    ),
                ])
                .setMeta({
                    creationTime: creationTime(),
                    sender: saleOwner,
                    gasLimit: 150000,
                    chainId: CHAIN_ID,
                    ttl: 28800,
                })
                .setNetworkId(NETWORK_ID)
                .createTransaction();

            console.log("km_marketplace_txn", km_marketplace_txn);
            console.log("make_trx_fixed", make_trx_fixed);
            console.log("sign");

            const localResponseKm = await client.local(km_marketplace_txn, {
                preflight: false,
                signatureVerification: false,
            });

            const localResponseLedger = await client.local(make_trx_fixed, {
                preflight: false,
                signatureVerification: false,
            });

            if (
                localResponseKm.result.status == "success" &&
                localResponseLedger.result.status == "success"
            ) {
                let signedTx1;
                let signedTx2;
                console.log(wallet);
                if (wallet == "ecko") {
                    [signedTx1, signedTx2] = await eckoWallet([
                        km_marketplace_txn,
                        make_trx_fixed,
                    ]);
                    // signedTx2 = await eckoWallet(make_trx_fixed);
                }
                if (wallet == "CW") {
                    [signedTx1, signedTx2] = await signWithChainweaver([
                        km_marketplace_txn,
                        make_trx_fixed,
                    ]);
                    // signedTx2 = await signWithChainweaver(make_trx_fixed);
                }

                console.log("sign1");
                // const response = await signMultiFunction(signedTx1,signedTx2);
                // const transactionDescriptor = await client.submit([signedTx1,signedTx2]);
                const transactionDescriptor = await client.submit([
                    signedTx1,
                    signedTx2,
                ]);
                console.log("transactionDescriptor", transactionDescriptor);
                let rqstKey = transactionDescriptor.requestKey;
                const response = await client.pollStatus(
                    transactionDescriptor,
                    {}
                );
                console.log("response-pollStatus", response);
            } else {
                console.log(localResponseKm.result.error);
            }
        };


          const tokenList = async () => {
            const account = accToken;
        
            const pactCode1 = `(n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.list-balances ${JSON.stringify(account)})`;
        
            const txn1 = Pact.builder
              .execution(pactCode1)
              .setMeta({
                creationTime: creationTime(),
                sender: account,
                gasLimit: 150000,
                chainId: CHAIN_ID,
                ttl: 28800,
              })
              .setNetworkId(NETWORK_ID)
              .createTransaction();
        
            // console.log("unrevealedTokens", txn1);
            // console.log("sign");
        
            const localResponse1 = await client.local(txn1, {
              preflight: false,
              signatureVerification: false,
            });
        
            // console.log("localResponse",localResponse);
            // console.log("data",localResponse1.result.data);
        
            let data = localResponse1.result.data;
            let tokenArray = [];
        
            if (localResponse1.result.status === "success") {
              for (let i = 0; i < data.length; i++) {
                // console.log("data",data[i].id);
                tokenArray.push(data[i].id);
              }
              console.log("Tokens Array", tokenArray);
            }
            let tokensUri = [];
            let colNames = [];
        
            for (let i = 0; i < tokenArray.length; i++) {
        
              const pactCode2 = `(n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.get-uri ${JSON.stringify(tokenArray[i])})`;
              const pactCode3 = `(n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-collection.get-token-collection  ${JSON.stringify(tokenArray[i])})` 
        
              const txn2 = Pact.builder
                .execution(pactCode2)
                .setMeta({
                  creationTime: creationTime(),
                  sender: account,
                  gasLimit: 150000,
                  chainId: CHAIN_ID,
                  ttl: 28800,
                })
                .setNetworkId(NETWORK_ID)
                .createTransaction();
        
                const txn3 = Pact.builder
                .execution(pactCode3)
                .setMeta({
                  creationTime: creationTime(),
                  sender: account,
                  gasLimit: 150000,
                  chainId: CHAIN_ID,
                  ttl: 28800,
                })
                .setNetworkId(NETWORK_ID)
                .createTransaction();
              // console.log("unrevealedTokens", txn2);
              // console.log("sign");
        
              const localResponse2 = await client.local(txn2, {
                preflight: false,
                signatureVerification: false,
              });
        
              const localResponse3 = await client.local(txn3, {
                preflight: false,
                signatureVerification: false,
              });
        
              if (localResponse2.result.status === "success") {
                let uri = localResponse2.result.data;
                tokensUri.push(uri);
              }
        
              if (localResponse3.result.status === "success") {
                let colName = localResponse3.result.data;
                colNames.push(colName);
              } else{
                console.log(localResponse3.result.error)
              }
              
            }
        
            console.log("Uri List", tokensUri);
            console.log("ColName", colNames);
        };

       


    return (
        <>
            {/* <div style={{ marginTop: "10px" }}>
        <button onClick={() => setRequestCollectionFormVisible(true)}>
          {" "}
          Request Collection-
        </button>
        {isRequestCollectionFormVisible && (
          <form onSubmit={handleCollectionRequestForm}>
            <div>
              <input
                style={{ width: "8.3%" }}
                value={collectionRequestName}
                onChange={(e) => setCollectionRequestName(e.target.value)}
                placeholder="Collection Name"
              />
            </div>
            <div>
              <input
                style={{ width: "8.3%" }}
                value={collectionRequestSymbol}
                onChange={(e) => setCollectionRequestSymbol(e.target.value)}
                placeholder="Collection Symbol"
              />
            </div>
            <div>
              <input
                style={{ width: "8.3%" }}
                value={collectionRequestCreator}
                onChange={(e) => setCollectionRequestCreator(e.target.value)}
                placeholder="Collection Creator"
              />
            </div>
            <div>
              <textarea
                style={{ width: "8.3%" }}
                value={collectionRequestDescription}
                onChange={(e) =>
                  setCollectionRequestDescription(e.target.value)
                }
                placeholder="Collection Description"
              ></textarea>
            </div>
            <div>
              <select
                style={{ width: "8.7%" }}
                value={collectionRequestCategory}
                onChange={(e) => setCollectionRequestCategory(e.target.value)}
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="Art">Art</option>
                <option value="Music">Music</option>
                <option value="Photography">Photography</option>
                <option value="Games">Games</option>
                <option value="Sports">Sports</option>
              </select>{" "}
            </div>
            <div>
              <input
                type="number"
                tyle={{ width: "8%" }}
                value={collectionRequestSupply}
                onChange={(e) => setCollectionRequestSupply(e.target.value)}
                placeholder="Collection Supply"
              />
            </div>
            <div>
              <textarea
                style={{ width: "8%" }}
                value={collectionRequestUriList}
                onChange={(e) => setCollectionRequestUriList(e.target.value)}
                placeholder="Uri List"
              ></textarea>
            </div>
            <div>
              <input
                style={{ width: "8%" }}
                value={collectionRequestMintPrice}
                onChange={(e) => setCollectionRequestMintPrice(e.target.value)}
                placeholder="Mint Price"
              />
            </div>
            <div>
              <input
                style={{ width: "8%" }}
                value={collectionRequestRoyalityPerc}
                onChange={(e) =>
                  setCollectionRequestRoyalityPerc(e.target.value)
                }
                placeholder="Royalty Percentage"
              />
            </div>
            <div>
              <input
                style={{ width: "8%" }}
                value={collectionRequestCoverImgUrl}
                onChange={(e) =>
                  setCollectionRequestCoverImgUrl(e.target.value)
                }
                placeholder="Cover Image Url"
              />
            </div>
            <div>
              <input
                style={{ width: "8%" }}
                value={collectionRequestBannerImgUrl}
                onChange={(e) =>
                  setCollectionRequestBannerImgUrl(e.target.value)
                }
                placeholder="Banner Image Url"
              />
            </div>
            <div>
              <input
                style={{ width: "8%" }}
                value={collectionRequestStartDate}
                onChange={(e) => setCollectionRequestStartDate(e.target.value)}
                placeholder="Mint Start Date"
              />
            </div>
            <div>
              <input
                style={{ width: "8%" }}
                value={collectionRequestStartTime}
                onChange={(e) => setCollectionRequestStartTime(e.target.value)}
                placeholder="Mint Start Time"
              />
            </div>
            <div>
              <input
                style={{ width: "8%" }}
                value={collectionRequesEndDate}
                onChange={(e) => setCollectionRequestEndDate(e.target.value)}
                placeholder="Mint End Date"
              />
            </div>
            <div>
              <input
                style={{ width: "8%" }}
                value={collectionRequestEndTime}
                onChange={(e) => setCollectionRequestEndTime(e.target.value)}
                placeholder="Mint End Time"
              />
            </div>
            <div>
              <label>
                {" "}
                Free Mint:
                <input
                  type="checkbox"
                  style={{ width: "8%" }}
                  checked={collectionRequestEnableFreeMint}
                  onChange={(e) =>
                    setCollectionRequestEnableFreeMint(e.target.checked)
                  }
                  placeholder="Enable Free Mint"
                />
              </label>
            </div>
            <div>
              <label>
                {" "}
                Enable WL:
                <input
                  type="checkbox"
                  style={{ width: "8%" }}
                  checked={collectionRequestEnableWl}
                  onChange={(e) =>
                    setCollectionRequestEnableWl(e.target.checked)
                  }
                  placeholder="Enable WL"
                />
              </label>
            </div>
            <div>
              <label>
                {" "}
                Enable Presale:
                <input
                  type="checkbox"
                  style={{ width: "8%" }}
                  checked={collectionRequestEnablePresale}
                  onChange={(e) =>
                    setCollectionRequestEnablePresale(e.target.checked)
                  }
                  placeholder="Enable Presale"
                />
              </label>
            </div>
            <div>
              <label>
                {" "}
                Enable Airdrop:
                <input
                  type="checkbox"
                  style={{ width: "8%" }}
                  checked={collectionRequestEnableAirdrop}
                  onChange={(e) =>
                    setCollectionRequestEnableAirdrop(e.target.checked)
                  }
                  placeholder="Enable Airdrop"
                />
              </label>
            </div>

            <div>
              <input
                style={{ width: "8%" }}
                value={collectionRequestPolicy}
                onChange={(e) => setCollectionRequestPolicy(e.target.value)}
                placeholder="Policies"
              />
            </div>

            <button type="submit"> Request</button>
          </form>
        )}
      </div> */}
            <button onClick={collectionRequest}> RQST </button>
            <div>
                <button onClick={() => setLaunchCollectionFormVisible(true)}>
                    Launch Collection
                </button>
                {isLaunchCollectionFormVisible && (
                    <form onSubmit={handleLaunchCollection}>
                        <div>
                            <input
                                type="text"
                                value={launchCollectionName}
                                onChange={(e) =>
                                    setLaunchCollectionName(e.target.value)
                                }
                                placeholder="Collection Name"
                            />
                        </div>
                        <button type="submit">Launch</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setNgCollectionFormVisible(true)}>
                    Create NG Collection
                </button>
                {isNgCollectionFormVisible && (
                    <form onSubmit={handleCreateNgCollection}>
                        <div>
                            <input
                                value={collectionNg}
                                onChange={(e) =>
                                    setCollectionNg(e.target.value)
                                }
                                placeholder="Collection Name"
                            />
                        </div>
                        {/* <div>
              <input
                value={creatorNg}
                onChange={(e) => setCreatorNg(e.target.value)}
                placeholder="Creator"
              />
            </div>  */}
                        <button type="submit">Create</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setUpdateMintTimeFormVisible(true)}>
                    Update Mint Time
                </button>
                {isUpdateMintTimeFormVisible && (
                    <form onSubmit={handleUpdateMintTime}>
                        <div>
                            <input
                                value={updateMintTimeCollection}
                                onChange={(e) =>
                                    setUpdateMintTimeCollection(e.target.value)
                                }
                                placeholder="Collection Name"
                            />
                        </div>
                        <div>
                            <input
                                value={updateMintTimeintTimeCreator}
                                onChange={(e) =>
                                    setUpdateMintTimeintTimeCreator(
                                        e.target.value
                                    )
                                }
                                placeholder="Creator"
                            />
                        </div>
                        <div>
                            <input
                                value={updateMintStartTime}
                                onChange={(e) =>
                                    setUpdateMintStartTime(e.target.value)
                                }
                                placeholder="Start Time"
                            />
                        </div>
                        <div>
                            <input
                                value={updateMintEndTime}
                                onChange={(e) =>
                                    setUpdateMintEndTime(e.target.value)
                                }
                                placeholder="End Time"
                            />
                        </div>
                        <div>
                            <input
                                value={updateMintWLTime}
                                onChange={(e) =>
                                    setUpdateMintWLTime(e.target.value)
                                }
                                placeholder="Wl Time"
                            />
                        </div>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setAddPriorityUserFormVisible(true)}>
                    Add Priority Users
                </button>
                {isAddPriorityUserFormVisible && (
                    <form onSubmit={handleAddPriorityUsers}>
                        <div>
                            <input
                                value={priorityUsers}
                                onChange={(e) =>
                                    setPriorityUsers(e.target.value)
                                }
                                placeholder="Priority Users"
                            />
                        </div>
                        <button type="submit">Add</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setAddPresaleUserFormVisible(true)}>
                    Add Presale Users
                </button>
                {isAddPresaleUserFormVisible && (
                    <form onSubmit={handleAddPresaleUsers}>
                        <div>
                            <input
                                value={colCreatorPresale}
                                onChange={(e) =>
                                    setColCreatorPresale(e.target.value)
                                }
                                placeholder="Creator"
                            />
                        </div>
                        <div>
                            <input
                                value={colNamePresale}
                                onChange={(e) =>
                                    setColNamePresale(e.target.value)
                                }
                                placeholder="Collection Name"
                            />
                        </div>
                        <div>
                            <input
                                value={presaleAccounts}
                                onChange={(e) =>
                                    setPresaleAccounts(e.target.value)
                                }
                                placeholder="Accounts"
                            />
                        </div>
                        <button type="submit">Add</button>
                    </form>
                )}
            </div>

            <div>
                <button
                    onClick={() => setUpdateMintPublicPriceFormVisible(true)}
                >
                    Update Public Price
                </button>
                {isUpdateMintPublicPriceFormVisible && (
                    <form onSubmit={handleUpdatePublicPrice}>
                        <div>
                            <input
                                value={publicCreator}
                                onChange={(e) =>
                                    setPublicCreator(e.target.value)
                                }
                                placeholder="Creator"
                            />
                        </div>
                        <div>
                            <input
                                value={publicCol}
                                onChange={(e) => setPublicCol(e.target.value)}
                                placeholder="Collection"
                            />
                        </div>
                        <div>
                            <input
                                value={publicPrice}
                                onChange={(e) => setPublicPrice(e.target.value)}
                                placeholder="Price"
                            />
                        </div>
                        <button type="submit">UPDATE</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setUpdateMintWlPriceFormVisible(true)}>
                    Update WL Price
                </button>
                {isUpdateMintWlPriceFormVisible && (
                    <form onSubmit={handleUpdateWLPrice}>
                        <div>
                            <input
                                value={wlCreator}
                                onChange={(e) => setWLCreator(e.target.value)}
                                placeholder="Creator"
                            />
                        </div>
                        <div>
                            <input
                                value={wlCol}
                                onChange={(e) => setWLCol(e.target.value)}
                                placeholder="Collection"
                            />
                        </div>
                        <div>
                            <input
                                value={wlPrice}
                                onChange={(e) => setWLPrice(e.target.value)}
                                placeholder="Price"
                            />
                        </div>
                        <button type="submit">UPDATE</button>
                    </form>
                )}
            </div>

            <div>
                <button
                    onClick={() => setUpdateMintPresalePriceFormVisible(true)}
                >
                    Update Presale Price
                </button>
                {isUpdateMintPresalePriceFormVisible && (
                    <form onSubmit={handleUpdatePresalePrice}>
                        <div>
                            <input
                                value={presaleUpdatePriceCreator}
                                onChange={(e) =>
                                    setPresaleCreator(e.target.value)
                                }
                                placeholder="Creator"
                            />
                        </div>
                        <div>
                            <input
                                value={presaleUpdatePriceCol}
                                onChange={(e) => setPresaleCol(e.target.value)}
                                placeholder="Collection"
                            />
                        </div>
                        <div>
                            <input
                                value={presaleUpdatePricePrice}
                                onChange={(e) =>
                                    setPresalePrice(e.target.value)
                                }
                                placeholder="Price"
                            />
                        </div>
                        <button type="submit">UPDATE</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setColIdFormVisible(true)}>
                    Collection ID
                </button>
                {isColIdFormVisible && (
                    <form onSubmit={handleCollectionId}>
                        <div>
                            <input
                                value={colNameId}
                                onChange={(e) => setColNameId(e.target.value)}
                                placeholder="Collection Name"
                            />
                        </div>
                        <button type="submit">GET</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setReserveTknFormVisible(true)}>
                    Reserve Token
                </button>
                {isReserveTknFormVisible && (
                    <form onSubmit={handleReserveTkn}>
                        <div>
                            <input
                                value={reseveTknColName}
                                onChange={(e) =>
                                    setReseveTknColName(e.target.value)
                                }
                                placeholder="Collection Name"
                            />
                        </div>
                        <div>
                            <input
                                value={reserverAcc}
                                onChange={(e) => setReserverAcc(e.target.value)}
                                placeholder="Account"
                            />
                        </div>
                        <div>
                            <input
                                value={reserveTknAmount}
                                onChange={(e) =>
                                    setReserveTknAmount(e.target.value)
                                }
                                placeholder="Amount"
                            />
                        </div>
                        <button type="submit">Reserve</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setUnrevealedTknsFormVisible(true)}>
                    Unreavealed Tkns
                </button>
                {isUnrevealedTknsFormVisible && (
                    <form onSubmit={handleUnrevealedTkns}>
                        {/* <div>
              <input
                value={unrevealedColCreator}
                onChange={(e) => setUnrevealedColCreator(e.target.value)}
                placeholder="Creator"
              />
            </div> */}
                        <div>
                            <input
                                value={unrevealedColName}
                                onChange={(e) =>
                                    setUnrevealedColName(e.target.value)
                                }
                                placeholder="Collection Name"
                            />
                        </div>
                        <button type="submit"> Get</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setSyncFormVisible(true)}>
                    Sync With Ng
                </button>
                {isSyncFormVisible && (
                    <form onSubmit={handleSync}>
                        <div>
                            <input
                                value={syncColName}
                                onChange={(e) => setSyncColName(e.target.value)}
                                placeholder="Collection Name"
                            />
                        </div>
                        <div>
                            <input
                                value={syncTkns}
                                onChange={(e) => setSyncTkns(e.target.value)}
                                placeholder="Tokens"
                            />
                        </div>
                        <button type="submit"> Sync</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setClaimPassFormVisible(true)}>
                    Claim Pass NFTs
                </button>
                {isclaimPassFormVisible && (
                    <form onSubmit={handleClaimPassNft}>
                        <div>
                            <input
                                value={claimPassCol}
                                onChange={(e) =>
                                    setClaimPassCreator(e.target.value)
                                }
                                placeholder="Creator"
                            />
                        </div>
                        <div>
                            <input
                                value={claimPassAccList}
                                onChange={(e) =>
                                    setClaimPassAccList(e.target.value)
                                }
                                placeholder="Accounts"
                            />
                        </div>
                        <button type="submit">Claim</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setGetTknsFormVisible(true)}>
                    Tokens Owned
                </button>
                {isGetTknsFormVisible && (
                    <form onSubmit={handleAccTkns}>
                        <div>
                            <input
                                value={accTkn}
                                onChange={(e) => setAccTkn(e.target.value)}
                                placeholder="Account"
                            />
                        </div>
                        <button type="submit">Get</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setCreatePresaleFormVisible(true)}>
                    Create Presale
                </button>
                {isCreatePresaleFormVisible && (
                    <form onSubmit={handleCreatePresale}>
                        <div>
                            <input
                                value={createPresaleCol}
                                onChange={(e) =>
                                    setCreatePresaleCol(e.target.value)
                                }
                                placeholder="Collection Name"
                            />
                        </div>
                        <div>
                            <input
                                value={createPresalePrice}
                                onChange={(e) =>
                                    setCreatePresalePrice(e.target.value)
                                }
                                placeholder="Price"
                            />
                        </div>
                        <div>
                            <input
                                value={createPresaleStartDate}
                                onChange={(e) =>
                                    setCreatePresaleStartDate(e.target.value)
                                }
                                placeholder="Start Date"
                            />
                        </div>
                        <div>
                            <input
                                value={createPresaleStartTime}
                                onChange={(e) =>
                                    setCreatePresaleStartTime(e.target.value)
                                }
                                placeholder="Start Time"
                            />
                        </div>
                        <div>
                            <input
                                value={createPresaleEndDate}
                                onChange={(e) =>
                                    setCreatePresaleEndDate(e.target.value)
                                }
                                placeholder="End Date"
                            />
                        </div>
                        <div>
                            <input
                                value={createPresaleEndTime}
                                onChange={(e) =>
                                    setCreatePresaleEndTime(e.target.value)
                                }
                                placeholder="End Time"
                            />
                        </div>
                        <button type="submit">Create</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setCreateWlFormVisible(true)}>
                    Create WL
                </button>
                {isCreateWlFormVisible && (
                    <form onSubmit={handleCreateWl}>
                        <div>
                            <input
                                value={createWlCol}
                                onChange={(e) => setCreateWlCol(e.target.value)}
                                placeholder="Collection Name"
                            />
                        </div>
                        <div>
                            <input
                                value={createWlAdd}
                                onChange={(e) => setCreateWlAdd(e.target.value)}
                                placeholder="Address"
                            />
                        </div>
                        <div>
                            <input
                                value={createWlPrice}
                                onChange={(e) =>
                                    setCreateWlPrice(e.target.value)
                                }
                                placeholder="Price"
                            />
                        </div>
                        <div>
                            <input
                                value={createWlStartTime}
                                onChange={(e) =>
                                    setCreateWlStartTime(e.target.value)
                                }
                                placeholder="Start Time"
                            />
                        </div>
                        <button type="submit">Create</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setCreateAirdropFormVisible(true)}>
                    Create Airdrop
                </button>
                {isCreateAirdropFormVisible && (
                    <form onSubmit={handleCreateAirdrop}>
                        <div>
                            <input
                                value={createAirdropCol}
                                onChange={(e) =>
                                    setCreateAirdropCol(e.target.value)
                                }
                                placeholder="Collection Name"
                            />
                        </div>
                        <div>
                            <input
                                value={createAirdropAdd}
                                onChange={(e) =>
                                    setCreateAirdropAdd(e.target.value)
                                }
                                placeholder="Address"
                            />
                        </div>
                        <button type="submit">Create</button>
                    </form>
                )}
            </div>

            <div>
                <button onClick={() => setAirdropFormVisible(true)}>
                    Airdrop
                </button>
                {isAirdropFormVisible && (
                    <form onSubmit={handleAirdrop}>
                        <div>
                            <input
                                value={airdropCol}
                                onChange={(e) => setAirdropCol(e.target.value)}
                                placeholder="Collection Name"
                            />
                        </div>
                        <div>
                            <input
                                value={airdropAcc}
                                onChange={(e) => setAirdropAcc(e.target.value)}
                                placeholder="Account"
                            />
                        </div>
                        <div>
                            <input
                                value={airdropTokenId}
                                onChange={(e) =>
                                    setAirdropTokenId(e.target.value)
                                }
                                placeholder="TokenId"
                            />
                        </div>
                        <button type="submit">Airdrop</button>
                    </form>
                )}
            </div>

            //token list
            <div>
                <button onClick={() => setTokenListFormVisible(true)}>
                    Token List
                </button>
                {isTokenListFormVisible && (
                    <form onSubmit={handleTokenList}>
                        <div>
                            <input
                                value={accToken}
                                onChange={(e) => setAccToken(e.target.value)}
                                placeholder="Account"
                            />
                        </div>
                        <button type="submit">Get</button>
                    </form>
                )}
            </div>







            {/* <button onClick={() => setSellFormVisible(true)}>Sell</button>
      {isSellFormVisible && (
        <form onSubmit={handleSaleForm}>
          <div>
            <input
              value={saleTokenId}
              onChange={(e) => setSaleTokenId(e.target.value)}
              placeholder="Token Id"
            />
          </div>
          <div>
            <input
              value={saleOwner}
              onChange={(e) => setSaleOwner(e.target.value)}
              placeholder="saleOwner"
            />
          </div>
          <div>
            <input
              value={buyNowPrice}
              onChange={(e) => setBuyNowPrice(e.target.value)}
              placeholder="buyNowPrice"
            />
          </div>
          <div>
            <input
              value={saleStartDay}
              onChange={(e) => setSaleStartDay(e.target.value)}
              placeholder="saleStartDay"
            />
          </div>
          <div>
            <input
              value={saleEndDay}
              onChange={(e) => setSaleEndDay(e.target.value)}
              placeholder="saleEndDay"
            />
          </div>
          <div>
            <input
              value={saleType}
              onChange={(e) => setSaleType(e.target.value)}
              placeholder="saleType"
            />
          </div>
          <button type="submit">Sell</button>
        </form>
      )} */}
            <div></div>

            <div>
                <button onClick={getAllColRqst}>All Col Rqst</button>
                <button onClick={getAllCols}>All Cols</button>
                <button onClick={checkPublic}>Check Public</button>
                <button onClick={checkWl}>Check Wl</button>
                <button onClick={checkPresale}>Check Presale</button>
                <button onClick={getPriorityUsers}>getPriorityUsers</button>
                <div>
                    <button onClick={saleFunction}>Sell</button>
                </div>
            </div>
        </>
    );
};
export default Launchpad;
