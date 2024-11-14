// import { useState } from "react";
// import dynamic from "next/dynamic";
// import PropTypes from "prop-types";
// import Image from "next/image";
// import clsx from "clsx";
// import { motion } from "framer-motion";
// import ClientAvatar from "@ui/client-avatar";
// import Button from "@ui/button";
// import PlaceBidModal from "@components/modals/placebid-modal";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import Swal from "sweetalert2";
// import NftMarketPlaceDetailModal from "@components/marketplace-nft/NftMarketPlaceDetailModal";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { IconButton } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { addToCart } from "src/features/cartSlice";
// import { toast } from "react-toastify";
// const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
//     ssr: false,
// });

// const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
//     ssr: false,
// });

// const Product = ({ nft }) => {
//     console.log(nft);
//     const dispatch = useDispatch();
//     const [showBidModal, setShowBidModal] = useState(false);
//     const [showDetailModal, setShowDetailModal] = useState(false);

//     const handleBidModal = () => {
//         setShowBidModal((prev) => !prev);
//     };

//     const handleCloseModal = () => {
//         setShowDetailModal(false);
//     };

//     const handleImageClick = () => {
//         setShowDetailModal(true);
//     };

//     const copyTokenId = () => {
//         navigator.clipboard.writeText(nft.tokenId);
//         Swal.fire({
//             icon: "success",
//             title: "Token ID copied to clipboard",
//             showConfirmButton: false,
//             timer: 1500,
//         });
//     };

//     const send = (e) => {
//         console.log(e);
//         dispatch(addToCart(e));
//         // toast.success("Item added In Your Cart");
//       };

//     return (
//         <>
//             <motion.div
//                 className={clsx(
//                     "product-style-one",
//                     nft.onSale && "with-placeBid"
//                 )}
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//             >
//             {/* <div className={clsx("product-style-one", nft.onSale && "with-placeBid")}> */}
//                 <div className="card-thumbnail" onClick={handleImageClick}>
//                     {nft.tokenImage && (
//                         <Image
//                             src={nft.tokenImage}
//                             alt={nft.collectionName || "NFT_portfolio"}
//                             width={533}
//                             height={533}
//                             className="nft-image"
//                         />
//                     )}
//                     {nft.duration && <CountdownTimer date={nft.duration} />}

//                 </div>
//                 <div className="product-share-wrapper">
//                     <div className="profile-share">
//                         {nft.properties[0]?.authors?.map((author) => (
//                             <ClientAvatar
//                                 key={author.name}
//                                 slug={author.name}
//                                 name={author.name}
//                                 image={{ src: nft.user.profileImage }}
//                             />
//                         ))}
//                     </div>
//                     <ShareDropdown />
//                 </div>
//                 <div
//                     style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         gap: "5px",
//                     }}
//                 >
//                     <span className="product-name">
//                         {nft.tokenId.slice(0, 10)}...{nft.tokenId.slice(-10)}{" "}
//                     </span>
//                     <div
//                         style={{
//                             display: "flex",
//                             alignItems: "center",
//                             marginLeft: "5px",
//                             marginTop: "10px",
//                         }}
//                     >
//                         <ContentCopyIcon onClick={copyTokenId} />
//                     </div>
//                 </div>
//                  <IconButton
//                         onClick={() => send(nft)}
//                         style={{
//                         position: "absolute",
//                         bottom: "10px",
//                         right: "10px",
//                         backgroundColor: "rgba(255, 255, 255, 0.8)",
//                         border: "none",
//                         borderRadius: "50%",
//                         padding: "8px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         cursor: "pointer",
//                         width: "40px",
//                         height: "40px",
//                     }}
//                 >
//                         <ShoppingCartIcon />
//                     </IconButton>
//             </motion.div>
//             {/* </div> */}

//             <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
//             {showDetailModal && (
//                 <NftMarketPlaceDetailModal
//                     open={showDetailModal}
//                     onClose={handleCloseModal}
//                     data={nft}
//                 />
//             )}
//             <style jsx>{`
//                 .card-thumbnail {
//                     position: relative;
//                     overflow: hidden;
//                     cursor: pointer;
//                 }
//                 .nft-image {
//                     display: block;
//                     width: 100%;
//                     height: auto;
//                 }
//                 .buy-now-container {
//                     position: absolute;
//                     top: 50%;
//                     left: 50%;
//                     transform: translate(-50%, -50%);
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     opacity: 0;
//                     transition: opacity 0.3s ease, transform 0.3s ease;
//                 }
//                 .buy-now-button {
//                     background: linear-gradient(90deg, #ff8a00, #e52e71);
//                     border-radius: 5px;
//                     padding: 10px 20px;
//                     font-size: 14px;
//                     color: #fff;
//                 }
//                 .product-style-one:hover .buy-now-container {
//                     opacity: 1;
//                     transform: translate(-50%, -50%);
//                 }
//                 .cart-button {
//                     position: absolute;
//                     bottom: 10px;
//                     right: 10px;
//                     background-color: rgba(255, 255, 255, 0.8);
//                     border: none;
//                     border-radius: 50%;
//                     padding: 8px;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     cursor: pointer;
//                     opacity: 0;
//                     transition: opacity 0.3s ease, transform 0.3s ease;
//                 }
//                 .product-style-one:hover .cart-button {
//                     opacity: 1;
//                     transform: translateY(0);
//                 }
//             `}</style>
//         </>
//     );
// };

