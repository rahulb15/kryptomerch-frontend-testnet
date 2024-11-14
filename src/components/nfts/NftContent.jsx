// export default NftContent;

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Button } from "semantic-ui-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactCardFlip from "react-card-flip";
import NftImageContainer from "./NftImageContainer";
import NftGraphSection from "./NftGraphSection";
import NftDetailsSection from "./NftDetailsSection";
import NftAttributes from "./NftAttributes";
import NftProperties from "./NftProperties";
import NftBuyOptions from "./NftBuyOptions";
import NftBidOptions from "./NftBidOptions";
import NftQrCode from "./NftQrCode";
import FullScreenImage from "./FullScreenImage";
import NftSaleOptions from "./NftSaleOptions";
import { has_fixed, has_auction, has_dutch_auction } from "./nftUtils";

const NftContent = ({
    data,
    userData,
    sales,
    showSaleOptions,
    showBuyOptions,
    showBidOptions,
    setShowBuyOptions,
    setShowBidOptions,
    policies,
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [qrSize, setQrSize] = useState({ width: 500, height: 500 });
    const [showFullImage, setShowFullImage] = useState(false);
    const [showSellOptions, setShowSellOptions] = useState(false);
    const [selectedSellType, setSelectedSellType] = useState(null);
    console.log("policy", policies);

    const handleImageClick = () => {
        setShowFullImage(true);
    };

    const handleCloseFullImage = () => {
        setShowFullImage(false);
    };

    const handleBuy = () => {
        setShowBuyOptions(true);
    };

    const handleBid = () => {
        setShowBidOptions(true);
    };

    const handleSell = () => {
        setShowSellOptions(true);
    };

    const handleSellTypeSelect = (type) => {
        setSelectedSellType(type);
    };

    const handleCancelSell = () => {
        setShowSellOptions(false);
        setSelectedSellType(null);
    };

    return (
        <Box className="nft-modal-content custom-scrollbar">
            <Box className="nft-image-and-graph-section">
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    <NftImageContainer
                        data={data}
                        setIsFlipped={setIsFlipped}
                        isFlipped={isFlipped}
                        handleImageClick={handleImageClick}
                    />
                    <NftQrCode
                        data={data}
                        qrSize={qrSize}
                        setIsFlipped={setIsFlipped}
                        isFlipped={isFlipped}
                    />
                </ReactCardFlip>
                {/* <NftGraphSection /> */}
                {data?.collectionName === "Priority Pass" ? (
                    <Typography
                        variant="h5"
                        style={{
                            marginTop: "20px",
                            textAlign: "justify",
                            fontSize: "16px",
                            // backgroundColor: "#f0f0f0",
                            borderRadius: 2,
                            padding: 2,
                            textAlign: "center",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            },
                            cursor: "pointer",

                        }}
                    >
                        {`Each Priority Pass provides the holder with exclusive benefits, including the ability to claim a free NFT from every new collection. Additionally, the pass offers other perks such as early access to limited-edition drops, discounted rates on future collections.
                            Pass holders can also enjoy priority customer support, access to private communities, and potential airdrops of exclusive NFTs or tokens. By holding the Priority Pass, users can unlock a wide range of valuable benefits and experiences within the ecosystem.`}
                    </Typography>
                ) : (
                    <NftGraphSection data={data} />
                )}
            </Box>

            <Box className="nft-details-section">
                <NftDetailsSection data={data} />
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                    }}
                >
                    {data?.onMarketplace && (
                        <Button className="nft-buy-button" onClick={handleBuy}>
                            Buy Now
                        </Button>
                    )}
                    {data?.onAuction && (
                        <Button className="nft-bid-button" onClick={handleBid}>
                            Place Bid
                        </Button>
                    )}
                    {console.log("data", data)}
                    {!data?.onMarketplace &&
                        !data?.onAuction &&
                        !data?.onSale &&
                        data?.collectionName !== "Priority Pass" &&
                        !showSellOptions && (
                            <Button
                                className="nft-bid-button"
                                onClick={handleSell}
                            >
                                Sell
                            </Button>
                        )}
                </Box>

                <AnimatePresence>
                    {!showSaleOptions && !showSellOptions && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <NftAttributes data={data} />
                            <NftProperties data={data} />
                        </motion.div>
                    )}

                    {showBuyOptions && (
                        <NftBuyOptions
                            data={data}
                            userData={userData}
                            sales={sales}
                        />
                    )}

                    {showBidOptions && (
                        <NftBidOptions
                            data={data}
                            userData={userData}
                            sales={sales}
                        />
                    )}

                    {/* {showSellOptions && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Typography variant="h5" gutterBottom>
                                Choose Sale Type
                            </Typography>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fill, minmax(150px, 1fr))",
                                    gap: 2,
                                    mt: 2,
                                }}
                            >
                                {has_fixed(policies) && (
                                    <Box
                                        sx={{
                                            backgroundColor: "#f0f0f0",
                                            borderRadius: 2,
                                            padding: 2,
                                            textAlign: "center",
                                            transition:
                                                "transform 0.2s, box-shadow 0.2s",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow:
                                                    "0 4px 10px rgba(0, 0, 0, 0.1)",
                                            },
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            handleSellTypeSelect("FIXED-SALE")
                                        }
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {"Fixed Price"}
                                        </Typography>
                                    </Box>
                                )}

                                {has_auction(policies) && (
                                    <Box
                                        sx={{
                                            backgroundColor: "#f0f0f0",
                                            borderRadius: 2,
                                            padding: 2,
                                            textAlign: "center",
                                            transition:
                                                "transform 0.2s, box-shadow 0.2s",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow:
                                                    "0 4px 10px rgba(0, 0, 0, 0.1)",
                                            },
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            handleSellTypeSelect("AUCTION-SALE")
                                        }
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {"Auction"}
                                        </Typography>
                                    </Box>
                                )}

                                {has_dutch_auction(policies) && (
                                    <Box
                                        sx={{
                                            backgroundColor: "#f0f0f0",
                                            borderRadius: 2,
                                            padding: 2,
                                            textAlign: "center",
                                            transition:
                                                "transform 0.2s, box-shadow 0.2s",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow:
                                                    "0 4px 10px rgba(0, 0, 0, 0.1)",
                                            },
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            handleSellTypeSelect(
                                                "DUTCH-AUCTION-SALE"
                                            )
                                        }
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {"Dutch Auction"}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                            <Button
                                variant="outlined"
                                onClick={handleCancelSell}
                                sx={{ mt: 2 }}
                            >
                                Cancel
                            </Button>
                        </motion.div>
                    )} */}

                    {showSellOptions && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="nft-sell-options"
                        >
                            <Typography variant="h5" gutterBottom>
                                Choose Sale Type
                            </Typography>
                            <Box className="sell-option-grid">
                                {has_fixed(policies) && (
                                    <Box
                                        className="sell-option-box"
                                        onClick={() =>
                                            handleSellTypeSelect("FIXED-SALE")
                                        }
                                    >
                                        <Typography
                                            variant="body1"
                                            className="sell-option-title"
                                        >
                                            Fixed Price
                                        </Typography>
                                    </Box>
                                )}

                                {has_auction(policies) && (
                                    <Box
                                        className="sell-option-box"
                                        onClick={() =>
                                            handleSellTypeSelect("AUCTION-SALE")
                                        }
                                    >
                                        <Typography
                                            variant="body1"
                                            className="sell-option-title"
                                        >
                                            Auction
                                        </Typography>
                                    </Box>
                                )}

                                {has_dutch_auction(policies) && (
                                    <Box
                                        className="sell-option-box"
                                        onClick={() =>
                                            handleSellTypeSelect(
                                                "DUTCH-AUCTION-SALE"
                                            )
                                        }
                                    >
                                        <Typography
                                            variant="body1"
                                            className="sell-option-title"
                                        >
                                            Dutch Auction
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                            {!selectedSellType && (
                                <Button
                                    variant="outlined"
                                    onClick={handleCancelSell}
                                    className="sell-cancel-button"
                                    style={{
                                        marginTop: "20px",
                                        backgroundColor: "#fae944",
                                        color: "#000",
                                        border: "1px solid #fae944",
                                        width: "100%",
                                        height: 40,
                                        borderRadius: 2,
                                        padding: 2,
                                        textAlign: "center",
                                        transition:
                                            "transform 0.2s, box-shadow 0.2s",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            boxShadow:
                                                "0 4px 10px rgba(0, 0, 0, 0.1)",
                                        },
                                        cursor: "pointer",
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}
                        </motion.div>
                    )}

                    {selectedSellType && (
                        <NftSaleOptions
                            type={selectedSellType}
                            data={data}
                            userData={userData}
                            onCancel={handleCancelSell}
                        />
                    )}
                </AnimatePresence>
            </Box>

            {showFullImage && (
                <FullScreenImage
                    src={data.tokenImage}
                    alt={data.collectionName}
                    onClose={handleCloseFullImage}
                />
            )}
        </Box>
    );
};

export default NftContent;
