// import PropTypes from "prop-types";
// import Link from "next/link";
// import Image from "next/image";
// import { Rings } from "react-loader-spinner";
// import moment from "moment";
// import { useEffect, useState } from "react";
// import { useUnrevealedTokensMutation } from "src/services/marketplace.service";
// // import { useDispatch } from "react-redux";
// import { useAccountContext } from "src/contexts";
// import Swal from "sweetalert2";
// import { UnrevealedTokensModal } from "./Models";
// import PlaceBidModal from "@components/modals/placebid-modal";
// import { useRouter } from "next/navigation";

// const MarketCollection = ({
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
//     console.log("data", data,total_item);
//     const [unrevealedTokens, { isLoading, isError, error }] =
//         useUnrevealedTokensMutation();
//     const account = useAccountContext();
//     const router = useRouter();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [tableData, setTableData] = useState([]);
//     const user = account?.user;
//     // const dispatch = useDispatch();
//     const [refresh, setRefresh] = useState(false);
//     const [modalOpen, setModalOpen] = useState(false);

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

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         router.push(`/launchpad/kadena/${path}`);
//     };

//     console.log("tableData", tableData);

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setRefresh(true);
//         setModalOpen(false);
//     };

//     return (
//         <>
//             <Link href={`/launchpad/kadena/${path}`} passHref>
//                 <div
//                     className={`rn-collection-inner-one ${
//                         data?.collectionName === "Priority Pass"
//                             ? "priority-pass"
//                             : ""
//                     }`}
//                 >
//                     <div className="collection-wrapper">
//                         {image && (
//                             <div className="collection-big-thumbnail">
//                                 <Image
//                                     src={image}
//                                     alt={image?.alt || "Nft_Profile"}
//                                     width={507}
//                                     height={339}
//                                 />
//                             </div>
//                         )}
//                         <div className="collection-deg">
//                             <h6 className="title">{title}</h6>
//                             <button
//                                 className="btn btn-primary"
//                                 onClick={onSubmit}
//                             >
//                                 Mint
//                             </button>
//                         </div>
//                         <div
//                             className="collection-deg"
//                             style={{ justifyContent: "center" }}
//                         >
//                             <div className="d-flex justify-content-between">
//                                 <Rings
//                                     color={
//                                         launchInfo?.status === "Live"
//                                             ? "green"
//                                             : "orange"
//                                     }
//                                     height={20}
//                                     width={20}
//                                 />
//                                 <span
//                                     style={{
//                                         fontWeight: "bold",
//                                         color:
//                                             launchInfo.status === "Live"
//                                                 ? "green"
//                                                 : "orange",
//                                     }}
//                                 >
//                                     {launchInfo.status}
//                                 </span>
//                                 <span
//                                     style={{
//                                         fontWeight: "bold",
//                                         marginLeft: "10px",
//                                     }}
//                                 >
//                                     {data?.collectionName === "Priority Pass"
//                                         ? ""
//                                         : launchInfo.text}
//                                 </span>
//                                 <span
//                                     style={{
//                                         fontWeight: "bold",
//                                         marginLeft: "5px",
//                                     }}
//                                 >
//                                     {data?.collectionName === "Priority Pass"
//                                         ? ""
//                                         : launchInfo.time}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="horizontal-line"></div>
//                         <div className="collection-footer d-flex justify-content-between">
//                             <div className="collection-item">
//                                 <span style={{ fontWeight: "bold" }}>
//                                     Items
//                                 </span>
//                             </div>
//                             <div className="collection-item">
//                                 <span style={{ fontWeight: "bold" }}>
//                                     Price
//                                 </span>
//                             </div>
//                             <div className="collection-item">
//                                 <span style={{ fontWeight: "bold" }}>
//                                     Minted
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="collection-footer d-flex justify-content-between mt-2">
//                             <div className="collection-item">
//                                 <span style={{ fontWeight: "bold" }}>
//                                     {total_item}
//                                 </span>
//                             </div>
//                             <div className="collection-item">
//                                 <span style={{ fontWeight: "bold" }}>
//                                     {price}
//                                 </span>
//                             </div>
//                             <div className="collection-item">
//                                 <span style={{ fontWeight: "bold" }}>
//                                     {reservePrice}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Link>
//             <UnrevealedTokensModal
//                 open={isModalOpen}
//                 handleClose={handleCloseModal}
//                 data={tableData}
//             />
//         </>
//     );
// };

