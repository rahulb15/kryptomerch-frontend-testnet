// import React, {
//     useEffect,
//     useState,
//     useCallback,
//     useRef,
//     useMemo,
// } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import axios from "axios";
// import Sticky from "@ui/sticky";
// import CollectionDetailTab from "@components/product-details/collection-detail-tab";
// import ProductTitle from "@components/product-details/title";
// import { Range } from "react-range";
// import { Rings } from "react-loader-spinner";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import moment from "moment";
// import { useAccountContext } from "src/contexts";
// import collectionService from "src/services/collection.service";
// import { useCollectionTypeFunctions } from "src/hooks/useCollectionTypeFunctions";
// import { useCreateNFTMutation } from "src/services/nft.service";
// import Loader from "@components/loader";
// import { useWalletConnectClient } from "src/contexts/WalletConnectContext";
// import {
//     useGetPriorityUsersQuery,
//     useGetPassBalanceQuery,
//     useGetPassClaimQuery,
//     useGetUriListQuery,
// } from "src/services/launchpad.service";

// const CollectionDetailsArea = ({ space, className, product, refresh }) => {
//     // State variables
//     const [isLoading, setIsLoading] = useState(false);
//     const [stageInfo, setStageInfo] = useState({
//         currentStage: null,
//         isLive: false,
//         price: 0,
//     });
//     console.log("Stage Info:", stageInfo);
//     const [kdatoUsd, setKdatoUsd] = useState(0);
//     const [iagree, setIagree] = useState(false);
//     const [swap, setSwap] = useState(false);
//     const [reservePrice, setReservePrice] = useState(0);
//     const [passInfo, setPassInfo] = useState({
//         isPriorityUser: false,
//         passBalance: 0,
//         passClaimed: false,
//         passAccFlag: false,
//     });
//     const [launchInfo, setLaunchInfo] = useState({
//         status: "Upcoming",
//         text: "",
//         time: "",
//     });

//     const [stageApplications, setStageApplications] = useState({
//         presale: {
//             hasApplied: false,
//             isLoading: false,
//         },
//         whitelist: {
//             hasApplied: false,
//             isLoading: false,
//         },
//     });

//     // Hooks
//     const account = useAccountContext();
//     const [createNFT] = useCreateNFTMutation();
//     console.log("product:", product);
//     const { data: uriList, refetch: refetchUriList } = useGetUriListQuery({
//         collectionName: product?.collectionName,
//         isMarketplace: product?.collectionType === "marketplace" ? true : false,
//     });
//     console.log("URI List:", uriList);
//     const { client: wcClient, session: wcSession } = useWalletConnectClient();
//     const { data: priorityUsers } = useGetPriorityUsersQuery();
//     console.log("Priority Users:", priorityUsers);
//     const { data: passBalance } = useGetPassBalanceQuery(
//         account?.user?.walletAddress
//     );
//     const { data: passClaimed } = useGetPassClaimQuery({
//         colName: product?.collectionName,
//         account: account?.user?.walletAddress,
//     });

//     // Memoized values and functions
//     const memoizedCollectionName = useMemo(
//         () => product.collectionName,
//         [product.collectionName]
//     );
//     const {
//         checkIsPublic,
//         checkIsWhitelist,
//         checkIsPresale,
//         checkPrice,
//         reserveTokensFunction,
//     } = useCollectionTypeFunctions(product.collectionType);

//     const memoizedFunctions = useMemo(
//         () => ({
//             checkIsPublic,
//             checkIsWhitelist,
//             checkIsPresale,
//             checkPrice,
//         }),
//         [checkIsPublic, checkIsWhitelist, checkIsPresale, checkPrice]
//     );

//     // Ref for tracking the number of times checkStages has been called
//     const checkCountRef = useRef(0);

//     // Function to check the current stage of the collection
//     const checkStages = useCallback(async () => {
//         if (checkCountRef.current >= 3) return;

//         setIsLoading(true);
//         try {
//             const {
//                 checkIsPresale,
//                 checkIsWhitelist,
//                 checkIsPublic,
//                 checkPrice,
//             } = memoizedFunctions;
//             const presaleCheck = await checkIsPresale(memoizedCollectionName);
//             if (presaleCheck.data === true) {
//                 const price = await checkPrice(
//                     memoizedCollectionName,
//                     "presale"
//                 );
//                 setStageInfo({
//                     currentStage: "Presale",
//                     isLive: true,
//                     price: price.data,
//                 });
//             } else {
//                 const whitelistCheck = await checkIsWhitelist(
//                     memoizedCollectionName
//                 );
//                 if (whitelistCheck.data === true) {
//                     const price = await checkPrice(
//                         memoizedCollectionName,
//                         "whitelist"
//                     );
//                     setStageInfo({
//                         currentStage: "Whitelist",
//                         isLive: true,
//                         price: price.data,
//                     });
//                 } else {
//                     const publicCheck = await checkIsPublic(
//                         memoizedCollectionName
//                     );
//                     if (publicCheck.data === true) {
//                         const price = await checkPrice(
//                             memoizedCollectionName,
//                             "public"
//                         );
//                         console.log("Price:", price);
//                         setStageInfo({
//                             currentStage: "Public",
//                             isLive: true,
//                             price: price.data,
//                         });
//                     } else {
//                         setStageInfo({
//                             currentStage: "Not Started",
//                             isLive: false,
//                             price: 0,
//                         });
//                     }
//                 }
//             }
//             checkCountRef.current += 1;
//         } catch (error) {
//             console.error("Error checking stages:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "There was an error loading the mint stages. Please try again later.",
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     }, [memoizedCollectionName, memoizedFunctions]);

//     // Function to render launch information
//     const renderLaunchInfo = useCallback(() => {
//         const now = moment();

//         const formatTimeLeft = (targetTime) => {
//             const duration = moment.duration(targetTime.diff(now));
//             const months = duration.months();
//             const days = duration.days();
//             const hours = duration.hours();
//             const minutes = duration.minutes();
//             const seconds = duration.seconds();

//             if (months > 0) return `${months}m ${days}d`;
//             if (days > 0) return `${days}d ${hours}h`;
//             if (hours > 0) return `${hours}h ${minutes}m`;
//             if (minutes > 0) return `${minutes}m ${seconds}s`;
//             return `${seconds}s`;
//         };

//         try {
//             if (product.enablePresale && product.presaleStartDateAndTime) {
//                 const presaleStart = moment(product.presaleStartDateAndTime);
//                 const presaleEnd = moment(product.presaleEndDateAndTime);

//                 if (now.isBefore(presaleStart)) {
//                     return {
//                         status: "Upcoming",
//                         text: "Presale starts in",
//                         time: formatTimeLeft(presaleStart),
//                         currentStage: "notStarted",
//                     };
//                 } else if (now.isBetween(presaleStart, presaleEnd)) {
//                     return {
//                         status: "Live",
//                         text: "Presale ends in",
//                         time: formatTimeLeft(presaleEnd),
//                         currentStage: "presale",
//                     };
//                 }
//             }

