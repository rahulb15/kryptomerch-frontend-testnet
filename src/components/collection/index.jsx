// // /* eslint-disable */
// // import PropTypes from "prop-types";
// // import Anchor from "@ui/anchor";
// // import Image from "next/image";
// // import { Rings } from "react-loader-spinner";
// // import moment from "moment";

// // const Collection = ({
// //     title,
// //     total_item,
// //     image,
// //     thumbnails,
// //     profile_image,
// //     price,
// //     reservePrice,
// //     mintStartDate,
// //     mintEndDate,
// //     data,
// //     path,
// // }) => {
// //     console.log(data);

// //     // {
// //     //     _id: '66a0dfd4e6d44576141be399',
// //     //     user: '66a0d2394efea0ada8460285',
// //     //     collectionName: 'monkeyaz7',
// //     //     creatorName: 'Rahul',
// //     //     creatorWallet:
// //     //       'k:d1d47937b0ec42efa859048d0fb5f51707639ddad991e58ae9efcff5f4ff9dbe',
// //     //     creatorEmail: 'rahulb@yopmail.com',
// //     //     projectDescription: 'Hello',
// //     //     projectCategory: 'ART',
// //     //     expectedLaunchDate: '2024-07-31',
// //     //     twitter: '',
// //     //     discord: '',
// //     //     instagram: '',
// //     //     website: '',
// //     //     totalSupply: '4',
// //     //     contractType: 'ng',
// //     //     royaltyPercentage: '0.5',
// //     //     mintPrice: '1.0',
// //     //     mintPriceCurrency: 'kda',
// //     //     tokenList: [
// //     //       'ipfs://QmVdXq6EjDEQq6U5cDqab2xvaMzHLgpQKjW56iVJYbji7a', 'ipfs://QmRPqajKGNCtKyA7oE5Lx3H8YijyfopS8oaVcdZCSUDyEP',
// //     //       'ipfs://QmPJAuW9MpZwcdzw86ECFyBqVb9HvTfHsaqAQiKCvPmSPD', 'ipfs://QmXHR1BFLd8MYMEYbrhMkboLc1oEG2tbygomaxCknosQNN'
// //     //     ],
// //     //     policy: [ 'INSTANT-MINT MARKETPLACE FIXED-SALE COLLECTION' ],
// //     //     mintStartDate: '2024-07-31T11:03:00.000Z',
// //     //     mintStartTime: 'time "2024-07-31T11:03:00Z"',
// //     //     mintEndDate: '2025-07-31T11:03:00.000Z',
// //     //     mintEndTime: 'time "2025-07-31T11:03:00Z"',
// //     //     allowFreeMints: false,
// //     //     enableWhitelist: true,
// //     //     whitelistAddresses: [],
// //     //     reservePrice: 0,
// //     //     enablePresale: true,
// //     //     presaleAddressess: [],
// //     //     enableAirdrop: false,
// //     //     isPaid: true,
// //     //     isApproved: true,
// //     //     isRejected: false,
// //     //     isLaunched: true,
// //     //     createdAt: '2024-07-24T11:04:52.182Z',
// //     //     updatedAt: '2024-07-24T11:04:52.182Z',
// //     //     __v: 0,
// //     //     collectionCoverImage:
// //     //       'https://res.cloudinary.com/dh187xay8/image/upload/v1721817315/collectionCoverImage/file.jpg',
// //     //     collectionBannerImage:
// //     //       'https://res.cloudinary.com/dh187xay8/image/upload/v1721817316/collectionBannerImage/file.jpg'
// //     //   }

// //     const renderLaunchDate = (utcDateTime) => {
// //         console.log(utcDateTime);
// //         // '2025-07-31T11:03:00.000Z'

// //         const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// //         console.log(userTimeZone);

// //         const localDateTime = moment(utcDateTime)
// //             .local()
// //             .format("YYYY-MM-DD HH:mm:ss");
// //         console.log(localDateTime);

// //         const diff = moment(utcDateTime).diff(moment(), "days");
// //         console.log(diff);

// //         return diff;
// //     };

// //     const renderLaunchInfo = () => {
// //         const now = moment();

// //         if (data.enablePresale && data.presaleStartDateAndTime) {
// //             const presaleStart = moment(data.presaleStartDateAndTime);
// //             const presaleEnd = moment(data.presaleEndDateAndTime);

// //             if (now.isBefore(presaleStart)) {
// //                 return {
// //                     status: "Upcoming",
// //                     text: "Presale starts in",
// //                     time: presaleStart.diff(now, "days"),
// //                 };
// //             } else if (now.isBetween(presaleStart, presaleEnd)) {
// //                 return {
// //                     status: "Live",
// //                     text: "Presale ends in",
// //                     time: presaleEnd.diff(now, "days"),
// //                 };
// //             }
// //         }

