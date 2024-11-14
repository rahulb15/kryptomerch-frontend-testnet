import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Button } from "semantic-ui-react";
import ReactCardFlip from "react-card-flip";
import NftImageContainer from "./NftImageContainer";
import NftGraphSection from "./NftGraphSection";
import NftDetailsSection from "./NftDetailsSection";
import NftAttributes from "./NftAttributes";
import NftProperties from "./NftProperties";
import NftBuyOptions from "./NftBuyOptions";
import NftDutchBuyOptions from "./NftDutchBuyOptions";
import NftBidOptions from "./NftBidOptions";
import NftQrCode from "./NftQrCode";
import FullScreenImage from "./FullScreenImage";

const NftContent = ({
    data,
    userData,
    sales,
    showSaleOptions,
    showBuyOptions,
    showBidOptions,
    showDutchBuyOptions,
    setShowBuyOptions,
    setShowBidOptions,
    setShowDutchBuyOptions
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [qrSize, setQrSize] = useState({ width: 500, height: 500 });
    const [showFullImage, setShowFullImage] = useState(false);

    useEffect(() => {
        const updateQRSize = () => {
            const imageContainer = document.getElementById(
                "nft-image-container"
            );
            if (imageContainer) {
                setQrSize({
                    width: imageContainer.offsetWidth,
                    height: imageContainer.offsetHeight,
                });
            }
        };

        updateQRSize();
        window.addEventListener("resize", updateQRSize);

        return () => window.removeEventListener("resize", updateQRSize);
    }, []);

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

    const handleDutchAuction = () => {
        setShowDutchBuyOptions(true);
    };

    return (
        <Box className="nft-modal-content">
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
                <NftGraphSection />
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
                    {data?.onMarketplace && data?.onSale && (
                        <Button className="nft-buy-button" onClick={handleBuy}>
                            Buy Now
                        </Button>
                    )}
                    {data?.onMarketplace && data?.onAuction && (
                        <Button className="nft-bid-button" onClick={handleBid}>
                            Bid
                        </Button>
                    )}
                    {data?.onMarketplace && data?.onDutchAuction && (
                        <Button className="nft-bid-button" onClick={handleDutchAuction}>
                            Buy Now
                        </Button>
                    )}

                </Box>

                {!showSaleOptions && (
                    <>
                        <NftAttributes data={data} />
                        <NftProperties data={data} />
                    </>
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

                {showDutchBuyOptions && (
                    <NftDutchBuyOptions
                        data={data}
                        userData={userData}
                        sales={sales}
                    />
                )}

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
