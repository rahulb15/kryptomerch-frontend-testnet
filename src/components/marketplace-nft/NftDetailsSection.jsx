import React from "react";
import { Box, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import moment from "moment";

const NftDetailsSection = ({ data }) => {
    console.log(data);
    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        Swal.fire({
            icon: "success",
            title: `${label} copied to clipboard`,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: "my-swal",
            },
        });
    };

    const CopyableText = ({ label, text }) => (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
            }}
        >
            {label}: &nbsp;
            <strong className="token-id" style={{ marginRight: "5px" }}>
                {`${text?.slice(0, 8)}...${text?.slice(-6)}`}
            </strong>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ cursor: "pointer" }}
            >
                <ContentCopyIcon
                    onClick={() => copyToClipboard(text, label)}
                    style={{ fontSize: "16px", color: "#888" }}
                />
            </motion.div>
        </div>
    );

    return (
        <Box className="nft-basic-info">
            <Typography variant="h5" paragraph className="nft-creator-info">
                <CopyableText label="Creator" text={data?.creator} />
            </Typography>
            {/* <Typography variant="h5" paragraph>
                Price:{" "}
                <strong>
                    {data.nftPrice > 0 ? `${data.nftPrice}` : "Not for sale"}
                </strong>
            </Typography> */}
            {data?.onSale && (
                <Typography variant="h5" paragraph>
                    Price:{" "}
                    <strong>
                        {data.nftPrice > 0
                            ? `${data.nftPrice}`
                            : "Not for sale"}
                    </strong>
                </Typography>
            )}
            {data?.onAuction && (
                <>
                    <Typography variant="h5" paragraph>
                        Highest Bid:{" "}
                        <strong>
                            {data.currentPrice > 0
                                ? `${data.currentPrice}`
                                : "No bids yet"}
                        </strong>
                    </Typography>
                    <Typography variant="h5" paragraph>
                        Auction Ends: <strong>{moment(data.timeout).fromNow()}</strong>
                    </Typography>

                    <Typography variant="h5" paragraph>
                        <CopyableText label="Last Bid Account ID" text={data?.currentBuyer || "N/A"} />
                    </Typography>

                </>
            )}

            {data?.onDutchAuction && (
                <>
                    <Typography variant="h5" paragraph>
                        Current Price:{" "}
                        <strong>
                            {data.nftPrice > 0
                                ? `${data.nftPrice} KDA`
                                : "Not for sale"}
                        </strong>
                    </Typography>
                    <Typography variant="h5" paragraph>
                        Dutch Auction Ends: <strong>{moment(data.timeout).fromNow()}</strong>
                    </Typography>
                </>
            )}

            {/* //sale type */}
            <Typography variant="h5" paragraph>
                Sale Type: <strong>{data?.saleType === "f" ? "Fixed" : data?.saleType === "a" ? "Auction" : data?.saleType === "d" ? "Dutch Auction" : "Not for sale"}</strong>
            </Typography>



            <Typography variant="body1" paragraph sx={{ fontSize: 16 }}>
                <CopyableText label="Owner" text={data?.owner} />
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: 16 }}>
                <CopyableText label="Sale ID" text={data?.saleId || "N/A"} />
            </Typography>
        </Box>
    );
};

export default NftDetailsSection;
