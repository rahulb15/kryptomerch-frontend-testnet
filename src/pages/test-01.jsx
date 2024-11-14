// import Pact from "pact-lang-api";
import React, { useState, useEffect } from "react";
import {
  createClient,
  Pact,
  createSignWithChainweaver,
  createEckoWalletQuicksign,
} from "@kadena/client";
import { event } from "pact-lang-api";
import styled from "styled-components";
const signWithChainweaver = createSignWithChainweaver();
const eckoWallet = createEckoWalletQuicksign();


const coin_fungible = {
  refSpec: [{ namespace: null, name: "fungible-v2" }],
  refName: { namespace: null, name: "coin" },
};

// ██╗░░██╗  ░░░░░░  ░██╗░░░░░░░██╗░█████╗░██╗░░░░░██╗░░░░░███████╗████████╗
// ╚██╗██╔╝  ░░░░░░  ░██║░░██╗░░██║██╔══██╗██║░░░░░██║░░░░░██╔════╝╚══██╔══╝
// ░╚███╔╝░  █████╗  ░╚██╗████╗██╔╝███████║██║░░░░░██║░░░░░█████╗░░░░░██║░░░
// ░██╔██╗░  ╚════╝  ░░████╔═████║░██╔══██║██║░░░░░██║░░░░░██╔══╝░░░░░██║░░░
// ██╔╝╚██╗  ░░░░░░  ░░╚██╔╝░╚██╔╝░██║░░██║███████╗███████╗███████╗░░░██║░░░
// ╚═╝░░╚═╝  ░░░░░░  ░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝╚══════╝╚══════╝╚══════╝░░░╚═╝░░░