// Product.propTypes = {
//     nft: PropTypes.shape({
//         tokenId: PropTypes.string.isRequired,
//         tokenImage: PropTypes.string.isRequired,
//         collectionName: PropTypes.string.isRequired,
//         duration: PropTypes.string,
//         onSale: PropTypes.bool.isRequired,
//         properties: PropTypes.arrayOf(
//             PropTypes.shape({
//                 collection: PropTypes.shape({
//                     name: PropTypes.string.isRequired,
//                     family: PropTypes.string.isRequired,
//                 }).isRequired,
//                 authors: PropTypes.arrayOf(
//                     PropTypes.shape({
//                         name: PropTypes.string.isRequired,
//                     }).isRequired
//                 ).isRequired,
//             }).isRequired
//         ).isRequired,
//         bidInfo: PropTypes.array.isRequired,
//         likes: PropTypes.number.isRequired,
//         nftPrice: PropTypes.number.isRequired,
//         user: PropTypes.shape({
//             profileImage: PropTypes.string.isRequired,
//         }).isRequired,
//     }).isRequired,
// };

// export default Product;

import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import NftMarketPlaceDetailModal from "@components/marketplace-nft/NftMarketPlaceDetailModal";
import { addToCart, selectIsInCart } from "src/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import MerchModal from "@components/merchandisingModal/modal-merch";
import NFTAudioControls from "./NFTAudioControls";