// MarketCollection.propTypes = {
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

// export default MarketCollection;




import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';

const MarketCollection = ({ data, path }) => {
    console.log("data", data);
  const {
    collectionName,
    totalSupply,
    reservePrice,
    firstTokenData,
    collectionCoverImage,
    mintStartDate,
    mintEndDate
  } = data;

  const renderLaunchInfo = () => {
    const now = moment();
    const mintStart = moment(mintStartDate);
    const mintEnd = moment(mintEndDate);

    if (now.isBefore(mintStart)) {
      return { status: 'Upcoming', text: 'Mint starts in', time: mintStart.fromNow() };
    } else if (now.isBetween(mintStart, mintEnd)) {
      return { status: 'Live', text: 'Mint ends in', time: mintEnd.fromNow() };
    } else {
      return { status: 'Ended', text: 'Mint ended', time: '0s' };
    }
  };

  const launchInfo = renderLaunchInfo();

  return (
    <Link href={`/collections/kadena/${path}`} passHref>
      <div className="rn-collection-inner-one">
        <div className="collection-wrapper">
          {collectionCoverImage ? (
            <div className="collection-big-thumbnail">
              <Image
                src={collectionCoverImage}
                alt={collectionName}
                width={507}
                height={339}
              />
            </div>
          ) : (
            <div className="collection-big-thumbnail">
                <Image
                    src={"/assets-images/collections/noimagefound.webp"}
                    alt={collectionName}
                    width={507}
                    height={339}
                />
            </div>
            )}


          <div className="collection-deg">
            <h6 className="title">{collectionName}</h6>
            {/* <button className="btn btn-primary">Mint</button> */}
          </div>
          {/* <div className="collection-deg" style={{ justifyContent: 'center' }}>
            <div className="d-flex justify-content-between">
              <span style={{
                fontWeight: 'bold',
                color: launchInfo.status === 'Live' ? 'green' : 'orange'
              }}>
                {launchInfo.status}
              </span>
              <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
                {launchInfo.text}
              </span>
              <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                {launchInfo.time}
              </span>
            </div>
          </div> */}

          <div className="horizontal-line"></div>
          <div className="collection-footer d-flex justify-content-between">
            <div className="collection-item">
              <span style={{ fontWeight: 'bold' }}>Items</span>
            </div>
            <div className="collection-item">
              <span style={{ fontWeight: 'bold' }}>Price</span>
            </div>
            <div className="collection-item">
              <span style={{ fontWeight: 'bold' }}>Minted</span>
            </div>
          </div>

          <div className="collection-footer d-flex justify-content-between mt-2">
            <div className="collection-item">
              <span style={{ fontWeight: 'bold' }}>{totalSupply}</span>
            </div>
            <div className="collection-item">
              <span style={{ fontWeight: 'bold' }}>{reservePrice}</span>
            </div>
            <div className="collection-item">
              <span style={{ fontWeight: 'bold' }}>{data.size}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

MarketCollection.propTypes = {
  data: PropTypes.shape({
    collectionName: PropTypes.string.isRequired,
    totalSupply: PropTypes.number.isRequired,
    reservePrice: PropTypes.number.isRequired,
    firstTokenData: PropTypes.shape({
      img_link: PropTypes.string.isRequired,
    }).isRequired,
    collectionCoverImage: PropTypes.string.isRequired,
    mintStartDate: PropTypes.string.isRequired,
    mintEndDate: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
  }).isRequired,
  path: PropTypes.string.isRequired,
};

export default MarketCollection;