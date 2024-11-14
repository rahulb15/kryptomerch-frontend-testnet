// import { useState } from "react";
// import dynamic from "next/dynamic";
// import PropTypes from "prop-types";
// import Image from "next/image";
// import clsx from "clsx";
// import Anchor from "@ui/anchor";
// import ClientAvatar from "@ui/client-avatar";
// import ProductBid from "@components/product-bid";
// import Button from "@ui/button";
// import { ImageType } from "@utils/types";
// import PlaceBidModal from "@components/modals/placebid-modal";
// import NftDetailModal from "./NftMarketPlaceDetailModal";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { IconButton } from "@mui/material";

// const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
//     ssr: false,
// });

// const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
//     ssr: false,
// });

// const Nft = ({
//     overlay,
//     title,
//     slug,
//     latestBid,
//     price,
//     likeCount,
//     auction_date,
//     image,
//     bitCount,
//     authors,
//     placeBid,
//     data,
//     disableShareDropdown,
//     sellable,
// }) => {
//     const [showBidModal, setShowBidModal] = useState(false);
//     const [showDetailModal, setShowDetailModal] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);

//     const handleOpenModal = () => {
//         setShowDetailModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowDetailModal(false);
//     };

//     const handleBidModal = () => {
//         setShowBidModal((prev) => !prev);
//     };

//     const isRevealed = data?.isRevealed;
//     const isOnMarketplace = data?.onMarketplace;
//     const isOnSale = data?.onSale;
//     const isOnAuction = data?.onAuction;

//     return (
//         <>
//             <div
//                 className={clsx(
//                     "product-style-one",
//                     !overlay && "no-overlay",
//                     placeBid && "with-placeBid"
//                 )}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 <div className="card-thumbnail" onClick={handleOpenModal}>
//                     {isRevealed ? (
//                         <Image
//                             src={image}
//                             alt={data?.title}
//                             width={533}
//                             height={533}
//                         />
//                     ) : (
//                         <Image
//                             src="/assets-images/nft/nft2.jpeg"
//                             alt="NFT_portfolio"
//                             width={533}
//                             height={533}
//                         />
//                     )}

//                     {isOnAuction && isRevealed && (
//                         <CountdownTimer date={auction_date} />
//                     )}

//                     {isRevealed && isOnMarketplace && isHovered && (
//                         <div className="sell-button-overlay">
//                             {isOnSale && (
//                                 <Button
//                                     onClick={() => console.log("Buy clicked")}
//                                     size="small"
//                                 >
//                                     Buy
//                                 </Button>
//                             )}
//                             {isOnAuction && (
//                                 <Button onClick={handleBidModal} size="small">
//                                     Place Bid
//                                 </Button>
//                             )}
//                         </div>
//                     )}
//                 </div>
//                 <div className="product-share-wrapper">
//                     <div className="profile-share">
//                         {!isRevealed ? (
//                             <span className="latest-bid">Not Revealed</span>
//                         ) : (
//                             <>
//                                 {isOnMarketplace && (
//                                     <IconButton
//                                         onClick={() => console.log("Add to cart", data)}
//                                         style={{
//                                             color: "white",
//                                             backgroundColor: "#a5c600",
//                                         }}
//                                     >
//                                         <ShoppingCartIcon />
//                                     </IconButton>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                     {!disableShareDropdown && <ShareDropdown />}
//                 </div>
//                 <Anchor path={`/product/${slug}`}>
//                     <span className="product-name">{title}</span>
//                 </Anchor>
//                 {data?.tokenId && (
//                     <span className="token-id">
//                         {data.tokenId.slice(0, 10)}...{data.tokenId.slice(-10)}
//                     </span>
//                 )}
//                 <span className="latest-bid">
//                     {isOnAuction
//                         ? `Highest bid ${latestBid}`
//                         : isOnSale
//                         ? `Price: ${price.amount} ${price.currency}`
//                         : "Not for sale"}
//                 </span>
//             </div>
//             {showDetailModal && (
//                 <NftDetailModal
//                     open={showDetailModal}
//                     onClose={handleCloseModal}
//                     data={data}
//                 />
//             )}
//             {showBidModal && (
//                 <PlaceBidModal
//                     show={showBidModal}
//                     handleModal={handleBidModal}
//                     data={data}
//                 />
//             )}
//         </>
//     );
// };

// Nft.propTypes = {
//     overlay: PropTypes.bool,
//     title: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     latestBid: PropTypes.string,
//     price: PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         currency: PropTypes.string.isRequired,
//     }),
//     likeCount: PropTypes.number,
//     auction_date: PropTypes.string,
//     image: ImageType.isRequired,
//     authors: PropTypes.arrayOf(
//         PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             slug: PropTypes.string.isRequired,
//             image: ImageType.isRequired,
//         })
//     ),
//     bitCount: PropTypes.number,
//     placeBid: PropTypes.bool,
//     disableShareDropdown: PropTypes.bool,
//     data: PropTypes.shape({
//         isRevealed: PropTypes.bool,
//         onMarketplace: PropTypes.bool,
//         onSale: PropTypes.bool,
//         onAuction: PropTypes.bool,
//         tokenId: PropTypes.string,
//     }).isRequired,
// };