// //         if (data.enableWhitelist && data.whitelistStartDateAndTime) {
// //             const whitelistStart = moment(data.whitelistStartDateAndTime);
// //             const mintStart = moment(data.mintStartDate);

// //             if (now.isBefore(whitelistStart)) {
// //                 return {
// //                     status: "Upcoming",
// //                     text: "Whitelist starts in",
// //                     time: whitelistStart.diff(now, "days"),
// //                 };
// //             } else if (now.isBetween(whitelistStart, mintStart)) {
// //                 return {
// //                     status: "Live",
// //                     text: "Whitelist ends in",
// //                     time: mintStart.diff(now, "days"),
// //                 };
// //             }
// //         }

// //         const mintStart = moment(data.mintStartDate);
// //         const mintEnd = moment(data.mintEndDate);

// //         if (now.isBefore(mintStart)) {
// //             return {
// //                 status: "Upcoming",
// //                 text: "Mint starts in",
// //                 time: mintStart.diff(now, "days"),
// //             };
// //         } else if (now.isBetween(mintStart, mintEnd)) {
// //             return {
// //                 status: "Live",
// //                 text: "Mint ends in",
// //                 time: mintEnd.diff(now, "days"),
// //             };
// //         } else {
// //             return {
// //                 status: "Ended",
// //                 text: "Mint ended",
// //                 time: 0,
// //             };
// //         }
// //     };

// //     const launchInfo = renderLaunchInfo();

// //     return (
// //         <Anchor
// //             path={`/launchpad/kadena/${path}`}
// //             className="rn-collection-inner-one"
// //         >
// //             <div className="collection-wrapper">
// //                 {image && (
// //                     <div className="collection-big-thumbnail">
// //                         <Image
// //                             src={image}
// //                             alt={image?.alt || "Nft_Profile"}
// //                             width={507}
// //                             height={339}
// //                         />
// //                     </div>
// //                 )}
// //                 {/* <div className="collenction-small-thumbnail">
// //                 {thumbnails?.map((thumb) => (
// //                     <div key={thumb?.src}>
// //                         <Image
// //                             src={thumb?.src}
// //                             alt={thumb?.alt || "Nft_Profile"}
// //                             width={164}
// //                             height={110}
// //                         />
// //                     </div>
// //                 ))}
// //             </div> */}
// //                 <div className="collection-deg">
// //                     <h6 className="title">{title}</h6>
// //                     <button className="btn btn-primary">Mint</button>
// //                 </div>
// //                 <div
// //                     className="collection-deg"
// //                     style={{ justifyContent: "center" }}
// //                 >
// //                     <div className="d-flex justify-content-between">
// //                         <Rings
// //                             color={
// //                                 launchInfo.status === "Live"
// //                                     ? "green"
// //                                     : "orange"
// //                             }
// //                             height={20}
// //                             width={20}
// //                         />
// //                         <span
// //                             style={{
// //                                 fontWeight: "bold",
// //                                 color:
// //                                     launchInfo.status === "Live"
// //                                         ? "green"
// //                                         : "orange",
// //                             }}
// //                         >
// //                             {launchInfo.status}
// //                         </span>
// //                         <span
// //                             style={{ fontWeight: "bold", marginLeft: "10px" }}
// //                         >
// //                             {launchInfo.text}
// //                         </span>
// //                         <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
// //                             {launchInfo.time} days
// //                         </span>
// //                     </div>
// //                 </div>

// //                 <div className="horizontal-line"></div>
// //                 <div className="collection-footer d-flex justify-content-between">
// //                     <div className="collection-item">
// //                         <span style={{ fontWeight: "bold" }}>Items</span>
// //                     </div>
// //                     <div className="collection-item">
// //                         <span style={{ fontWeight: "bold" }}>Price</span>
// //                     </div>
// //                     <div className="collection-item">
// //                         <span style={{ fontWeight: "bold" }}>Minted</span>
// //                     </div>
// //                 </div>

// //                 <div className="collection-footer d-flex justify-content-between mt-2">
// //                     <div className="collection-item">
// //                         <span style={{ fontWeight: "bold" }}>{total_item}</span>
// //                     </div>
// //                     <div className="collection-item">
// //                         <span style={{ fontWeight: "bold" }}>{price} KDA</span>
// //                     </div>
// //                     <div className="collection-item">
// //                         <span style={{ fontWeight: "bold" }}>
// //                             {reservePrice}
// //                         </span>
// //                     </div>
// //                 </div>
// //             </div>
// //         </Anchor>
// //     );
// // };