//             if (product.enableWhitelist && product.whitelistStartDateAndTime) {
//                 const whitelistStart = moment(
//                     product.whitelistStartDateAndTime
//                 );
//                 const mintStart = moment(product.mintStartDate);

//                 if (now.isBefore(whitelistStart)) {
//                     return {
//                         status: "Upcoming",
//                         text: "Whitelist starts in",
//                         time: formatTimeLeft(whitelistStart),
//                         currentStage: "notStarted",
//                     };
//                 } else if (now.isBetween(whitelistStart, mintStart)) {
//                     return {
//                         status: "Live",
//                         text: "Whitelist ends in",
//                         time: formatTimeLeft(mintStart),
//                         currentStage: "whitelist",
//                     };
//                 }
//             }

//             const mintStart = moment(product.mintStartDate);
//             const mintEnd = moment(product.mintEndDate);

//             if (now.isBefore(mintStart)) {
//                 return {
//                     status: "Upcoming",
//                     text: "Mint starts in",
//                     time: formatTimeLeft(mintStart),
//                     currentStage: "notStarted",
//                 };
//             } else if (now.isBetween(mintStart, mintEnd)) {
//                 return {
//                     status: "Live",
//                     text: "Mint ends in",
//                     time: formatTimeLeft(mintEnd),
//                     currentStage: "public",
//                 };
//             } else {
//                 return {
//                     status: "Ended",
//                     text: "Mint ended",
//                     time: "0s",
//                     currentStage: "ended",
//                 };
//             }
//         } catch (error) {
//             console.error("Error in renderLaunchInfo:", error);
//             return {
//                 status: "Error",
//                 text: "Unable to determine launch status",
//                 time: "N/A",
//             };
//         }
//     }, [product]);

//     const handleApplyForStage = async (stage) => {
//         try {
//             // First show confirmation dialog
//             const confirmation = await Swal.fire({
//                 title: 'Confirm Application',
//                 text: `Are you sure you want to apply for ${stage.charAt(0).toUpperCase() + stage.slice(1)}?`,
//                 icon: 'question',
//                 showCancelButton: true,
//                 confirmButtonText: 'Yes, apply!',
//                 cancelButtonText: 'No, cancel',
//                 confirmButtonColor: '#4CAF50',
//                 cancelButtonColor: '#d33'
//             });
    
//             // If user confirms, proceed with API call
//             if (confirmation.isConfirmed) {
//                 setStageApplications((prev) => ({
//                     ...prev,
//                     [stage]: { ...prev[stage], isLoading: true },
//                 }));
    
//                 const response = await collectionService.applyForStage(
//                     product.collectionName,
//                     stage
//                 );
    
//                 if (response.data.status === "success") {
//                     setStageApplications((prev) => ({
//                         ...prev,
//                         [stage]: {
//                             hasApplied: true,
//                             isLoading: false,
//                         },
//                     }));
    
//                     Swal.fire({
//                         icon: "success",
//                         title: "Success!",
//                         text: `Successfully applied for ${stage}!`,
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error(`Error applying for ${stage}:`, error);
//             setStageApplications((prev) => ({
//                 ...prev,
//                 [stage]: { ...prev[stage], isLoading: false },
//             }));
    
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text:
//                     error.response?.data?.message ||
//                     `Error applying for ${stage}. Please try again later.`,
//             });
//         }
//     };

//     // Fetch initial application status
//     useEffect(() => {
//         const fetchApplicationStatus = async () => {
//             try {
//                 const [presaleStatus, whitelistStatus] = await Promise.all([
//                     collectionService.getApplicationStatus(
//                         product.collectionName,
//                         "presale"
//                     ),
//                     collectionService.getApplicationStatus(
//                         product.collectionName,
//                         "whitelist"
//                     ),
//                 ]);
                

//                 setStageApplications({
//                     presale: {
//                         hasApplied: presaleStatus.data.data.hasApplied,
//                         isLoading: false,
//                     },
//                     whitelist: {
//                         hasApplied: whitelistStatus.data.data.hasApplied,
//                         isLoading: false,
//                     },
//                 });
//             } catch (error) {
//                 console.error("Error fetching application status:", error);
//             }
//         };

//         if (product?.collectionName) {
//             fetchApplicationStatus();
//         }
//     }, [product?.collectionName]);

//     // Effect to update launch info and check stages
//     useEffect(() => {
//         const timer = setInterval(() => {
//             const newLaunchInfo = renderLaunchInfo();
//             setLaunchInfo((prevLaunchInfo) => {
//                 if (
//                     (newLaunchInfo.status === "Upcoming" ||
//                         newLaunchInfo.status === "Live") &&
//                     newLaunchInfo.status !== prevLaunchInfo.status
//                 ) {
//                     checkStages();
//                 }
//                 return newLaunchInfo;
//             });
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [renderLaunchInfo, checkStages]);

//     // Effect to update pass info
//     useEffect(() => {
//         if (
//             priorityUsers &&
//             passBalance !== undefined &&
//             passClaimed !== undefined
//         ) {
//             setPassInfo({
//                 isPriorityUser: priorityUsers.includes(
//                     account?.user?.walletAddress
//                 ),
//                 passBalance,
//                 passClaimed,
//                 passAccFlag:
//                     priorityUsers.includes(account?.user?.walletAddress) &&
//                     passBalance > 0 &&
//                     !passClaimed,
//             });
//         }
//     }, [priorityUsers, passBalance, passClaimed, account?.user?.walletAddress]);

//     // Effect to fetch KDA to USD conversion rate
//     useEffect(() => {
//         axios
//             .get(
//                 "https://api.coingecko.com/api/v3/simple/price?ids=kadena&vs_currencies=usd"
//             )
//             .then((response) => setKdatoUsd(response.data.kadena.usd))
//             .catch((error) => console.log(error));
//     }, []);

//     // Effect to reset checkCountRef when product changes
//     useEffect(() => {
//         checkCountRef.current = 0;
//     }, [product]);

//     // Function to handle mint button click
//     const handleMint = async () => {
//         if (!stageInfo.isLive) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "No sale is currently live. Minting is not available at this time.",
//             });
//             return;
//         }

//         if (iagree) {
//             setSwap(true);
//         } else {
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "Please agree to the terms!",
//             });
//         }
//     };

//     // Function to confirm mint
//     const confirmMint = async () => {
//         console.log("Reserve Price:", reservePrice);
//         setIsLoading(true);
//         try {
//             if (
//                 parseInt(reservePrice) <= 0 ||
//                 parseInt(reservePrice) >
//                     parseInt(product.totalSupply) - product.reservePrice
//             ) {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: "Invalid number of mints!",
//                 });
//                 return;
//             }

//             if (!iagree) {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: "Please agree to the terms!",
//                 });
//                 return;
//             }

//             const result = await refetchUriList();
//             console.log("URI List Response:", result.data);