// Nft.defaultProps = {
//     overlay: false,
// };

// export default Nft;

import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import NftDetailModal from "./NftMarketPlaceDetailModal";
import { addToCart, selectIsInCart } from "src/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const Nft = ({ data, disableShareDropdown }) => {
    console.log(data, "data");
    const [showBidModal, setShowBidModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const isItemInCart = useSelector((state) => selectIsInCart(state, data._id));


    const handleOpenModal = () => {
        setShowDetailModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailModal(false);
    };

    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };

    const copyTokenId = () => {
        navigator.clipboard.writeText(data.tokenId);
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
        dispatch(addToCart(data));
    };

    const isRevealed = data.isRevealed;
    const isOnMarketplace = data.onMarketplace;
    const isOnSale = data.onSale;
    const isOnAuction = data.onAuction;

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
        backgroundColor: "#f0b90b",
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
                    {isRevealed ? (
                        <Image
                            src={data.tokenImage}
                            alt={data.nftData.name}
                            width={533}
                            height={533}
                        />
                    ) : (
                        <Image
                            src="/assets-images/nft/nft2.jpeg"
                            alt="NFT_portfolio"
                            width={533}
                            height={533}
                        />
                    )}

                    {isOnAuction && isRevealed && (
                        <CountdownTimer date={data.timeout} />
                    )}

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
                                        console.log("Buy clicked", data)
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
                                    onClick={handleBidModal}
                                    style={bidButtonStyle}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: "#d9a400",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                    }}
                                >
                                    Place Bid
                                </motion.button>
                            )}
                        </motion.div>
                    )}
                </div>
                <div className="product-share-wrapper">
                    <div className="profile-share">
                        {!isRevealed ? (
                            <span className="latest-bid">Not Revealed</span>
                        ) : (
                            <>
                                  {isOnMarketplace && (
                                <IconButton
                                    onClick={handleAddToCart}
                                    style={{
                                        color: "white",
                                        backgroundColor: isItemInCart ? "#cccccc" : "#a5c600",
                                    }}
                                    disabled={isItemInCart}
                                >
                                    <ShoppingCartIcon />
                                </IconButton>
                            )}
                            </>
                        )}
                    </div>
                    {!disableShareDropdown && <ShareDropdown />}
                </div>
                <Anchor path={`/product/${data.tokenId}`}>
                    <span
                        className="product-name"
                        style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "5px",
                        }}
                    >
                        {data.nftData.name}
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
                        {`${data.tokenId.slice(0, 6)}...${data.tokenId.slice(
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
                                Highest bid:
                            </span>{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {data.nftPrice}
                            </span>{" "}
                            {data.currency}
                        </>
                    ) : isOnSale ? (
                        <>
                            <span style={{ fontWeight: "bold" }}>Price:</span>{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {data.nftPrice}
                            </span>{" "}
                            {data.currency}
                        </>
                    ) : (
                        "Not for sale"
                    )}
                </span>
                {/* <div className="collection-info">
                    <span>Collection: {data.collectionName}</span>
                </div> */}
            </div>
            {showDetailModal && (
                <NftDetailModal
                    open={showDetailModal}
                    onClose={handleCloseModal}
                    data={data}
                />
            )}
            {showBidModal && (
                <PlaceBidModal
                    show={showBidModal}
                    handleModal={handleBidModal}
                    data={data}
                />
            )}
        </>
    );
};

Nft.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        tokenId: PropTypes.string.isRequired,
        amount: PropTypes.string,
        bidInfo: PropTypes.array,
        collection: PropTypes.object,
        collectionName: PropTypes.string,
        creator: PropTypes.string,
        currency: PropTypes.string,
        enabled: PropTypes.bool,
        escrowAccount: PropTypes.string,
        isPlatform: PropTypes.bool,
        isRevealed: PropTypes.bool,
        lastUpdated: PropTypes.string,
        nftData: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            image: PropTypes.string,
            authors: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                })
            ),
            collection: PropTypes.shape({
                name: PropTypes.string,
                family: PropTypes.string,
            }),
        }),
        nftPrice: PropTypes.number,
        onAuction: PropTypes.bool,
        onMarketplace: PropTypes.bool,
        onSale: PropTypes.bool,
        policies: PropTypes.array,
        price: PropTypes.string,
        properties: PropTypes.array,
        recipient: PropTypes.string,
        saleId: PropTypes.string,
        saleType: PropTypes.string,
        seller: PropTypes.string,
        sellingType: PropTypes.string,
        supply: PropTypes.object,
        timeout: PropTypes.string,
        tokenImage: PropTypes.string,
        uri: PropTypes.string,
    }).isRequired,
    disableShareDropdown: PropTypes.bool,
};

export default Nft;