// // Collection.propTypes = {
// //     title: PropTypes.string.isRequired,
// //     total_item: PropTypes.number.isRequired,
// //     path: PropTypes.string.isRequired,
// //     image: PropTypes.shape({
// //         src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
// //             .isRequired,
// //         alt: PropTypes.string,
// //     }).isRequired,
// //     thumbnails: PropTypes.arrayOf(
// //         PropTypes.shape({
// //             src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
// //                 .isRequired,
// //             alt: PropTypes.string,
// //         }).isRequired
// //     ).isRequired,
// //     profile_image: PropTypes.shape({
// //         src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
// //             .isRequired,
// //         alt: PropTypes.string,
// //     }).isRequired,
// // };

// // export default Collection;

// /* eslint-disable */
// import PropTypes from "prop-types";
// import Anchor from "@ui/anchor";
// import Image from "next/image";
// import { Rings } from "react-loader-spinner";
// import moment from "moment";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const Collection = ({
//     title,
//     total_item,
//     image,
//     thumbnails,
//     profile_image,
//     price,
//     reservePrice,
//     mintStartDate,
//     mintEndDate,
//     data,
//     path,
// }) => {
//     console.log(data);

//     const renderLaunchInfo = () => {
//         const now = moment();

//         const formatTimeLeft = (targetTime) => {
//             const duration = moment.duration(targetTime.diff(now));
//             const years = duration.years();
//             const months = duration.months();
//             const days = duration.days();
//             const hours = duration.hours();
//             const minutes = duration.minutes();
//             const seconds = duration.seconds();

//             if (years > 0) {
//                 return `${years} year${years > 1 ? "s" : ""} ${months} month${
//                     months > 1 ? "s" : ""
//                 }`;
//             } else if (months > 0) {
//                 return `${months} month${months > 1 ? "s" : ""} ${days} day${
//                     days > 1 ? "s" : ""
//                 }`;
//             } else if (days > 0) {
//                 return `${days} day${days > 1 ? "s" : ""} ${hours}h`;
//             } else if (hours > 0) {
//                 return `${hours}h ${minutes}m`;
//             } else if (minutes > 0) {
//                 return `${minutes}m ${seconds}s`;
//             } else {
//                 return `${seconds}s`;
//             }
//         };
//         if (data.enablePresale && data.presaleStartDateAndTime) {
//             const presaleStart = moment(data.presaleStartDateAndTime);
//             const presaleEnd = moment(data.presaleEndDateAndTime);

//             if (now.isBefore(presaleStart)) {
//                 return {
//                     status: "Upcoming",
//                     text: "Presale starts in",
//                     time: formatTimeLeft(presaleStart),
//                 };
//             } else if (now.isBetween(presaleStart, presaleEnd)) {
//                 return {
//                     status: "Live",
//                     text: "Presale ends in",
//                     time: formatTimeLeft(presaleEnd),
//                 };
//             }
//         }

//         if (data.enableWhitelist && data.whitelistStartDateAndTime) {
//             const whitelistStart = moment(data.whitelistStartDateAndTime);
//             const mintStart = moment(data.mintStartDate);

//             if (now.isBefore(whitelistStart)) {
//                 return {
//                     status: "Upcoming",
//                     text: "Whitelist starts in",
//                     time: formatTimeLeft(whitelistStart),
//                 };
//             } else if (now.isBetween(whitelistStart, mintStart)) {
//                 return {
//                     status: "Live",
//                     text: "Whitelist ends in",
//                     time: formatTimeLeft(mintStart),
//                 };
//             }
//         }

//         const mintStart = moment(data.mintStartDate);
//         const mintEnd = moment(data.mintEndDate);

//         if (now.isBefore(mintStart)) {
//             return {
//                 status: "Upcoming",
//                 text: "Mint starts in",
//                 time: formatTimeLeft(mintStart),
//             };
//         } else if (now.isBetween(mintStart, mintEnd)) {
//             return {
//                 status: "Live",
//                 text: "Mint ends in",
//                 time: formatTimeLeft(mintEnd),
//             };
//         } else {
//             return {
//                 status: "Ended",
//                 text: "Mint ended",
//                 time: "0s",
//             };
//         }
//     };
//     const [launchInfo, setLaunchInfo] = useState(renderLaunchInfo());

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setLaunchInfo(renderLaunchInfo());
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <Anchor
//             path={`/launchpad/kadena/${path}`}
//             className={`rn-collection-inner-one ${
//                 data?.collectionName === "Priority Pass" ? "priority-pass" : ""
//             }`}
//         >
//             <div className="collection-wrapper">
//                 {image && (
//                     <div className="collection-big-thumbnail">
//                         <Image
//                             src={image}
//                             alt={image?.alt || "Nft_Profile"}
//                             width={507}
//                             height={339}
//                         />
//                         <div className="mint-box">
//                             {/* <button className="mint-button">Mint Now</button> */}