//             if (!result.data) {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: "There was an error fetching the URI list. Please try again later.",
//                 });
//                 return;
//             }

//             const updateResponse = await collectionService.updateCollection(
//                 {
//                     uriList: result.data,
//                 },
//                 product.collectionName
//             );
//             console.log("Update Collection Response:", updateResponse);
//             if (updateResponse?.data?.status === "success") {
//                 const response = await reserveTokensFunction({
//                     reseveTknColName: product.collectionName,
//                     reserverAcc: account?.user?.walletAddress,
//                     reserveTknAmount: parseInt(reservePrice),
//                     walletName: account?.user?.walletName,
//                     wcClient,
//                     wcSession,
//                 });
//                 console.log("Reserve Tokens Response:", response);

//                 if (response.data.result.status === "success") {
//                     const updateResponse =
//                         await collectionService.updateCollection(
//                             {
//                                 reservePrice:
//                                     product.reservePrice +
//                                     parseInt(reservePrice),
//                             },
//                             product.collectionName
//                         );

//                     const data = {
//                         collectionName: product.collectionName,
//                         reserveTknAmount: parseInt(reservePrice),
//                     };
//                     const responsenft = await createNFT(data);
//                     console.log("Create NFT Response:", responsenft);

//                     if (updateResponse?.data?.status === "success") {
//                         await refresh();
//                         setSwap(false);
//                         // setReservePrice(0);
//                         Swal.fire({
//                             icon: "success",
//                             title: "Success!",
//                             text: "Minted successfully!",
//                         });
//                     }
//                 } else {
//                     Swal.fire({
//                         icon: "error",
//                         title: "Oops...",
//                         text: "Minting failed!",
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error("Error during minting:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "There was an error during the minting process. Please try again later.",
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div
//             className={clsx(
//                 "product-details-area",
//                 space === 1 && "rn-section-gapTop",
//                 className
//             )}
//             style={{ position: "relative", overflow: "hidden" }}
//         >
//             {isLoading && <Loader />}

//             <div
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     backgroundImage: `url(${product?.collectionBannerImage})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "bottom",
//                     filter: "blur(5px)",
//                     transform: "scale(1.1)",
//                     zIndex: -2,
//                 }}
//             />
//             <div
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     backgroundColor: "rgba(70, 70, 70, 0.5)",
//                     zIndex: -1,
//                 }}
//             />
//             <div className="container">
//                 <div className="row g-2 mb--30">
//                     <div className="col-lg-7 col-md-12 col-sm-12">
//                         <Sticky>
//                             <CollectionDetailTab
//                                 image={product?.collectionCoverImage}
//                             />
//                         </Sticky>
//                     </div>
//                     <motion.div
//                         whileHover={{
//                             scale: 1.01,
//                             transition: { duration: 0.1 },
//                         }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60"
//                     >
//                         <div className="rn-pd-content-area">
//                             <ProductTitle title="Mint Stages" />
//                             <div className="mint-stages">
//                                 {["Presale", "Whitelist", "Public"].map(
//                                     (stage, index) => {
//                                         const stageLowerCase =
//                                             stage.toLowerCase();
//                                         const now = new Date();
//                                         const isPresale = stage === "Presale";
//                                         const isWhitelist =
//                                             stage === "Whitelist";
//                                         const isPublic = stage === "Public";

//                                         let stageStartDate = isPresale
//                                             ? new Date(
//                                                   product.presaleStartDateAndTime
//                                               )
//                                             : isWhitelist
//                                             ? new Date(
//                                                   product.whitelistStartDateAndTime
//                                               )
//                                             : new Date(product.mintStartDate);

//                                         let stageEndDate = isPresale
//                                             ? new Date(
//                                                   product.presaleEndDateAndTime
//                                               )
//                                             : isWhitelist
//                                             ? new Date(product.mintStartDate)
//                                             : new Date(product.mintEndDate);

//                                         const isUpcoming = now < stageStartDate;
//                                         const isLive =
//                                             now >= stageStartDate &&
//                                             now <= stageEndDate;
//                                         const isEnded = now > stageEndDate;

//                                         const showApplyButton =
//                                             !isPublic &&
//                                             (isLive ||
//                                                 isUpcoming ||
//                                                 (isEnded &&
//                                                     stageApplications[
//                                                         stageLowerCase
//                                                     ]?.hasApplied));

//                                         return (
//                                             <div
//                                             className={`mint-stage ${isLive ? 'live-stage' : ''}`}
//                                             key={index}
//                                             >
//                                                 <h3>
//                                                     {stage}
//                                                     {isLive ? (
//                                                         <span className="live">
//                                                             <div className="d-flex justify-content-start">
//                                                                 <Rings
//                                                                     color="green"
//                                                                     height={20}
//                                                                     width={20}
//                                                                 />
//                                                                 <span
//                                                                     style={{
//                                                                         fontWeight:
//                                                                             "bold",
//                                                                         color: "green",
//                                                                     }}
//                                                                 >
//                                                                     Live
//                                                                 </span>
//                                                             </div>
//                                                         </span>
//                                                     ) : isUpcoming ? (
//                                                         <span className="upcoming">
//                                                             Upcoming
//                                                         </span>
//                                                     ) : (
//                                                         <span className="ended">
//                                                             ENDED
//                                                         </span>
//                                                     )}
//                                                 </h3>
//                                                 {showApplyButton && (
//                                                     <div
//                                                         style={{
//                                                             marginTop: "8px",
//                                                             width: "100%",
//                                                             display: "flex",
//                                                             justifyContent:
//                                                                 "end",
//                                                         }}
//                                                     >
//                                                         <button
//                                                             className={`stage-apply-chip ${
//                                                                 stageApplications[
//                                                                     stageLowerCase
//                                                                 ]?.hasApplied
//                                                                     ? "applied"
//                                                                     : ""
//                                                             }`}
//                                                             onClick={() =>
//                                                                 handleApplyForStage(
//                                                                     stageLowerCase
//                                                                 )
//                                                             }
//                                                             disabled={
//                                                                 stageApplications[
//                                                                     stageLowerCase
//                                                                 ]?.hasApplied ||
//                                                                 stageApplications[
//                                                                     stageLowerCase
//                                                                 ]?.isLoading ||
//                                                                 isEnded
//                                                             }
//                                                             style={{
//                                                                 width: "100%",
//                                                                 textAlign:
//                                                                     "center",
//                                                             }}
//                                                         >
//                                                             {stageApplications[
//                                                                 stageLowerCase
//                                                             ]?.isLoading ? (
//                                                                 <Rings
//                                                                     color="white"
//                                                                     height={12}
//                                                                     width={12}
//                                                                 />
//                                                             ) : stageApplications[
//                                                                   stageLowerCase
//                                                               ]?.hasApplied ? (
//                                                                 "Applied"
//                                                             ) : (
//                                                                 "Apply"
//                                                             )}
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                                 <p>
//                                                     Price{" "}
//                                                     {isPresale
//                                                         ? parseFloat(
//                                                               product.presalePrice || 0
//                                                           ).toFixed(2)
//                                                         : isWhitelist
//                                                         ? parseFloat(
//                                                               product.whitelistPrice || 0
//                                                           ).toFixed(2)
//                                                         : isPublic &&
//                                                           stageInfo.currentStage ===
//                                                               "Public"
//                                                         ? parseFloat(
//                                                               stageInfo.price || 0
//                                                           ).toFixed(2)
//                                                         : "0"}
//                                                 </p>
//                                             </div>
//                                         );
//                                     }
//                                 )}
//                             </div>
//                             <div className="mint-info">
//                                 <div className="total-minted">
//                                     <div
//                                         className="range-slider"
//                                         style={{ width: "100%" }}
//                                     >
//                                         {/* <div className="d-flex justify-content-start">
//                                             <Rings
//                                                 color="green"
//                                                 height={20}
//                                                 width={20}
//                                             />
//                                             <span
//                                                 style={{
//                                                     fontWeight: "bold",
//                                                     color: "green",
//                                                 }}
//                                             >
//                                                 Live
//                                             </span>
//                                         </div> */}
//                                         <div className="launch-info">
//                                             <div className="d-flex justify-content-start align-items-center">
//                                                 <Rings
//                                                     color={
//                                                         launchInfo.status ===
//                                                         "Live"
//                                                             ? "green"
//                                                             : "orange"
//                                                     }
//                                                     height={20}
//                                                     width={20}
//                                                 />
//                                                 <span
//                                                     style={{
//                                                         fontWeight: "bold",
//                                                         color:
//                                                             launchInfo.status ===
//                                                             "Live"
//                                                                 ? "green"
//                                                                 : "orange",
//                                                     }}
//                                                 >
//                                                     {launchInfo.status}
//                                                 </span>
//                                                 <span
//                                                     style={{
//                                                         fontWeight: "bold",
//                                                         marginLeft: "10px",
//                                                     }}
//                                                 >
//                                                     {launchInfo.text}
//                                                 </span>
//                                                 <span
//                                                     style={{
//                                                         fontWeight: "bold",
//                                                         marginLeft: "5px",
//                                                     }}
//                                                 >
//                                                     {launchInfo.time}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <p>
//                                             Total Minted{" "}
//                                             {product?.reservePrice || 0} /{" "}
//                                             {parseInt(product.totalSupply)}
//                                         </p>
//                                         <Range
//                                             values={[
//                                                 product
//                                                     ? product.reservePrice
//                                                     : 0,
//                                             ]}
//                                             step={1}
//                                             min={0}
//                                             max={
//                                                 product
//                                                     ? parseInt(
//                                                           product.totalSupply
//                                                       )
//                                                     : 100
//                                             }
//                                             onChange={() => {}}
//                                             renderTrack={({
//                                                 props,
//                                                 children,
//                                             }) => (
//                                                 <div
//                                                     {...props}
//                                                     style={{
//                                                         ...props.style,
//                                                         height: "36px",
//                                                         display: "flex",
//                                                         width: "100%",
//                                                     }}
//                                                 >
//                                                     <div
//                                                         ref={props.ref}
//                                                         style={{
//                                                             height: "5px",
//                                                             width: "100%",
//                                                             borderRadius: "4px",
//                                                             background: `linear-gradient(to right,
//                                                             #FF0000 0%,     
//                                                             #FFFF00 ${
//                                                                 product
//                                                                     ? (product.reservePrice /
//                                                                           (parseInt(
//                                                                               product.totalSupply
//                                                                           ) ||
//                                                                               1)) *
//                                                                       100
//                                                                     : 0
//                                                             }%,
//                                                             #00FF00 ${
//                                                                 product
//                                                                     ? (product.reservePrice /
//                                                                           (parseInt(
//                                                                               product.totalSupply
//                                                                           ) ||
//                                                                               1)) *
//                                                                       100
//                                                                     : 0
//                                                             }%, 
//                                                             #0000FF ${
//                                                                 product
//                                                                     ? (product.reservePrice /
//                                                                           (parseInt(
//                                                                               product.totalSupply
//                                                                           ) ||
//                                                                               1)) *
//                                                                       100
//                                                                     : 0
//                                                             }%, 
//                                                             rgb(204, 204, 204) ${
//                                                                 product
//                                                                     ? (product.reservePrice /
//                                                                           (parseInt(
//                                                                               product.totalSupply
//                                                                           ) ||
//                                                                               1)) *
//                                                                       100
//                                                                     : 100
//                                                             }%)`,
//                                                             alignSelf: "center",
//                                                         }}
//                                                     >
//                                                         {children}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             renderThumb={({ props }) => (
//                                                 <div {...props} />
//                                             )}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="price">
//                                     <h2>
//                                         {parseFloat(stageInfo.price).toFixed(2)}{" "}
//                                         KDA
//                                     </h2>
//                                     <p>
//                                         (${" "}
//                                         {parseFloat(
//                                             stageInfo.price * kdatoUsd
//                                         ).toFixed(2)}
//                                         )
//                                     </p>
//                                 </div>
//                                 {console.log("Pass Info:", passInfo)}
//                                 {product?.collectionType !== "marketplace" &&
//                                     passInfo.isPriorityUser && (
//                                         <div
//                                             className="pass-info"
//                                             style={{ marginTop: "20px" }}
//                                         >
//                                             <h6>Pass Information</h6>
//                                             <p>
//                                                 Pass Balance:{" "}
//                                                 {passInfo.passBalance}
//                                             </p>
//                                             <p>
//                                                 Pass Claimed:{" "}
//                                                 {passInfo.passClaimed
//                                                     ? "Yes"
//                                                     : "No"}
//                                             </p>
//                                             {passInfo.passAccFlag && (
//                                                 <p className="free-mint-info">
//                                                     Your next mint will be free
//                                                     due to your unclaimed pass!
//                                                 </p>
//                                             )}
//                                         </div>
//                                     )}
//                             </div>
//                             <div className="mint-form">
//                                 <div className="terms">
//                                     <input
//                                         type="checkbox"
//                                         id="terms"
//                                         onChange={(e) =>
//                                             setIagree(e.target.checked)
//                                         }
//                                     />
//                                     <label htmlFor="terms">
//                                         I agree to the General Terms of Service
//                                     </label>
//                                 </div>
//                                 {!swap ? (
//                                     <button
//                                         className="buttonlaunchpad"
//                                         onClick={handleMint}
//                                     >
//                                         {/* {stageInfo.isLive
//                                             ? "Mint Here!"
//                                             : "Minting Not Available"} */}
//                                         {stageInfo.isLive
//                                             ? !passInfo.isPriorityUser ||
//                                               passInfo.passClaimed
//                                                 ? "Mint Here!"
//                                                 : "Claim Pass"
//                                             : "Minting Not Available"}
//                                     </button>
//                                 ) : (
//                                     <motion.div
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 0.3 }}
//                                         className="number-input-container"
//                                     >
//                                         <input
//                                             type="number"
//                                             placeholder="Number of Mints"
//                                             value={reservePrice}
//                                             onChange={(e) => {
//                                                 const value = parseInt(
//                                                     e.target.value
//                                                 );
//                                                 if (
//                                                     value > 0 &&
//                                                     value <=
//                                                         parseInt(
//                                                             product.totalSupply
//                                                         ) -
//                                                             product.reservePrice
//                                                 ) {
//                                                     setReservePrice(value);
//                                                 }
//                                             }}
//                                             className="number-input"
//                                         />
//                                         <button
//                                             className="buttonlaunchpad"
//                                             onClick={confirmMint}
//                                         >
//                                             Confirm
//                                         </button>
//                                     </motion.div>
//                                 )}
//                             </div>
//                             <p className="disclaimer">
//                                 Please note this Collection is not a Launchpad
//                                 project. The Creator has chosen to mint the
//                                 Collection on its own website and have it as a
//                                 Featured Mint on Kryptomerch. Any decision by
//                                 you to mint the Collection is at your own
//                                 discretion and subject to any terms that are
//                                 directly between you and the Creator on the mint
//                                 website.
//                             </p>
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// CollectionDetailsArea.propTypes = {
//     space: PropTypes.oneOf([1, 2]),
//     className: PropTypes.string,
//     product: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         collectionCoverImage: PropTypes.string.isRequired,
//         collectionBannerImage: PropTypes.string.isRequired,
//         collectionName: PropTypes.string.isRequired,
//         totalSupply: PropTypes.string.isRequired,
//         reservePrice: PropTypes.number.isRequired,
//         enablePresale: PropTypes.bool.isRequired,
//         enableWhitelist: PropTypes.bool.isRequired,
//         collectionType: PropTypes.oneOf(["marketplace", "launchpad"])
//             .isRequired,
//         presaleStartDateAndTime: PropTypes.string,
//         presaleEndDateAndTime: PropTypes.string,
//         whitelistStartDateAndTime: PropTypes.string,
//         mintStartDate: PropTypes.string,
//         mintEndDate: PropTypes.string,
//     }).isRequired,
//     refresh: PropTypes.func.isRequired,
// };