const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const Product = ({ nft, disableShareDropdown }) => {
    console.log(nft);
    const [showBidModal, setShowBidModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const isItemInCart = useSelector((state) => selectIsInCart(state, nft._id));
    const [showMerchModal, setShowMerchModal] = useState(false);

    const handleOpenModal = () => {
        setShowDetailModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailModal(false);
    };

    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };

    const handleMerchModal = (e) => {
        e.stopPropagation(); // Prevent triggering the card's onClick
        setShowMerchModal(true);
    };

    const handleCloseMerchModal = () => {
        setShowMerchModal(false);
    };

    const copyTokenId = () => {
        navigator.clipboard.writeText(nft.tokenId);
        Swal.fire({
            icon: "success",
            title: "Token ID copied to clipboard",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: "my-swal",
            },
        });
    };

    const handleAddToCart = () => {
        dispatch(addToCart(nft));
    };

    const isRevealed = nft.isRevealed;
    const isOnMarketplace = nft.onMarketplace;
    const isOnSale = nft.onSale;
    const isOnAuction = nft.onAuction || nft.onDutchAuction;
    console.log(isOnAuction);

    const buttonStyle = {
        height: "40px",
        width: "50%",
        borderRadius: "20px",
        padding: "0 20px",
        fontSize: "14px",
        fontWeight: "bold",
        textTransform: "uppercase",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const buyButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#a5c600",
        color: "white",
    };

    const bidButtonStyle = {
        ...buttonStyle,
        backgroundColor: `${nft.onDutchAuction ? "#d72700" : "#f0b90b"}`,
        color: "white",
    };

    return (
        <>
            <div
                className={clsx(
                    "product-style-one",
                    !isOnMarketplace && "no-overlay",
                    isOnAuction && "with-placeBid"
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="card-thumbnail" onClick={handleOpenModal}>
                {nft?.nftData?.audio && <NFTAudioControls nft={nft} />}

                    <Image
                        src={nft.tokenImage}
                        alt={nft?.nftData?.name || "NFT"}
                        width={533}
                        height={533}
                    />
                    {/* Updated interactive logo overlay */}
                    <motion.div
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            zIndex: 10,
                            width: "40px",
                            height: "40px",
                            overflow: "hidden",
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleMerchModal}
                    >
                        <Image
                            src="/assets-images/merch-image.jpeg"
                            alt="Logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </motion.div>
                    {isOnAuction && <CountdownTimer date={nft.timeout} />}

                    {isRevealed && isOnMarketplace && isHovered && (
                        <motion.div
                            className="sell-button-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                background: "rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            {isOnSale && (
                                <motion.button
                                    onClick={() =>
                                        console.log("Buy clicked", nft)
                                    }
                                    style={buyButtonStyle}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: "#8fa800",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                    }}
                                >
                                    Buy Now
                                </motion.button>
                            )}
                            {isOnAuction && (
                                <motion.button
                                    onClick={handleOpenModal}
                                    style={bidButtonStyle}
                                    whileHover={{
                                        scale: 1.05,
                                        // backgroundColor: "#d9a400",
                                        backgroundColor: `${
                                            nft.onDutchAuction
                                                ? "#d72700"
                                                : "#f0b90b"
                                        }`,
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                    }}
                                >
                                    {/* Place Bid */}
                                    {nft.onDutchAuction
                                        ? "Buy Now"
                                        : "Place Bid"}
                                </motion.button>
                            )}
                        </motion.div>
                    )}
                </div>
                <div className="product-share-wrapper">
                    <div className="profile-share">
                        {isOnMarketplace && (
                            <IconButton
                                onClick={handleAddToCart}
                                style={{
                                    color: "white",
                                    backgroundColor: isItemInCart
                                        ? "#cccccc"
                                        : "#a5c600",
                                }}
                                disabled={isItemInCart}
                            >
                                <ShoppingCartIcon />
                            </IconButton>
                        )}
                    </div>
                    <div className="profile-share">
                        <span
                            style={{
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                            }}
                        >
                            {nft?.onAuction
                                ? "Auction"
                                : nft?.onDutchAuction
                                ? "Dutch Auction"
                                : nft?.onSale
                                ? "Fixed Sale"
                                : "Not for sale"}
                        </span>
                    </div>
                    {!disableShareDropdown && <ShareDropdown />}
                </div>
                <Anchor path={`/product/${nft.tokenId}`}>
                    <span
                        className="product-name"
                        style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "5px",
                        }}
                    >
                        {nft?.nftData?.name || "Not available"}
                    </span>
                </Anchor>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                        fontSize: "12px",
                        color: "#666",
                    }}
                >
                    <span className="token-id" style={{ marginRight: "5px" }}>
                        {`${nft.tokenId.slice(0, 6)}...${nft.tokenId.slice(
                            -4
                        )}`}
                    </span>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ cursor: "pointer" }}
                    >
                        <ContentCopyIcon
                            onClick={copyTokenId}
                            style={{ fontSize: "16px", color: "#888" }}
                        />
                    </motion.div>
                </div>
                <span
                    className="latest-bid"
                    style={{ display: "block", fontSize: "14px" }}
                >
                    {isOnAuction ? (
                        <>
                            <span style={{ fontWeight: "bold" }}>
                                {/* Highest bid: */}
                                {nft?.onAuction ? "Highest bid" : "Price"}:
                            </span>{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {/* {nft.currentPrice} */}
                                {nft?.onAuction
                                    ? nft?.currentPrice
                                    : nft?.nftPrice}
                            </span>{" "}
                            {/* {nft.currency} */}
                            <span style={{ fontSize: "14px" }}>KDA</span>
                        </>
                    ) : isOnSale ? (
                        <>
                            <span style={{ fontWeight: "bold" }}>Price:</span>{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {nft.nftPrice}
                            </span>{" "}
                            {/* {nft.currency} */}
                            <span style={{ fontSize: "14px" }}>KDA</span>
                        </>
                    ) : (
                        "Not for sale"
                    )}
                </span>
                <div className="collection-info">
                    <span>Collection: {nft.collectionName}</span>
                </div>
            </div>
            {showDetailModal && (
                <NftMarketPlaceDetailModal
                    open={showDetailModal}
                    onClose={handleCloseModal}
                    data={nft}
                />
            )}
            {showBidModal && (
                <PlaceBidModal
                    show={showBidModal}
                    handleModal={handleBidModal}
                    data={nft}
                />
            )}

            {showMerchModal && (
                <MerchModal
                    open={showMerchModal}
                    onClose={handleCloseMerchModal}
                    // Add any props the LogoModal might need
                />
            )}
            {/* 
<style jsx>{`
                .card-thumbnail {
                    position: relative;
                }
                .logo-overlay {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    z-index: 10;
                }
            `}</style> */}
        </>
    );
};

Product.propTypes = {
    nft: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        tokenId: PropTypes.string.isRequired,
        tokenImage: PropTypes.string.isRequired,
        collectionName: PropTypes.string.isRequired,
        isRevealed: PropTypes.bool.isRequired,
        onMarketplace: PropTypes.bool.isRequired,
        onSale: PropTypes.bool.isRequired,
        onAuction: PropTypes.bool.isRequired,
        nftPrice: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        timeout: PropTypes.string,
        nftData: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            image: PropTypes.string,
            authors: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                })
            ),
            collection: PropTypes.shape({
                name: PropTypes.string,
                family: PropTypes.string,
            }),
        }).isRequired,
    }).isRequired,
    disableShareDropdown: PropTypes.bool,
};

export default Product;