//                             {launchInfo.status === "Live" ? (
//                                 <button className="mint-button">
//                                     Mint Now
//                                 </button>
//                             ) : (
//                                 <>
//                                     {launchInfo.status === "Upcoming" ? (
//                                         <butto
//                                             className="mint-button"
//                                             style={{
//                                                 backgroundColor: "orange",
//                                             }}
//                                         >
//                                             Minting Soon
//                                         </butto>
//                                     ) : (
//                                         <button
//                                             className="mint-button"
//                                             style={{ backgroundColor: "red" }}
//                                         >
//                                             Mint Ended
//                                         </button>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 )}
//                 {/*
// {image && (
//                     <motion.div
//                         className="image"
//                         whileHover={{
//                             scale: 1.05,
//                             // boxShadow: "0 0 2px #fbf39c, 0 0 5px #cbd02e, 0 0 10px #fef2a1"
//                         }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <img
//                             src={image}
//                             alt={image?.alt || "Nft_Profile"}
//                             style={{
//                                 width: "auto",
//                                 maxWidth: "385px",
//                                 height: "auto",
//                                 maxHeight: "400px",
//                                 borderRadius: "10px",
//                             }}
//                         />
//                     </motion.div>
//                 )} */}
//                 <div className="collection-deg">
//                     <h6 className="title">{title}</h6>
//                     {/* <button className="btn btn-primary">Mint</button> */}
//                 </div>
//                 <div
//                     className="collection-deg"
//                     style={{ justifyContent: "center" }}
//                 >
//                     <div className="d-flex justify-content-between">
//                         <Rings
//                             color={
//                                 launchInfo.status === "Live"
//                                     ? "green"
//                                     : "orange"
//                             }
//                             height={20}
//                             width={20}
//                         />
//                         <span
//                             style={{
//                                 fontWeight: "bold",
//                                 color:
//                                     launchInfo.status === "Live"
//                                         ? "green"
//                                         : "orange",
//                             }}
//                         >
//                             {launchInfo.status}
//                         </span>
//                         <span
//                             style={{ fontWeight: "bold", marginLeft: "10px" }}
//                         >
//                             {/* {launchInfo.text} */}
//                             {data?.collectionName === "Priority Pass"
//                                 ? ""
//                                 : launchInfo.text}
//                         </span>
//                         <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
//                             {/* {launchInfo.time} */}
//                             {data?.collectionName === "Priority Pass"
//                                 ? ""
//                                 : launchInfo.time}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="horizontal-line"></div>
//                 <div className="collection-footer d-flex justify-content-between">
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>Items</span>
//                     </div>
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>Price</span>
//                     </div>
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>Minted</span>
//                     </div>
//                 </div>

//                 <div className="collection-footer d-flex justify-content-between mt-2">
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>{total_item}</span>
//                     </div>
//                     <div className="collection-item" style={{ marginRight: "20px" }}>
//                         <span style={{ fontWeight: "bold" }}>{price} KDA</span>
//                     </div>
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>
//                             {reservePrice}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </Anchor>
//     );
// };

// Collection.propTypes = {
//     title: PropTypes.string.isRequired,
//     total_item: PropTypes.number.isRequired,
//     path: PropTypes.string.isRequired,
//     image: PropTypes.shape({
//         src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
//             .isRequired,
//         alt: PropTypes.string,
//     }).isRequired,
//     thumbnails: PropTypes.arrayOf(
//         PropTypes.shape({
//             src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
//                 .isRequired,
//             alt: PropTypes.string,
//         }).isRequired
//     ).isRequired,
//     profile_image: PropTypes.shape({
//         src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
//             .isRequired,
//         alt: PropTypes.string,
//     }).isRequired,
// };

// export default Collection;

// /* eslint-disable */
// import PropTypes from "prop-types";
// import Anchor from "@ui/anchor";
// import Image from "next/image";
// import { Rings } from "react-loader-spinner";
// import moment from "moment";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const Collection = ({
//     title,
//     total_item,
//     image,
//     thumbnails,
//     profile_image,
//     price,
//     reservePrice,
//     mintStartDate,
//     mintEndDate,
//     data,
//     path,
// }) => {
//     console.log(data);

//     const renderLaunchInfo = () => {
//         const now = moment();

//         const formatTimeLeft = (targetTime) => {
//             const duration = moment.duration(targetTime.diff(now));
//             const years = duration.years();
//             const months = duration.months();
//             const days = duration.days();
//             const hours = duration.hours();
//             const minutes = duration.minutes();
//             const seconds = duration.seconds();

//             if (years > 0) {
//                 return `${years} year${years > 1 ? "s" : ""} ${months} month${
//                     months > 1 ? "s" : ""
//                 }`;
//             } else if (months > 0) {
//                 return `${months} month${months > 1 ? "s" : ""} ${days} day${
//                     days > 1 ? "s" : ""
//                 }`;
//             } else if (days > 0) {
//                 return `${days} day${days > 1 ? "s" : ""} ${hours}h`;
//             } else if (hours > 0) {
//                 return `${hours}h ${minutes}m`;
//             } else if (minutes > 0) {
//                 return `${minutes}m ${seconds}s`;
//             } else {
//                 return `${seconds}s`;
//             }
//         };
//         if (data.enablePresale && data.presaleStartDateAndTime) {
//             const presaleStart = moment(data.presaleStartDateAndTime);
//             const presaleEnd = moment(data.presaleEndDateAndTime);