const Launchpad = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const isEckoWalletInstalled = eckoWallet.isInstalled();
  //     if (!isEckoWalletInstalled) {
  //       alert(`Wallet not installed`);
  //     }

  //     const isEckoWalletConnected = await eckoWallet.isConnected();
  //     console.log(isEckoWalletConnected);

  //     if (!isEckoWalletConnected) {
  //       await eckoWallet.connect(NETWORK_ID);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // const NETWORK_ID = "mainnet01";

  const dec = (x) => ({ decimal: x.toString() });

  const coin_fungible = {
    refSpec: [{ name: "fungible-v2" }],
    refName: { name: "coin" },
  };

  const to_module = ({ refName }) =>
    refName.namespace ? `${refName.namespace}.${refName.name}` : refName.name;

  const to_fungible = to_module;

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
  //   "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";
  const admin = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;


  // const [wallet, setWallet] = useState("ecko");
  const [wallet, setWallet] = useState("CW");
  const [collectionRequestName, setCollectionRequestName] = useState("");
  const [collectionRequestSymbol, setCollectionRequestSymbol] = useState("");
  const [collectionRequestCreator, setCollectionRequestCreator] = useState("");
  const [collectionRequestDescription, setCollectionRequestDescription] =
    useState("");
  const [collectionRequestCategory, setCollectionRequestCategory] =
    useState("");
  const [collectionRequestSupply, setCollectionRequestSupply] = useState("");
  const [collectionRequestUriList, setCollectionRequestUriList] = useState("");
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
  const [collectionRequestEnableFreeMint, setCollectionRequestEnableFreeMint] =
    useState(false);
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

  const [accToken, setAccToken] = useState("");
  const [isTokenListForm, setTokenListForm] = useState(false);

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
    await addPresaleUsers(colCreatorPresale, colNamePresale, presaleAccounts);
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

  const handleTokenList = async (event) => {
    event.preventDefault();
    await TokenList(accToken);
    setTokenListForm(false);
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
    await createWl(createWlCol, createWlAdd, createWlPrice, createWlStartTime);
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

  const addRoles = async () => {
    const account = admin;
    const publicKey = account.slice(2, account.length);
    const guard = { keys: [publicKey], pred: "keys-all" };
    const pactCode = `(free.lptest001.add-roles "discount"  ["k:4d9164c50cb076f74c7d1db45ea6a64dc0c1ab31e8fcf0efce045fabb620f8ee"])`;

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

    console.log("addRoles", txn);
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
        alert(`Roles alloted sccessfully`);
      }
      console.log("response", response);
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };
  const collectionRequest = async () => {
    const collectionRequestName = "K/C-CW-107";
    const collectionRequestSymbol = "";
    // const collectionRequestCreator = "k:57dd1796e919ac60b91d4b6b345c1676b864f12ee9da10d00991b2a29f2f2b43";
    const collectionRequestCreator = "k:4d9164c50cb076f74c7d1db45ea6a64dc0c1ab31e8fcf0efce045fabb620f8ee";
      // "k:f0e2252089c002f349633b4d410ae023df419dd3939e193f6ebfaac81b048527";
    const collectionRequestDescription = "";
    const collectionRequestCategory = "ART";
    const collectionRequestSupply = 4;
    const collectionRequestUriList = [
      "ipfs://bafkreifabzsykcr23o2xyzovys6olid63oaxrb3i3by32caklymlvm5u",
      "ipfs://bafkreic5iyftd6mus6o7llctwpgxyarkcz55jyot3rya6y3y5teu",
      "ipfs://bafkreid3gpivbqhqcjv7zpn4oj2na5dthsrlkdxyjmnm4qaqta",
      "ipfs://bafkreicm7uen4kb3y7nwoexrsx7fmtbfufslidbesfsbzfi2lguy",
    ];
    const collectionRequestMintPrice = 1.0;
    const collectionRequestRoyalityPerc = 0.01;
    const collectionRequestRoyalityAdd =
      "k:c319a21036fa3b5553d35203e1a205188f8161972c281f2f9980be281c2b4687";
    const collectionRequestCoverImgUrl = "";
    const collectionRequestBannerImgUrl = "";
    const collectionRequestStartDate = "";

    const collectionRequesEndDate = "";
    const collectionRequestEnableFreeMint = false;
    const collectionRequestEnableWl = true;
    const collectionRequestEnablePresale = true;
    const collectionRequestEnableAirdrop = false;
    const collectionRequestPolicy =
      "COLLECTION INSTANT-MINT MARKETPLACE FIXED-SALE ADJUSTABLE-ROYALTY";

    const launchFee = await getLaunchFee();
    const primeRole = await getPrimeRoleUsers();
    const discountRole = await getDiscountRoleUsers();
    const discountRate = await getDiscountRate();
    const discountFee = (launchFee * (1 - discountRate))

    console.log("discountFee",discountFee)
    const account = collectionRequestCreator;

    const primeRoleArray = primeRole.split(" ");
    const discountRoleArray = discountRole.split(" ");

    // Check if the account exists in primeRole or discountRole

    const publicKey = account.slice(2, account.length);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const pactCode = `(free.lptest001.nft-collection-request 
                                                        ${JSON.stringify(collectionRequestName)}  
                                                        ${JSON.stringify(collectionRequestSymbol)}  
                                                        ${JSON.stringify(account)}        
                                                        (read-keyset  "guard")
                                                        ${JSON.stringify(collectionRequestDescription)}
                                                        ${JSON.stringify(collectionRequestCategory)}
                                                        4
      [
        "ipfs://bafkreifabzsykcr23o2xyzovys6olid63oaxrb3i3by32caklymlvm5u",
        "ipfs://bafkreic5iyftd6mus6o7llctwpgxyarkcz55jyot3rya6y3y5teu",
        "ipfs://bafkreid3gpivbqhqcjv7zpn4oj2na5dthsrlkdxyjmnm4qaqta",
        "ipfs://bafkreicm7uen4kb3y7nwoexrsx7fmtbfufslidbesfsbzfi2lguy"
      ] 
                                                        1.0
                                                        ${collectionRequestRoyalityPerc}
                                                        "k:c319a21036fa3b5553d35203e1a205188f8161972c281f2f9980be281c2b4687"
                                                        ${JSON.stringify(collectionRequestCoverImgUrl)}
                                                        ${JSON.stringify(collectionRequestBannerImgUrl)}
                                                        ${JSON.stringify(collectionRequestStartDate)}
                                                        (time "2024-03-22T14:00:00Z")
                                                        ${JSON.stringify(collectionRequesEndDate)}       
                                                        (time "2025-03-22T14:00:00Z") 
                                                        ${collectionRequestEnableFreeMint}                 
                                                        ${collectionRequestEnableWl} 
                                                        ${collectionRequestEnablePresale} 
                                                        ${collectionRequestEnableAirdrop} 
                                                        ${JSON.stringify(collectionRequestPolicy)}
                                                        )
                                                        `;
    // (time "2024-05-24T00:58:27Z")
    let txn;
    // console.log("primeRoleArray",primeRoleArray)

    if (primeRoleArray.includes(account)) {
      console.log("primeRoleArray i am here")

      txn = Pact.builder
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
        // console.log(txn)
    } else if (discountRoleArray.includes(account)) {
      txn = Pact.builder
        .execution(pactCode)
        .addData("guard", guard)
        .addSigner(publicKey, (withCapability) => [
          withCapability("coin.GAS"),
          withCapability("coin.TRANSFER", account, admin, discountFee),
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
          withCapability("coin.TRANSFER", account, admin, launchFee),
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

      console.log("create_collection", txn);
      console.log("sign");

      const localResponse = await client.local(txn, {
        preflight: false,
        signatureVerification: false,
      });
      // console.log("localResponse",localResponse.result)
      // 
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
          alert(`Collection: ${collectionRequestName} Resqeusted Successfully`);
        }
        console.log("response", response);
      } else {
        console.log("Error in local response", localResponse.result.error);
      }
    
  };

  const launchCollection = async (launchCollectionName) => {
    const account = admin;
    const publicKey = account.slice(2, account.length);
    const guard = { keys: [publicKey], pred: "keys-all" };
    const pactCode = `(free.lptest001.launch-collection  ${JSON.stringify(launchCollectionName)})`;

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
        alert(`Collection: ${launchCollectionName} Has Launched Successfully`);
      }
      console.log("response", response);
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };

  const denyCollection = async (launchCollectionName) => {
    const account = admin;
    const publicKey = account.slice(2, account.length);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const pactCode = `(free.lptest001.deny-collection ${JSON.stringify(launchCollectionName)})`;

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
        alert(`Collection: ${launchCollectionName} Has Launched Successfully`);
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

    const pactCode = `(free.lptest001.create-ng-collection  ${JSON.stringify(collectionNg)}
                                                            ${JSON.stringify(account)}
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
        alert(`Collection: ${collectionNg} Successfully synced with NG`);
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

    const pactCode = `(free.lptest001.update-mint-time ${JSON.stringify(updateMintTimeCollection)} (read-keyset 'guard) ${updateMintStartTime} ${updateMintEndTime} ${updateMintWLTime})`;

    const txn = Pact.builder
      .execution(pactCode)
      .addData("guard", guard)
      .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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

    const pactCode = `(free.lptest001.add-to-presale ${JSON.stringify(account)} (read-keyset 'guard) ${JSON.stringify(colNamePresale)} ${presaleAccounts})`;

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

    const pactCode = `(free.lptest001.update-public-price ${JSON.stringify(publicCol)} (read-keyset 'guard) ${publicPrice})`;

    const txn = Pact.builder
      .execution(pactCode)
      .addData("guard", guard)
      .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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

    const pactCode = `(free.lptest001.update-wl-price ${JSON.stringify(wlCol)} (read-keyset 'guard) ${wlPrice})`;

    const txn = Pact.builder
      .execution(pactCode)
      .addData("guard", guard)
      .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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

    const pactCode = `(free.lptest001.update-presale-mint-price ${JSON.stringify(presaleUpdatePriceCol)} (read-keyset 'guard) ${presaleUpdatePricePrice})`;

    const txn = Pact.builder
      .execution(pactCode)
      .addData("guard", guard)
      .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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
    const pactCode = `(free.lptest001.get-collection-id ${JSON.stringify(colNameId)})`;

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

    const pactCode = `(free.lptest001.reserve-token ${JSON.stringify(reseveTknColName)} ${JSON.stringify(account)} ${reserveTknAmount})`;

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
          withCapability("coin.TRANSFER", account, creator, mintPrice),
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

    const pactCode = `(free.lptest001.get-unrevealed-tokens-for-collection ${JSON.stringify(unrevealedColName)} (read-keyset  "guard"))`;

    const txn = Pact.builder
      .execution(pactCode)
      .addData("guard", guard)
      .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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

  // const getRoyaltyAddress = async (colName) => {
  const getRoyaltyAddress = async () => {
    const colName = "K/C-CW-105";
    const pactCode = `(free.lptest001.get-royalty-info ${JSON.stringify(colName)} "account")`;

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
      console.log(response.result.error);
    }
  };

  // const getRoyaltyPerc = async (colName) => {
  const getRoyaltyPerc = async () => {
    const colName = "K/C-CW-105";

    const pactCode = `(free.lptest001.get-royalty-info ${JSON.stringify(colName)} "rate")`;

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
      console.log(response.result.error);
    }
  };

  const getRoyaltyInfo = async () => {
    const colName = "K/C-CW-105";
    const pactCode = `(free.lptest001.get-royalty-info ${JSON.stringify(colName)} "both")`;

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
      const inputString = response.result.data;
      const regex = /Royalty Rate (\d+\.\d+) and Royalty Account (k:\w+)/;
      const matches = inputString.match(regex);

      if (matches) {
        const royaltyRate = matches[1];
        const royaltyAccount = matches[2];

        console.log(`Royalty Rate: ${royaltyRate}`);
        console.log(`Royalty Account: ${royaltyAccount}`);
      } else {
        console.log("No matches found");
        // return response.result.data;
      }
    } else {
      console.log(response.result.error);
    }
  };

  const updateRoyaltyInfo = async () => {
    const colName = "K/C-CW-105";
    const account = await getColCreator(colName);
    console.log("Account", account);
    const publicKey = account.slice(2, account.length);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const pactCode = `(free.lptest001.update-royalty-info ${JSON.stringify(colName)} (read-keyset 'guard) "k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf" 0.03)`;

    const txn = Pact.builder
      .execution(pactCode)
      .addData("guard", guard)
      .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
      .setMeta({
        creationTime: creationTime(),
        sender: account,
        gasLimit: 150000,
        chainId: CHAIN_ID,
        ttl: 28800,
      })
      .setNetworkId(NETWORK_ID)
      .createTransaction();

    console.log("updateRoyaltyInfo", txn);
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
      console.log(response.result.data);
      console.log("response", response);
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };

  const syncWithNg = async () => {
    // const syncWithNg = async (syncColName, syncTkns) => {
    const syncColName = "K/C-CW-106";
    const syncTkns = [1];
    // const colId = await collectionId("K/C-CW-106");
    const colId = await collectionId(syncColName);
    // const account = await getColCreator("K/C-CW-106");
    const account = await getColCreator(syncColName);

    const royaltyAddress = await getRoyaltyAddress(syncColName);
    const royaltyPerc = await getRoyaltyPerc(syncColName);

    console.log(
      `royaltyAddress: ${royaltyAddress}, royaltyPerc: ${royaltyPerc}`
    );

    const publicKey = account.slice(2, account.length);
    const publicKeyRoyalty = royaltyAddress.slice(2, royaltyAddress.length);

    const guard = { keys: [publicKey], pred: "keys-all" };
    const guardRoyalty = { keys: [publicKeyRoyalty], pred: "keys-all" };

    const pactCode = `(free.lptest001.bulk-sync-with-ng ${JSON.stringify(syncColName)} [1])`;
    // const pactCode = `(free.lptest001.bulk-sync-with-ng ${JSON.stringify(syncColName)} ${syncTkns})`;
    let txn;

    if (royaltyAddress != "" && royaltyPerc > 0.0 && royaltyPerc <= 1.0) {
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
    } else {
      txn = Pact.builder
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
    }

    console.log("syncWithNg", txn);
    console.log("sign");

    const localResponse = await client.local(txn, {
      preflight: false,
      signatureVerification: false,
    });

    console.log(localResponse.result);

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

  const claimPassNft = async (claimPassCol, claimPassAccList) => {
    const account = await getColCreator(claimPassCol);
    const publicKey = account.slice(2, account.length);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const pactCode = `(free.lptest001.claim-pass-nft ${JSON.stringify(claimPassCol)} ${JSON.stringify(claimPassAccList)} (read-keyset 'guard))`;

    const txn = Pact.builder
      .execution(pactCode)
      .addData("guard", guard)
      .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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
    const pactCode = `(free.lptest001.check-public ${JSON.stringify(colName)})`;

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
    const pactCode = `(free.lptest001.check-whitelist ${JSON.stringify(colName)})`;

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
    const pactCode = `(free.lptest001.check-presale ${JSON.stringify(colName)})`;

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
    const pactCode = `(free.lptest001.get-mint-price ${JSON.stringify(colName)})`;

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
    const pactCode = `(free.lptest001.get-wl-price ${JSON.stringify(colName)})`;

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
    const pactCode = `(free.lptest001.get-presale-price ${JSON.stringify(colName)})`;

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
    const pactCode = `(free.lptest001.get-collection-creator ${JSON.stringify(colName)})`;

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
    const pactCode = `(free.lptest001.get-all-tokens-by-account ${JSON.stringify(account)})`;

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

  const getPrimeRoleUsers = async () => {
    const account = accTkn;
    const pactCode = `(free.lptest001.get-prime-role)`;

    const txn = Pact.builder
      .execution(pactCode)
      .setMeta({ chainId: CHAIN_ID })
      .setNetworkId(NETWORK_ID)
      .createTransaction();

    const localResponse = await client.local(txn, {
      preflight: false,
      signatureVerification: false,
    });

    if (localResponse.result.status == "success") {
      let users = localResponse.result.data;
      console.log("users", users);
      return users;
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };

  const getDiscountRoleUsers = async () => {
    const account = accTkn;
    const pactCode = `(free.lptest001.get-discount-role)`;

    const txn = Pact.builder
      .execution(pactCode)
      .setMeta({ chainId: CHAIN_ID })
      .setNetworkId(NETWORK_ID)
      .createTransaction();

    const localResponse = await client.local(txn, {
      preflight: false,
      signatureVerification: false,
    });

    if (localResponse.result.status == "success") {
      let users = localResponse.result.data;
      console.log("users", users);
      return users;
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };

  const getDiscountRate = async () => {
    const account = accTkn;
    const pactCode = `(free.lptest001.get-collection-discount-fee)`;

    const txn = Pact.builder
      .execution(pactCode)
      .setMeta({ chainId: CHAIN_ID })
      .setNetworkId(NETWORK_ID)
      .createTransaction();

    const localResponse = await client.local(txn, {
      preflight: false,
      signatureVerification: false,
    });

    if (localResponse.result.status == "success") {
      let discount = localResponse.result.data;
      console.log("users", discount);
      return discount;
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };

  const getLaunchFee = async () => {
    const pactCode = `(free.lptest001.get-collection-launch-fee)`;

    const txn = Pact.builder
      .execution(pactCode)
      .setMeta({ chainId: CHAIN_ID })
      .setNetworkId(NETWORK_ID)
      .createTransaction();

    const localResponse = await client.local(txn, {
      preflight: false,
      signatureVerification: false,
    });

    if (localResponse.result.status == "success") {
      let fee = localResponse.result.data;
      console.log("fee", fee);
      return fee;
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };
  //FinalTestCol001|t:qywB2xI6TQ5aQNi_V7nRfmKdxZmjDojbWZ6_tRePzww

  const createPresale = async () =>
    // createPresaleCol,
    // createPresalePrice,
    // createPresaleStartDate,
    // createPresaleStartTime,
    // createPresaleEndDate,
    // createPresaleEndTime
    {
      const account = await getColCreator("monkeym12");
      // const account = await getColCreator(createPresaleCol);
      console.log(account);

      const publicKey = account.slice(2, account.length);
      const guard = { keys: [publicKey], pred: "keys-all" };

      const pactCode = `(free.lptest001.create-presale 
                                                    ${JSON.stringify(account)} 
                                                    (read-keyset  "guard")  
                                                    "monkeym12"
                                                    1.0
                                                    ""
                                                    (time "2024-03-22T14:00:00Z") 
                                                    ""
                                                    (time "2025-03-22T14:00:00Z"))`;

      // const pactCode = `(free.lptest001.create-presale
      //                                                     ${JSON.stringify(account)}
      //                                                     (read-keyset  "guard")
      //                                                     ${JSON.stringify(createPresaleCol)}
      //                                                     ${createPresalePrice}
      //                                                     ${JSON.stringify(createPresaleStartDate)}
      //                                                     ${JSON.stringify(createPresaleEndDate)}
      //                                                     ${createPresaleEndTime})`;

      const txn = Pact.builder
        .execution(pactCode)
        .addData("guard", guard)
        .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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
                                                      ${JSON.stringify(createWlCol)} 
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
      .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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
                                                      ${JSON.stringify(createAirdropCol)} 
                                                      (read-keyset  "guard") 
                                                      ${createAirdropAdd} )`;
    const txn = Pact.builder
      .execution(pactCode)
      .addData("guard", guard)
      .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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

    const pactCode = `(free.lptest001.airdrop-nft ${JSON.stringify(airdropCol)} ${JSON.stringify(airdropAcc)} ${JSON.stringify(airdropTokenId)} ${JSON.stringify(account)} (read-keyset  "guard"))`;

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

  const tokenOps = async (account) => {
    const pactCode = `(free.lptest001.get-token-details ${JSON.stringify(account)})`;
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
      let data = response.result.data;
      console.log("data", data);
    } else {
      console.log(response.result.error);
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
        .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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
        .addSigner(publicKey, (withCapability) => [withCapability("coin.GAS")])
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
        const response = await client.pollStatus(transactionDescriptor, {});
        console.log("response-pollStatus", response);
      } else {
        console.log(localResponseKm.result.error);
      }
    };

  const TokenList = async (accToken) => {
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
      const pactCode3 = `(n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-collection.get-token-collection  ${JSON.stringify(tokenArray[i])})`;

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
      } else {
        console.log(localResponse3.result.error);
      }
    }

    console.log("Uri List", tokensUri);
    console.log("ColName", colNames);
  };

  return (
    <Wrapper>
      <Button onClick={() => setTokenListForm(true)}> Token List</Button>
      {isTokenListForm && (
        <form onSubmit={handleTokenList}>
          <div>
            <input
              value={accToken}
              onChange={(e) => setAccToken(e.target.value)}
              placeholder="Account"
            />
          </div>
          <Button type="submit">Get</Button>
        </form>
      )}

      <Button onClick={collectionRequest}> RQST </Button>
      <div>
        <Button onClick={() => setLaunchCollectionFormVisible(true)}>
          Launch Collection
        </Button>
        {isLaunchCollectionFormVisible && (
          <form onSubmit={handleLaunchCollection}>
            <div>
              <input
                type="text"
                value={launchCollectionName}
                onChange={(e) => setLaunchCollectionName(e.target.value)}
                placeholder="Collection Name"
              />
            </div>
            <Button type="submit">Launch</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setNgCollectionFormVisible(true)}>
          Create NG Collection
        </Button>
        {isNgCollectionFormVisible && (
          <form onSubmit={handleCreateNgCollection}>
            <div>
              <input
                value={collectionNg}
                onChange={(e) => setCollectionNg(e.target.value)}
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
            <Button type="submit">Create</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setUpdateMintTimeFormVisible(true)}>
          Update Mint Time
        </Button>
        {isUpdateMintTimeFormVisible && (
          <form onSubmit={handleUpdateMintTime}>
            <div>
              <input
                value={updateMintTimeCollection}
                onChange={(e) => setUpdateMintTimeCollection(e.target.value)}
                placeholder="Collection Name"
              />
            </div>
            <div>
              <input
                value={updateMintTimeintTimeCreator}
                onChange={(e) =>
                  setUpdateMintTimeintTimeCreator(e.target.value)
                }
                placeholder="Creator"
              />
            </div>
            <div>
              <input
                value={updateMintStartTime}
                onChange={(e) => setUpdateMintStartTime(e.target.value)}
                placeholder="Start Time"
              />
            </div>
            <div>
              <input
                value={updateMintEndTime}
                onChange={(e) => setUpdateMintEndTime(e.target.value)}
                placeholder="End Time"
              />
            </div>
            <div>
              <input
                value={updateMintWLTime}
                onChange={(e) => setUpdateMintWLTime(e.target.value)}
                placeholder="Wl Time"
              />
            </div>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setAddPriorityUserFormVisible(true)}>
          Add Priority Users
        </Button>
        {isAddPriorityUserFormVisible && (
          <form onSubmit={handleAddPriorityUsers}>
            <div>
              <input
                value={priorityUsers}
                onChange={(e) => setPriorityUsers(e.target.value)}
                placeholder="Priority Users"
              />
            </div>
            <Button type="submit">Add</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setAddPresaleUserFormVisible(true)}>
          Add Presale Users
        </Button>
        {isAddPresaleUserFormVisible && (
          <form onSubmit={handleAddPresaleUsers}>
            <div>
              <input
                value={colCreatorPresale}
                onChange={(e) => setColCreatorPresale(e.target.value)}
                placeholder="Creator"
              />
            </div>
            <div>
              <input
                value={colNamePresale}
                onChange={(e) => setColNamePresale(e.target.value)}
                placeholder="Collection Name"
              />
            </div>
            <div>
              <input
                value={presaleAccounts}
                onChange={(e) => setPresaleAccounts(e.target.value)}
                placeholder="Accounts"
              />
            </div>
            <Button type="submit">Add</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setUpdateMintPublicPriceFormVisible(true)}>
          Update Public Price
        </Button>
        {isUpdateMintPublicPriceFormVisible && (
          <form onSubmit={handleUpdatePublicPrice}>
            <div>
              <input
                value={publicCreator}
                onChange={(e) => setPublicCreator(e.target.value)}
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
            <Button type="submit">UPDATE</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setUpdateMintWlPriceFormVisible(true)}>
          Update WL Price
        </Button>
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
            <Button type="submit">UPDATE</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setUpdateMintPresalePriceFormVisible(true)}>
          Update Presale Price
        </Button>
        {isUpdateMintPresalePriceFormVisible && (
          <form onSubmit={handleUpdatePresalePrice}>
            <div>
              <input
                value={presaleUpdatePriceCreator}
                onChange={(e) => setPresaleCreator(e.target.value)}
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
                onChange={(e) => setPresalePrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <Button type="submit">UPDATE</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setColIdFormVisible(true)}>Collection ID</Button>
        {isColIdFormVisible && (
          <form onSubmit={handleCollectionId}>
            <div>
              <input
                value={colNameId}
                onChange={(e) => setColNameId(e.target.value)}
                placeholder="Collection Name"
              />
            </div>
            <Button type="submit">GET</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setReserveTknFormVisible(true)}>
          Reserve Token
        </Button>
        {isReserveTknFormVisible && (
          <form onSubmit={handleReserveTkn}>
            <div>
              <input
                value={reseveTknColName}
                onChange={(e) => setReseveTknColName(e.target.value)}
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
                onChange={(e) => setReserveTknAmount(e.target.value)}
                placeholder="Amount"
              />
            </div>
            <Button type="submit">Reserve</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setUnrevealedTknsFormVisible(true)}>
          Unreavealed Tkns
        </Button>
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
                onChange={(e) => setUnrevealedColName(e.target.value)}
                placeholder="Collection Name"
              />
            </div>
            <Button type="submit"> Get</Button>
          </form>
        )}
      </div>

      <Button onClick={syncWithNg}>
        <h1>Sync</h1>
      </Button>
      <div>
        <Button onClick={() => setClaimPassFormVisible(true)}>
          Claim Pass NFTs
        </Button>
        {isclaimPassFormVisible && (
          <form onSubmit={handleClaimPassNft}>
            <div>
              <input
                value={claimPassCol}
                onChange={(e) => setClaimPassCreator(e.target.value)}
                placeholder="Creator"
              />
            </div>
            <div>
              <input
                value={claimPassAccList}
                onChange={(e) => setClaimPassAccList(e.target.value)}
                placeholder="Accounts"
              />
            </div>
            <Button type="submit">Claim</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setGetTknsFormVisible(true)}>
          Tokens Owned
        </Button>
        {isGetTknsFormVisible && (
          <form onSubmit={handleAccTkns}>
            <div>
              <input
                value={accTkn}
                onChange={(e) => setAccTkn(e.target.value)}
                placeholder="Account"
              />
            </div>
            <Button type="submit">Get</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setCreatePresaleFormVisible(true)}>
          Create Presale
        </Button>
        {isCreatePresaleFormVisible && (
          <form onSubmit={handleCreatePresale}>
            <div>
              <input
                value={createPresaleCol}
                onChange={(e) => setCreatePresaleCol(e.target.value)}
                placeholder="Collection Name"
              />
            </div>
            <div>
              <input
                value={createPresalePrice}
                onChange={(e) => setCreatePresalePrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div>
              <input
                value={createPresaleStartDate}
                onChange={(e) => setCreatePresaleStartDate(e.target.value)}
                placeholder="Start Date"
              />
            </div>
            <div>
              <input
                value={createPresaleStartTime}
                onChange={(e) => setCreatePresaleStartTime(e.target.value)}
                placeholder="Start Time"
              />
            </div>
            <div>
              <input
                value={createPresaleEndDate}
                onChange={(e) => setCreatePresaleEndDate(e.target.value)}
                placeholder="End Date"
              />
            </div>
            <div>
              <input
                value={createPresaleEndTime}
                onChange={(e) => setCreatePresaleEndTime(e.target.value)}
                placeholder="End Time"
              />
            </div>
            <Button type="submit">Create</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setCreateWlFormVisible(true)}>Create WL</Button>
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
                onChange={(e) => setCreateWlPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div>
              <input
                value={createWlStartTime}
                onChange={(e) => setCreateWlStartTime(e.target.value)}
                placeholder="Start Time"
              />
            </div>
            <Button type="submit">Create</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setCreateAirdropFormVisible(true)}>
          Create Airdrop
        </Button>
        {isCreateAirdropFormVisible && (
          <form onSubmit={handleCreateAirdrop}>
            <div>
              <input
                value={createAirdropCol}
                onChange={(e) => setCreateAirdropCol(e.target.value)}
                placeholder="Collection Name"
              />
            </div>
            <div>
              <input
                value={createAirdropAdd}
                onChange={(e) => setCreateAirdropAdd(e.target.value)}
                placeholder="Address"
              />
            </div>
            <Button type="submit">Create</Button>
          </form>
        )}
      </div>

      <div>
        <Button onClick={() => setAirdropFormVisible(true)}>Airdrop</Button>
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
                onChange={(e) => setAirdropTokenId(e.target.value)}
                placeholder="TokenId"
              />
            </div>
            <Button type="submit">Airdrop</Button>
          </form>
        )}
      </div>

      <Button onClick={getAllColRqst}>All Col Rqst</Button>
      <Button onClick={getAllCols}>All Cols</Button>
      <Button onClick={checkPublic}>Check Public</Button>
      <Button onClick={checkWl}>Check Wl</Button>
      <Button onClick={checkPresale}>Check Presale</Button>
      <Button onClick={getPriorityUsers}>getPriorityUsers</Button>
      <div>
        <Button onClick={saleFunction}>Sell</Button>
      </div>
      <div>
        <Button onClick={createPresale}>CreatePresale</Button>
      </div>

      <Button onClick={getRoyaltyAddress}>getRoyaltyAddress</Button>
      <Button onClick={getRoyaltyPerc}>getRoyaltyPerc</Button>
      <Button onClick={getRoyaltyInfo}>getRoyaltyInfo</Button>
      <Button onClick={updateRoyaltyInfo}>updateRoyaltyInfo</Button>
      <Button
        onClick={() =>
          tokenOps(
            "k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"
          )
        }
      >
        Token-Data
      </Button>
      <Button onClick={getPrimeRoleUsers}>Prime Users</Button>
      <Button onClick={getDiscountRoleUsers}>Discount Users</Button>
      <Button onClick={getDiscountRate}>DiscountRate</Button>
      <Button onClick={getLaunchFee}>LaunchFee</Button>
      <Button onClick={addRoles}>AddRoles</Button>
    </Wrapper>
  );
};
export default Launchpad;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh; /* Make sure it can grow with content */
  overflow-y: auto;
`;

const Button = styled.button`
  color: black;
  padding: 10px 18px;
  background: white;
  border-radius: 5px;
  min-width: 220px;
  border: none;
  font-size: 16px;
  margin-top: 1vh;
  cursor: pointer;
  border: 1px solid transparent;
  transition: 0.4s background ease-in;

  &:hover {
    background-color: black;
    color: white;
    border: 1px solid black;
    transition: 0.3s background ease-in;
  }
`;