// CollectionDetailsArea.defaultProps = {
//     space: 1,
// };

// export default CollectionDetailsArea;


import React, {
    useEffect,
    useState,
    useCallback,
    useRef,
    useMemo,
} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import Sticky from "@ui/sticky";
import CollectionDetailTab from "@components/product-details/collection-detail-tab";
import ProductTitle from "@components/product-details/title";
import { Range } from "react-range";
import { Rings } from "react-loader-spinner";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import moment from "moment";
import { useAccountContext } from "src/contexts";
import collectionService from "src/services/collection.service";
import { useCollectionTypeFunctions } from "src/hooks/useCollectionTypeFunctions";
import { useCreateNFTMutation } from "src/services/nft.service";
import Loader from "@components/loader";
import { useWalletConnectClient } from "src/contexts/WalletConnectContext";
import {
    useGetPriorityUsersQuery,
    useGetPassBalanceQuery,
    useGetPassClaimQuery,
    useGetUriListQuery,
} from "src/services/launchpad.service";

const CollectionDetailsArea = ({ space, className, product, refresh }) => {
    // State variables
    const [isLoading, setIsLoading] = useState(false);
    const [stageInfo, setStageInfo] = useState({
        currentStage: null,
        isLive: false,
        price: 0,
    });
    console.log("Stage Info:", stageInfo);
    const [kdatoUsd, setKdatoUsd] = useState(0);
    const [iagree, setIagree] = useState(false);
    const [swap, setSwap] = useState(false);
    const [reservePrice, setReservePrice] = useState(0);
    const [passInfo, setPassInfo] = useState({
        isPriorityUser: false,
        passBalance: 0,
        passClaimed: false,
        passAccFlag: false,
    });
    const [launchInfo, setLaunchInfo] = useState({
        status: "Upcoming",
        text: "",
        time: "",
    });

    const [stageApplications, setStageApplications] = useState({
        presale: {
            hasApplied: false,
            isLoading: false,
        },
        whitelist: {
            hasApplied: false,
            isLoading: false,
        },
    });

    // Hooks
    const account = useAccountContext();
    const [createNFT] = useCreateNFTMutation();
    console.log("product:", product);
    const { data: uriList, refetch: refetchUriList } = useGetUriListQuery({
        collectionName: product?.collectionName,
        isMarketplace: product?.collectionType === "marketplace" ? true : false,
    });
    console.log("URI List:", uriList);
    const { client: wcClient, session: wcSession } = useWalletConnectClient();
    const { data: priorityUsers } = useGetPriorityUsersQuery();
    console.log("Priority Users:", priorityUsers);
    const { data: passBalance } = useGetPassBalanceQuery(
        account?.user?.walletAddress
    );
    const { data: passClaimed } = useGetPassClaimQuery({
        colName: product?.collectionName,
        account: account?.user?.walletAddress,
    });

    // Memoized values and functions
    const memoizedCollectionName = useMemo(
        () => product.collectionName,
        [product.collectionName]
    );
    const {
        checkIsPublic,
        checkIsWhitelist,
        checkIsPresale,
        checkPrice,
        reserveTokensFunction,
    } = useCollectionTypeFunctions(product.collectionType);

    const memoizedFunctions = useMemo(
        () => ({
            checkIsPublic,
            checkIsWhitelist,
            checkIsPresale,
            checkPrice,
        }),
        [checkIsPublic, checkIsWhitelist, checkIsPresale, checkPrice]
    );

    // Ref for tracking the number of times checkStages has been called
    const checkCountRef = useRef(0);

    // Function to check the current stage of the collection
    const checkStages = useCallback(async () => {
        if (checkCountRef.current >= 3) return;

        setIsLoading(true);
        try {
            const {
                checkIsPresale,
                checkIsWhitelist,
                checkIsPublic,
                checkPrice,
            } = memoizedFunctions;
            const presaleCheck = await checkIsPresale(memoizedCollectionName);
            if (presaleCheck.data === true) {
                const price = await checkPrice(
                    memoizedCollectionName,
                    "presale"
                );
                setStageInfo({
                    currentStage: "Presale",
                    isLive: true,
                    price: price.data,
                });
            } else {
                const whitelistCheck = await checkIsWhitelist(
                    memoizedCollectionName
                );
                if (whitelistCheck.data === true) {
                    const price = await checkPrice(
                        memoizedCollectionName,
                        "whitelist"
                    );
                    setStageInfo({
                        currentStage: "Whitelist",
                        isLive: true,
                        price: price.data,
                    });
                } else {
                    const publicCheck = await checkIsPublic(
                        memoizedCollectionName
                    );
                    if (publicCheck.data === true) {
                        const price = await checkPrice(
                            memoizedCollectionName,
                            "public"
                        );
                        console.log("Price:", price);
                        setStageInfo({
                            currentStage: "Public",
                            isLive: true,
                            price: price.data,
                        });
                    } else {
                        setStageInfo({
                            currentStage: "Not Started",
                            isLive: false,
                            price: 0,
                        });
                    }
                }
            }
            checkCountRef.current += 1;
        } catch (error) {
            console.error("Error checking stages:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "There was an error loading the mint stages. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    }, [memoizedCollectionName, memoizedFunctions]);

    // Function to render launch information
    const renderLaunchInfo = useCallback(() => {
        const now = moment();

        const formatTimeLeft = (targetTime) => {
            const duration = moment.duration(targetTime.diff(now));
            const months = duration.months();
            const days = duration.days();
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();

            if (months > 0) return `${months}m ${days}d`;
            if (days > 0) return `${days}d ${hours}h`;
            if (hours > 0) return `${hours}h ${minutes}m`;
            if (minutes > 0) return `${minutes}m ${seconds}s`;
            return `${seconds}s`;
        };

        try {
            if (product.enablePresale && product.presaleStartDateAndTime) {
                const presaleStart = moment(product.presaleStartDateAndTime);
                const presaleEnd = moment(product.presaleEndDateAndTime);

                if (now.isBefore(presaleStart)) {
                    return {
                        status: "Upcoming",
                        text: "Presale starts in",
                        time: formatTimeLeft(presaleStart),
                        currentStage: "notStarted",
                    };
                } else if (now.isBetween(presaleStart, presaleEnd)) {
                    return {
                        status: "Live",
                        text: "Presale ends in",
                        time: formatTimeLeft(presaleEnd),
                        currentStage: "presale",
                    };
                }
            }

            if (product.enableWhitelist && product.whitelistStartDateAndTime) {
                const whitelistStart = moment(
                    product.whitelistStartDateAndTime
                );
                const mintStart = moment(product.mintStartDate);

                if (now.isBefore(whitelistStart)) {
                    return {
                        status: "Upcoming",
                        text: "Whitelist starts in",
                        time: formatTimeLeft(whitelistStart),
                        currentStage: "notStarted",
                    };
                } else if (now.isBetween(whitelistStart, mintStart)) {
                    return {
                        status: "Live",
                        text: "Whitelist ends in",
                        time: formatTimeLeft(mintStart),
                        currentStage: "whitelist",
                    };
                }
            }

            const mintStart = moment(product.mintStartDate);
            const mintEnd = moment(product.mintEndDate);

            if (now.isBefore(mintStart)) {
                return {
                    status: "Upcoming",
                    text: "Mint starts in",
                    time: formatTimeLeft(mintStart),
                    currentStage: "notStarted",
                };
            } else if (now.isBetween(mintStart, mintEnd)) {
                return {
                    status: "Live",
                    text: "Mint ends in",
                    time: formatTimeLeft(mintEnd),
                    currentStage: "public",
                };
            } else {
                return {
                    status: "Ended",
                    text: "Mint ended",
                    time: "0s",
                    currentStage: "ended",
                };
            }
        } catch (error) {
            console.error("Error in renderLaunchInfo:", error);
            return {
                status: "Error",
                text: "Unable to determine launch status",
                time: "N/A",
            };
        }
    }, [product]);

    const handleApplyForStage = async (stage) => {
        try {
            // First show confirmation dialog
            const confirmation = await Swal.fire({
                title: 'Confirm Application',
                text: `Are you sure you want to apply for ${stage.charAt(0).toUpperCase() + stage.slice(1)}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, apply!',
                cancelButtonText: 'No, cancel',
                confirmButtonColor: '#4CAF50',
                cancelButtonColor: '#d33'
            });
    
            // If user confirms, proceed with API call
            if (confirmation.isConfirmed) {
                setStageApplications((prev) => ({
                    ...prev,
                    [stage]: { ...prev[stage], isLoading: true },
                }));
    
                const response = await collectionService.applyForStage(
                    product.collectionName,
                    stage
                );
    
                if (response.data.status === "success") {
                    setStageApplications((prev) => ({
                        ...prev,
                        [stage]: {
                            hasApplied: true,
                            isLoading: false,
                        },
                    }));
    
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: `Successfully applied for ${stage}!`,
                    });
                }
            }
        } catch (error) {
            console.error(`Error applying for ${stage}:`, error);
            setStageApplications((prev) => ({
                ...prev,
                [stage]: { ...prev[stage], isLoading: false },
            }));
    
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                    error.response?.data?.message ||
                    `Error applying for ${stage}. Please try again later.`,
            });
        }
    };

    // Fetch initial application status
    useEffect(() => {
        const fetchApplicationStatus = async () => {
            try {
                const [presaleStatus, whitelistStatus] = await Promise.all([
                    collectionService.getApplicationStatus(
                        product.collectionName,
                        "presale"
                    ),
                    collectionService.getApplicationStatus(
                        product.collectionName,
                        "whitelist"
                    ),
                ]);
                

                setStageApplications({
                    presale: {
                        hasApplied: presaleStatus.data.data.hasApplied,
                        isLoading: false,
                    },
                    whitelist: {
                        hasApplied: whitelistStatus.data.data.hasApplied,
                        isLoading: false,
                    },
                });
            } catch (error) {
                console.error("Error fetching application status:", error);
            }
        };

        if (product?.collectionName) {
            fetchApplicationStatus();
        }
    }, [product?.collectionName]);

    // Effect to update launch info and check stages
    useEffect(() => {
        const timer = setInterval(() => {
            const newLaunchInfo = renderLaunchInfo();
            setLaunchInfo((prevLaunchInfo) => {
                if (
                    (newLaunchInfo.status === "Upcoming" ||
                        newLaunchInfo.status === "Live") &&
                    newLaunchInfo.status !== prevLaunchInfo.status
                ) {
                    checkStages();
                }
                return newLaunchInfo;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [renderLaunchInfo, checkStages]);

    // Effect to update pass info
    useEffect(() => {
        if (
            priorityUsers &&
            passBalance !== undefined &&
            passClaimed !== undefined
        ) {
            setPassInfo({
                isPriorityUser: priorityUsers.includes(
                    account?.user?.walletAddress
                ),
                passBalance,
                passClaimed,
                passAccFlag:
                    priorityUsers.includes(account?.user?.walletAddress) &&
                    passBalance > 0 &&
                    !passClaimed,
            });
        }
    }, [priorityUsers, passBalance, passClaimed, account?.user?.walletAddress]);

    // Effect to fetch KDA to USD conversion rate
    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/simple/price?ids=kadena&vs_currencies=usd"
            )
            .then((response) => setKdatoUsd(response.data.kadena.usd))
            .catch((error) => console.log(error));
    }, []);

    // Effect to reset checkCountRef when product changes
    useEffect(() => {
        checkCountRef.current = 0;
    }, [product]);

    // Function to handle mint button click
    const handleMint = async () => {
        if (!stageInfo.isLive) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No sale is currently live. Minting is not available at this time.",
            });
            return;
        }

        if (iagree) {
            setSwap(true);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please agree to the terms!",
            });
        }
    };

    // Function to confirm mint
    const confirmMint = async () => {
        console.log("Reserve Price:", reservePrice);
        setIsLoading(true);
        try {
            if (
                parseInt(reservePrice) <= 0 ||
                parseInt(reservePrice) >
                    parseInt(product.totalSupply) - product.reservePrice
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid number of mints!",
                });
                return;
            }

            if (!iagree) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please agree to the terms!",
                });
                return;
            }

            const result = await refetchUriList();
            console.log("URI List Response:", result.data);

            if (!result.data) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "There was an error fetching the URI list. Please try again later.",
                });
                return;
            }

            const updateResponse = await collectionService.updateCollection(
                {
                    uriList: result.data,
                },
                product.collectionName
            );
            console.log("Update Collection Response:", updateResponse);
            if (updateResponse?.data?.status === "success") {
                const response = await reserveTokensFunction({
                    reseveTknColName: product.collectionName,
                    reserverAcc: account?.user?.walletAddress,
                    reserveTknAmount: parseInt(reservePrice),
                    walletName: account?.user?.walletName,
                    wcClient,
                    wcSession,
                });
                console.log("Reserve Tokens Response:", response);

                if (response.data.result.status === "success") {
                    const updateResponse =
                        await collectionService.updateCollection(
                            {
                                reservePrice:
                                    product.reservePrice +
                                    parseInt(reservePrice),
                            },
                            product.collectionName
                        );

                    const data = {
                        collectionName: product.collectionName,
                        reserveTknAmount: parseInt(reservePrice),
                    };
                    const responsenft = await createNFT(data);
                    console.log("Create NFT Response:", responsenft);

                    if (updateResponse?.data?.status === "success") {
                        await refresh();
                        setSwap(false);
                        // setReservePrice(0);
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: "Minted successfully!",
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Minting failed!",
                    });
                }
            }
        } catch (error) {
            console.error("Error during minting:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "There was an error during the minting process. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={clsx(
                "product-details-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
            style={{ position: "relative", overflow: "hidden" }}
        >
            {isLoading && <Loader />}

            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${product?.collectionBannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    filter: "blur(5px)",
                    transform: "scale(1.1)",
                    zIndex: -2,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(70, 70, 70, 0.5)",
                    zIndex: -1,
                }}
            />
            <div className="container">
                <div className="row g-2 mb--30">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <Sticky>
                            <CollectionDetailTab
                                image={product?.collectionCoverImage}
                            />
                        </Sticky>
                    </div>
                    <motion.div
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.1 },
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60"
                    >
                        <div className="rn-pd-content-area">
                            <div className="product-details-content">
                            <ProductTitle title="Mint Stages" />
                            <div className="mint-stages">
                                {["Presale", "Whitelist", "Public"].map(
                                    (stage, index) => {
                                        const stageLowerCase =
                                            stage.toLowerCase();
                                        const now = new Date();
                                        const isPresale = stage === "Presale";
                                        const isWhitelist =
                                            stage === "Whitelist";
                                        const isPublic = stage === "Public";

                                        let stageStartDate = isPresale
                                            ? new Date(
                                                  product.presaleStartDateAndTime
                                              )
                                            : isWhitelist
                                            ? new Date(
                                                  product.whitelistStartDateAndTime
                                              )
                                            : new Date(product.mintStartDate);

                                        let stageEndDate = isPresale
                                            ? new Date(
                                                  product.presaleEndDateAndTime
                                              )
                                            : isWhitelist
                                            ? new Date(product.mintStartDate)
                                            : new Date(product.mintEndDate);

                                        const isUpcoming = now < stageStartDate;
                                        const isLive =
                                            now >= stageStartDate &&
                                            now <= stageEndDate;
                                        const isEnded = now > stageEndDate;

                                        const showApplyButton =
                                            !isPublic &&
                                            (isLive ||
                                                isUpcoming ||
                                                (isEnded &&
                                                    stageApplications[
                                                        stageLowerCase
                                                    ]?.hasApplied));

                                        return (
                                            <div
                                            className={`mint-stage ${isLive ? 'live-stage' : ''}`}
                                            key={index}
                                            >
                                                <h3 style={{ backgroundColor: "transparent" }}>
                                                    {stage}
                                                    {isLive ? (
                                                        <span className="live">
                                                            <div className="d-flex justify-content-start">
                                                                <Rings
                                                                    color="green"
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                                <span
                                                                    style={{
                                                                        fontWeight:
                                                                            "bold",
                                                                        color: "green",
                                                                    }}
                                                                >
                                                                    Live
                                                                </span>
                                                            </div>
                                                        </span>
                                                    ) : isUpcoming ? (
                                                        <span className="upcoming">
                                                            Upcoming
                                                        </span>
                                                    ) : (
                                                        <span className="ended">
                                                            ENDED
                                                        </span>
                                                    )}
                                                </h3>
                                                {showApplyButton && (
                                                    <div
                                                        style={{
                                                            marginTop: "8px",
                                                            width: "100%",
                                                            display: "flex",
                                                            justifyContent:
                                                                "end",
                                                        }}
                                                    >
                                                        <button
                                                            className={`stage-apply-chip ${
                                                                stageApplications[
                                                                    stageLowerCase
                                                                ]?.hasApplied
                                                                    ? "applied"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                handleApplyForStage(
                                                                    stageLowerCase
                                                                )
                                                            }
                                                            disabled={
                                                                stageApplications[
                                                                    stageLowerCase
                                                                ]?.hasApplied ||
                                                                stageApplications[
                                                                    stageLowerCase
                                                                ]?.isLoading ||
                                                                isEnded
                                                            }
                                                            style={{
                                                                width: "100%",
                                                                textAlign:
                                                                    "center",
                                                            }}
                                                        >
                                                            {stageApplications[
                                                                stageLowerCase
                                                            ]?.isLoading ? (
                                                                <Rings
                                                                    color="white"
                                                                    height={12}
                                                                    width={12}
                                                                />
                                                            ) : stageApplications[
                                                                  stageLowerCase
                                                              ]?.hasApplied ? (
                                                                "Applied"
                                                            ) : (
                                                                "Apply"
                                                            )}
                                                        </button>
                                                    </div>
                                                )}
                                                <p>
                                                    Price{" "}
                                                    {isPresale
                                                        ? parseFloat(
                                                              product.presalePrice || 0
                                                          ).toFixed(2)
                                                        : isWhitelist
                                                        ? parseFloat(
                                                              product.whitelistPrice || 0
                                                          ).toFixed(2)
                                                        : isPublic &&
                                                          stageInfo.currentStage ===
                                                              "Public"
                                                        ? parseFloat(
                                                              stageInfo.price || 0
                                                          ).toFixed(2)
                                                        : "0"}
                                                </p>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <div className="mint-info">
                                <div className="total-minted">
                                    <div
                                        className="range-slider"
                                        style={{ width: "100%" }}
                                    >
                                        {/* <div className="d-flex justify-content-start">
                                            <Rings
                                                color="green"
                                                height={20}
                                                width={20}
                                            />
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "green",
                                                }}
                                            >
                                                Live
                                            </span>
                                        </div> */}
                                        <div className="launch-info">
                                            <div className="d-flex justify-content-start align-items-center">
                                                <Rings
                                                    color={
                                                        launchInfo.status ===
                                                        "Live"
                                                            ? "green"
                                                            : "orange"
                                                    }
                                                    height={20}
                                                    width={20}
                                                />
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        color:
                                                            launchInfo.status ===
                                                            "Live"
                                                                ? "green"
                                                                : "orange",
                                                    }}
                                                >
                                                    {launchInfo.status}
                                                </span>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        marginLeft: "10px",
                                                    }}
                                                    className="launch-time"
                                                >
                                                    {launchInfo.text}
                                                </span>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        marginLeft: "5px",
                                                    }}
                                                    className="launch-time"
                                                >
                                                    {launchInfo.time}
                                                </span>
                                            </div>
                                        </div>
                                        <p>
                                            Total Minted{" "}
                                            {product?.reservePrice || 0} /{" "}
                                            {parseInt(product.totalSupply)}
                                        </p>
                                        <Range
                                            values={[
                                                product
                                                    ? product.reservePrice
                                                    : 0,
                                            ]}
                                            step={1}
                                            min={0}
                                            max={
                                                product
                                                    ? parseInt(
                                                          product.totalSupply
                                                      )
                                                    : 100
                                            }
                                            onChange={() => {}}
                                            renderTrack={({
                                                props,
                                                children,
                                            }) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: "36px",
                                                        display: "flex",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <div
                                                        ref={props.ref}
                                                        style={{
                                                            height: "5px",
                                                            width: "100%",
                                                            borderRadius: "4px",
                                                            background: `linear-gradient(to right,
                                                            #FF0000 0%,     
                                                            #FFFF00 ${
                                                                product
                                                                    ? (product.reservePrice /
                                                                          (parseInt(
                                                                              product.totalSupply
                                                                          ) ||
                                                                              1)) *
                                                                      100
                                                                    : 0
                                                            }%,
                                                            #00FF00 ${
                                                                product
                                                                    ? (product.reservePrice /
                                                                          (parseInt(
                                                                              product.totalSupply
                                                                          ) ||
                                                                              1)) *
                                                                      100
                                                                    : 0
                                                            }%, 
                                                            #0000FF ${
                                                                product
                                                                    ? (product.reservePrice /
                                                                          (parseInt(
                                                                              product.totalSupply
                                                                          ) ||
                                                                              1)) *
                                                                      100
                                                                    : 0
                                                            }%, 
                                                            rgb(204, 204, 204) ${
                                                                product
                                                                    ? (product.reservePrice /
                                                                          (parseInt(
                                                                              product.totalSupply
                                                                          ) ||
                                                                              1)) *
                                                                      100
                                                                    : 100
                                                            }%)`,
                                                            alignSelf: "center",
                                                        }}
                                                    >
                                                        {children}
                                                    </div>
                                                </div>
                                            )}
                                            renderThumb={({ props }) => (
                                                <div {...props} />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="price">
                                    <h2>
                                        {parseFloat(stageInfo.price).toFixed(2)}{" "}
                                        KDA
                                    </h2>
                                    <p>
                                        (${" "}
                                        {parseFloat(
                                            stageInfo.price * kdatoUsd
                                        ).toFixed(2)}
                                        )
                                    </p>
                                </div>
                                {console.log("Pass Info:", passInfo)}
                                {product?.collectionType !== "marketplace" &&
                                    passInfo.isPriorityUser && (
                                        <div
                                            className="pass-info"
                                            style={{ marginTop: "20px" }}
                                        >
                                            <h6 style={{ backgroundColor: "transparent" }}>
                                            Pass Information</h6>
                                            <p>
                                                Pass Balance:{" "}
                                                {passInfo.passBalance}
                                            </p>
                                            <p>
                                                Pass Claimed:{" "}
                                                {passInfo.passClaimed
                                                    ? "Yes"
                                                    : "No"}
                                            </p>
                                            {passInfo.passAccFlag && (
                                                <p className="free-mint-info" />
                                            )}
                                        </div>
                                    )}
                            </div>
                            <div className="mint-form">
                                <div className="terms">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        onChange={(e) =>
                                            setIagree(e.target.checked)
                                        }
                                    />
                                    <label htmlFor="terms">
                                        I agree to the General Terms of Service
                                    </label>
                                </div>
                                {!swap ? (
                                    <button
                                        className="buttonlaunchpad"
                                        onClick={handleMint}
                                    >
                                        {/* {stageInfo.isLive
                                            ? "Mint Here!"
                                            : "Minting Not Available"} */}
                                        {stageInfo.isLive
                                            ? !passInfo.isPriorityUser ||
                                              passInfo.passClaimed
                                                ? "Mint Here!"
                                                : "Claim Pass"
                                            : "Minting Not Available"}
                                    </button>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="number-input-container"
                                    >
                                        <input
                                            type="number"
                                            placeholder="Number of Mints"
                                            value={reservePrice}
                                            onChange={(e) => {
                                                const value = parseInt(
                                                    e.target.value
                                                );
                                                if (
                                                    value > 0 &&
                                                    value <=
                                                        parseInt(
                                                            product.totalSupply
                                                        ) -
                                                            product.reservePrice
                                                ) {
                                                    setReservePrice(value);
                                                }
                                            }}
                                            className="number-input"
                                        />
                                        <button
                                            className="buttonlaunchpad"
                                            onClick={confirmMint}
                                        >
                                            Confirm
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                            <p className="disclaimer">
                                Please note this Collection is not a Launchpad
                                project. The Creator has chosen to mint the
                                Collection on its own website and have it as a
                                Featured Mint on Kryptomerch. Any decision by
                                you to mint the Collection is at your own
                                discretion and subject to any terms that are
                                directly between you and the Creator on the mint
                                website.
                            </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

CollectionDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        collectionCoverImage: PropTypes.string.isRequired,
        collectionBannerImage: PropTypes.string.isRequired,
        collectionName: PropTypes.string.isRequired,
        totalSupply: PropTypes.string.isRequired,
        reservePrice: PropTypes.number.isRequired,
        enablePresale: PropTypes.bool.isRequired,
        enableWhitelist: PropTypes.bool.isRequired,
        collectionType: PropTypes.oneOf(["marketplace", "launchpad"])
            .isRequired,
        presaleStartDateAndTime: PropTypes.string,
        presaleEndDateAndTime: PropTypes.string,
        whitelistStartDateAndTime: PropTypes.string,
        mintStartDate: PropTypes.string,
        mintEndDate: PropTypes.string,
    }).isRequired,
    refresh: PropTypes.func.isRequired,
};

CollectionDetailsArea.defaultProps = {
    space: 1,
};

export default CollectionDetailsArea;