//             if (now.isBefore(presaleStart)) {
//                 return {
//                     status: "Upcoming",
//                     text: "Presale starts in",
//                     time: formatTimeLeft(presaleStart),
//                 };
//             } else if (now.isBetween(presaleStart, presaleEnd)) {
//                 return {
//                     status: "Live",
//                     text: "Presale ends in",
//                     time: formatTimeLeft(presaleEnd),
//                 };
//             }
//         }

//         if (data.enableWhitelist && data.whitelistStartDateAndTime) {
//             const whitelistStart = moment(data.whitelistStartDateAndTime);
//             const mintStart = moment(data.mintStartDate);

//             if (now.isBefore(whitelistStart)) {
//                 return {
//                     status: "Upcoming",
//                     text: "Whitelist starts in",
//                     time: formatTimeLeft(whitelistStart),
//                 };
//             } else if (now.isBetween(whitelistStart, mintStart)) {
//                 return {
//                     status: "Live",
//                     text: "Whitelist ends in",
//                     time: formatTimeLeft(mintStart),
//                 };
//             }
//         }

//         const mintStart = moment(data.mintStartDate);
//         const mintEnd = moment(data.mintEndDate);

//         if (now.isBefore(mintStart)) {
//             return {
//                 status: "Upcoming",
//                 text: "Mint starts in",
//                 time: formatTimeLeft(mintStart),
//             };
//         } else if (now.isBetween(mintStart, mintEnd)) {
//             return {
//                 status: "Live",
//                 text: "Mint ends in",
//                 time: formatTimeLeft(mintEnd),
//             };
//         } else {
//             return {
//                 status: "Ended",
//                 text: "Mint ended",
//                 time: "0s",
//             };
//         }
//     };
//     const [launchInfo, setLaunchInfo] = useState(renderLaunchInfo());

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setLaunchInfo(renderLaunchInfo());
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <Anchor
//             path={`/launchpad/kadena/${path}`}
//             className={`rn-collection-inner-one-new ${
//                 data?.collectionName === "Priority Pass" ? "priority-pass" : ""
//             }`}
//         >
//             <div className="collection-wrapper">
//                 {image && (
//                     <div className="collection-big-thumbnail">
//                         <Image
//                             src={image}
//                             alt={image?.alt || "Nft_Profile"}
//                             width={507}
//                             height={339}
//                         />
//                     </div>
//                 )}
//                 <div className="collection-deg">
//                     <h6 className="title">{title}</h6>
//                 </div>
//                 <div
//                     className="collection-deg"
//                     style={{ justifyContent: "center" }}
//                 >
//                     <div className="d-flex justify-content-between">
//                         <Rings
//                             color={
//                                 launchInfo.status === "Live"
//                                     ? "green"
//                                     : "orange"
//                             }
//                             height={20}
//                             width={20}
//                         />
//                         <span
//                             style={{
//                                 fontWeight: "bold",
//                                 color:
//                                     launchInfo.status === "Live"
//                                         ? "green"
//                                         : "orange",
//                             }}
//                         >
//                             {launchInfo.status}
//                         </span>
//                         <span
//                             style={{ fontWeight: "bold", marginLeft: "10px" }}
//                         >
//                             {/* {launchInfo.text} */}
//                             {data?.collectionName === "Priority Pass"
//                                 ? ""
//                                 : launchInfo.text}
//                         </span>
//                         <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
//                             {/* {launchInfo.time} */}
//                             {data?.collectionName === "Priority Pass"
//                                 ? ""
//                                 : launchInfo.time}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="horizontal-line"></div>
//                 <div className="collection-footer d-flex justify-content-between">
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>Items</span>
//                     </div>
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>Price</span>
//                     </div>
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>Minted</span>
//                     </div>
//                 </div>

//                 <div className="collection-footer d-flex justify-content-between mt-2">
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>{total_item}</span>
//                     </div>
//                     <div className="collection-item" style={{ marginRight: "20px" }}>
//                         <span style={{ fontWeight: "bold" }}>{price} KDA</span>
//                     </div>
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>
//                             {reservePrice}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </Anchor>
//     );
// };

// Collection.propTypes = {
//     title: PropTypes.string.isRequired,
//     total_item: PropTypes.number.isRequired,
//     path: PropTypes.string.isRequired,
//     image: PropTypes.shape({
//         src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
//             .isRequired,
//         alt: PropTypes.string,
//     }).isRequired,
//     thumbnails: PropTypes.arrayOf(
//         PropTypes.shape({
//             src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
//                 .isRequired,
//             alt: PropTypes.string,
//         }).isRequired
//     ).isRequired,
//     profile_image: PropTypes.shape({
//         src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
//             .isRequired,
//         alt: PropTypes.string,
//     }).isRequired,
// };

// export default Collection;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Rings } from "react-loader-spinner";
import moment from "moment";
import Image from "next/image";
import KadenaLogo from "src/data/icons/Kadena";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NFTCollectionCard = ({
    title,
    total_item,
    image,
    price,
    reservePrice,
    data,
    path,
}) => {
    const router = useRouter();
    console.log(data);
    // const renderLaunchInfo = () => {
    //     const now = moment();

    //     const formatTimeLeft = (targetTime) => {
    //         const duration = moment.duration(targetTime.diff(now));
    //         const years = duration.years();
    //         const months = duration.months();
    //         const days = duration.days();
    //         const hours = duration.hours();
    //         const minutes = duration.minutes();
    //         const seconds = duration.seconds();

    //         if (years > 0) return `${years}y ${days}d ${hours}h`;
    //         if (months > 0) return `${months}m ${days}d ${hours}h`;
    //         if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    //         if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    //         if (minutes > 0) return `${minutes}m ${seconds}s`;
    //         return `${seconds}s`;
    //     };

    //     const mintStart = moment(data.mintStartDate);
    //     const mintEnd = moment(data.mintEndDate);

    //     if (now.isBefore(mintStart)) {
    //         return {
    //             status: "Upcoming",
    //             text: "Mint starts in",
    //             time: formatTimeLeft(mintStart),
    //         };
    //     } else if (now.isBetween(mintStart, mintEnd)) {
    //         return {
    //             status: "Live",
    //             text: "Mint ends in",
    //             time: formatTimeLeft(mintEnd),
    //         };
    //     } else {
    //         return {
    //             status: "Ended",
    //             text: "Mint ended",
    //             time: "0s",
    //         };
    //     }
    // };


    const renderLaunchInfo = () => {
        const now = moment();

        const formatTimeLeft = (targetTime) => {
            const duration = moment.duration(targetTime.diff(now));
            const years = duration.years();
            const months = duration.months();
            const days = duration.days();
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();

            if (years > 0) return `${years}y ${days}d ${hours}h`;
            if (months > 0) return `${months}m ${days}d ${hours}h`;
            if (days > 0) return `${days}d ${hours}h ${minutes}m`;
            if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
            if (minutes > 0) return `${minutes}m ${seconds}s`;
            return `${seconds}s`;
        };

        const mintStart = moment(data.mintStartDate);
        const mintEnd = moment(data.mintEndDate);

        if (now.isBefore(mintStart)) {
            return {
                status: "Upcoming",
                text: "Mint starts in",
                time: formatTimeLeft(mintStart),
                color: "#FFA500", // Orange for upcoming
                bgColor: "rgba(255, 165, 0, 0.1)",
                borderColor: "#FFA500"
            };
        } else if (now.isBetween(mintStart, mintEnd)) {
            return {
                status: "Live",
                text: "Mint ends in",
                time: formatTimeLeft(mintEnd),
                color: "#4CAF50", // Green for live
                bgColor: "rgba(203, 208, 46, 0.1)",
                borderColor: "#CBD02E"
            };
        } else {
            return {
                status: "Ended",
                text: "Mint ended",
                time: "0s",
                color: "#FF4444", // Red for ended
                bgColor: "rgba(255, 68, 68, 0.1)",
                borderColor: "#FF4444"
            };
        }
    };

    const [launchInfo, setLaunchInfo] = useState(renderLaunchInfo());
    const routePath = `/launchpad/kadena/${path}`;

    useEffect(() => {
        const timer = setInterval(() => {
            setLaunchInfo(renderLaunchInfo());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="collection-card">
            <div className="nft-card__image-wrapper">
                <div className="nft-card__badges">
                    <div className="nft-card__kadena-badge">
                        {/* <KadenaLogo width={16} height={16} /> */}
                        <KadenaLogo
                            className={"bitcoin-icon--black-collection"}
                        />
                    </div>
                    <div className="nft-card__edition-badge">
                        <span className="nft-card__edition-text">
                            Limited EDITION
                        </span>
                    </div>
                </div>
                {/* <div className="nft-card__image-container">
                    <Image
                        src={image}
                        alt={title}
                        className="nft-card__image"
                        width={320}
                        height={256}
                    />
                </div> */}

                <Link href={routePath} className="nft-card__image-container">
                    <Image
                        src={image}
                        alt={title}
                        className="nft-card__image"
                        width={320}
                        height={256}
                    />
                </Link>
            </div>

            <div className="nft-card__content">
                <h3 className="nft-card__title">{title}</h3>

                <div className="nft-card__stats">
                    <div className="nft-card__stats-column">
                        <span className="nft-card__stats-label">Items</span>
                        <span className="nft-card__stats-value">
                            {total_item}
                        </span>
                    </div>
                    <div className="nft-card__stats-column">
                        <span className="nft-card__stats-label">Price</span>
                        <span className="nft-card__stats-value">
                            {price} KDA
                        </span>
                    </div>
                    <div className="nft-card__stats-column">
                        <span className="nft-card__stats-label">Minted</span>
                        <span className="nft-card__stats-value">
                            {reservePrice}
                        </span>
                    </div>
                </div>

                {/* <div className="nft-card__status-wrapper">
                    <div className="nft-card__status-container">
                        <div className="nft-card__live-indicator">
                            <Rings color="#4CAF50" height={16} width={16} />
                            <span className="nft-card__live-status">Live</span>
                        </div>
                        <div className="nft-card__time-info">
                            <span className="nft-card__time-label">
                                Mint ends in
                            </span>
                            <span className="nft-card__time-value">
                                {launchInfo.time}
                            </span>
                        </div>
                    </div>
                    <button
                        className="nft-card__mint-button"
                        onClick={() => router.push(routePath)}
                    >
                        Mint
                    </button>
                </div> */}

<div className="nft-card__status-wrapper">
                <div 
                    className="nft-card__status-container"
                    style={{
                        background: launchInfo.bgColor,
                        borderColor: launchInfo.borderColor
                    }}
                >
                    <div className="nft-card__live-indicator">
                        <Rings 
                            color={launchInfo.color} 
                            height={16} 
                            width={16} 
                        />
                        <span 
                            className="nft-card__live-status"
                            style={{ color: launchInfo.color }}
                        >
                            {launchInfo.status}
                        </span>
                    </div>
                    <div className="nft-card__time-info">
                        <span className="nft-card__time-label">
                            {launchInfo.text}
                        </span>
                        <span className="nft-card__time-value">
                            {launchInfo.time}
                        </span>
                    </div>
                </div>
                <button
                    className="nft-card__mint-button"
                    onClick={() => router.push(routePath)}
                    style={{
                        opacity: launchInfo.status === "Ended" ? 0.5 : 1,
                        cursor: launchInfo.status === "Ended" ? "not-allowed" : "pointer"
                    }}
                    disabled={launchInfo.status === "Ended"}
                >
                    {launchInfo.status === "Ended" ? "Ended" : 
                     launchInfo.status === "Upcoming" ? "Coming Soon" : "Mint"}
                </button>
            </div>
            </div>
        </div>
    );
};

NFTCollectionCard.propTypes = {
    title: PropTypes.string.isRequired,
    total_item: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    reservePrice: PropTypes.number.isRequired,
    data: PropTypes.shape({
        mintStartDate: PropTypes.string.isRequired,
        mintEndDate: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
};

export default NFTCollectionCard;

// import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import {
//   Card,
//   CardHeader,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   Box,
//   CircularProgress
// } from '@mui/material';
// import moment from 'moment';

// // Styled components
// const StyledCard = styled(Card)(({ theme }) => ({
//   width: '100%',
//   maxWidth: 507,
//   height: 600, // Fixed height for card
//   display: 'flex',
//   flexDirection: 'column',
//   '&:hover': {
//     transform: 'translateY(-5px)',
//     transition: 'transform 0.3s ease-in-out'
//   }
// }));

// const ImageWrapper = styled(Box)({
//   position: 'relative',
//   width: '100%',
//   paddingTop: '66.66%', // 3:2 aspect ratio
//   overflow: 'hidden'
// });

// const StyledCardMedia = styled(CardMedia)({
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   objectPosition: 'center'
// });

// const ContentWrapper = styled(CardContent)({
//   flexGrow: 1,
//   display: 'flex',
//   flexDirection: 'column'
// });

// const MintButton = styled(Button)(({ status }) => ({
//   backgroundColor: status === 'Live' ? '#4CAF50' :
//                   status === 'Upcoming' ? 'orange' : 'red',
//   color: 'white',
//   padding: '12px',
//   '&:hover': {
//     backgroundColor: status === 'Live' ? '#45a049' :
//                     status === 'Upcoming' ? '#ffa500' : '#ff0000',
//   }
// }));

// const StatusIndicator = styled(Box)(({ status }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: theme => theme.spacing(1),
//   color: status === 'Live' ? '#4CAF50' :
//          status === 'Upcoming' ? 'orange' : 'red',
//   fontWeight: 'bold'
// }));

// const InfoGrid = styled(Box)({
//   borderTop: '1px solid rgba(0, 0, 0, 0.12)',
//   marginTop: '16px',
//   paddingTop: '16px',
//   display: 'grid',
//   gridTemplateColumns: 'repeat(3, 1fr)',
//   gap: '16px',
//   '& > div': {
//     textAlign: 'center'
//   }
// });

// const CollectionCard = ({
//   title,
//   totalItems,
//   image,
//   price,
//   reservePrice,
//   mintStartDate,
//   mintEndDate,
//   data,
//   path
// }) => {
//   const renderLaunchInfo = () => {
//     const now = moment();

//     const formatTimeLeft = (targetTime) => {
//       const duration = moment.duration(targetTime.diff(now));
//       const days = duration.days();
//       const hours = duration.hours();
//       const minutes = duration.minutes();
//       const seconds = duration.seconds();

//       if (days > 0) return `${days}d ${hours}h`;
//       if (hours > 0) return `${hours}h ${minutes}m`;
//       if (minutes > 0) return `${minutes}m ${seconds}s`;
//       return `${seconds}s`;
//     };

//     // Check presale status
//     if (data.enablePresale && data.presaleStartDateAndTime) {
//       const presaleStart = moment(data.presaleStartDateAndTime);
//       const presaleEnd = moment(data.presaleEndDateAndTime);

//       if (now.isBefore(presaleStart)) {
//         return {
//           status: 'Upcoming',
//           text: 'Presale starts in',
//           time: formatTimeLeft(presaleStart)
//         };
//       } else if (now.isBetween(presaleStart, presaleEnd)) {
//         return {
//           status: 'Live',
//           text: 'Presale ends in',
//           time: formatTimeLeft(presaleEnd)
//         };
//       }
//     }

//     // Check whitelist status
//     if (data.enableWhitelist && data.whitelistStartDateAndTime) {
//       const whitelistStart = moment(data.whitelistStartDateAndTime);
//       const mintStart = moment(data.mintStartDate);

//       if (now.isBefore(whitelistStart)) {
//         return {
//           status: 'Upcoming',
//           text: 'Whitelist starts in',
//           time: formatTimeLeft(whitelistStart)
//         };
//       } else if (now.isBetween(whitelistStart, mintStart)) {
//         return {
//           status: 'Live',
//           text: 'Whitelist ends in',
//           time: formatTimeLeft(mintStart)
//         };
//       }
//     }

//     // Check regular mint status
//     const mintStart = moment(data.mintStartDate);
//     const mintEnd = moment(data.mintEndDate);

//     if (now.isBefore(mintStart)) {
//       return {
//         status: 'Upcoming',
//         text: 'Mint starts in',
//         time: formatTimeLeft(mintStart)
//       };
//     } else if (now.isBetween(mintStart, mintEnd)) {
//       return {
//         status: 'Live',
//         text: 'Mint ends in',
//         time: formatTimeLeft(mintEnd)
//       };
//     }

//     return {
//       status: 'Ended',
//       text: 'Mint ended',
//       time: '0s'
//     };
//   };

//   const [launchInfo, setLaunchInfo] = useState(renderLaunchInfo());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setLaunchInfo(renderLaunchInfo());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//       <StyledCard elevation={2}>
//         <ImageWrapper>
//           <StyledCardMedia
//             component="img"
//             image={image}
//             alt={title}
//           />
//         </ImageWrapper>

//         <ContentWrapper>
//           <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
//             {title}
//           </Typography>

//           <StatusIndicator status={launchInfo.status} sx={{ mb: 2 }}>
//             <CircularProgress
//               size={20}
//               thickness={5}
//               sx={{
//                 color: launchInfo.status === 'Live' ? '#4CAF50' :
//                        launchInfo.status === 'Upcoming' ? 'orange' : 'red'
//               }}
//             />
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//               {launchInfo.status}
//             </Typography>
//             {data?.collectionName !== "Priority Pass" && (
//               <>
//                 <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
//                   {launchInfo.text}
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
//                   {launchInfo.time}
//                 </Typography>
//               </>
//             )}
//           </StatusIndicator>

//           <InfoGrid>
//             <Box>
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
//                 Items
//               </Typography>
//               <Typography variant="body2">
//                 {totalItems}
//               </Typography>
//             </Box>
//             <Box>
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
//                 Price
//               </Typography>
//               <Typography variant="body2">
//                 {price} KDA
//               </Typography>
//             </Box>
//             <Box>
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
//                 Minted
//               </Typography>
//               <Typography variant="body2">
//                 {reservePrice}
//               </Typography>
//             </Box>
//           </InfoGrid>
//         </ContentWrapper>

//         <CardActions sx={{ p: 2, pt: 0 }}>
//           {/* <MintButton
//             fullWidth
//             status={launchInfo.status}
//             variant="contained"
//             disableElevation
//           >
//             {launchInfo.status === 'Live' ? 'Mint Now' :
//              launchInfo.status === 'Upcoming' ? 'Minting Soon' :
//              'Mint Ended'}
//           </MintButton> */}
//         </CardActions>
//       </StyledCard>
//   );
// };

// export default CollectionCard;
