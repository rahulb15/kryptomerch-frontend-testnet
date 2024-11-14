// AuctionPriceNet.js
import React, { useState } from "react";
import { Box, Paper, Typography, IconButton, Popover } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRoyaltyRate } from "src/hooks/SWR_Hooks";
import { compute_marketplace_fees, pretty_price } from "@utils/marmalade_common";
import FeeDetailsModal from "./FeeDetailsModal";

const AuctionPriceNet = ({ sale_data, token_id, fee }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const royalty_rate = useRoyaltyRate(token_id);

    if (!sale_data) return null;

    const start_price = sale_data.start_price;
    const mplace_fee = compute_marketplace_fees(start_price, fee);
    const gross_after_mplace = start_price.sub(mplace_fee);
    const royalty = royalty_rate.mul(start_price);
    const total = gross_after_mplace.sub(royalty);

    const handleInfoClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const details = (
        <FeeDetailsModal
            headers={["Starting Price", "Final Price"]}
            gross={[pretty_price(start_price, "KDA"), "X"]}
            fees={[
                ["Marketplace", "- " + pretty_price(mplace_fee, "KDA"), `- ${fee ? fee["fee-rate"] * 100 : 0}% of X`],
                ["Royalty", "- " + pretty_price(royalty, "KDA"), `- ${royalty_rate.mul(100).toFixed(2)}% of X`],
            ]}
            total={[pretty_price(total, "KDA"), `X - fees`]}
        />
    );

    return (
        <Box sx={{ mt: 2, position: "relative" }}>
            <Paper elevation={1} sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="body1">
                    You will receive at least {pretty_price(total, "KDA")}
                </Typography>
                <IconButton size="small" onClick={handleInfoClick} sx={{ ml: 1,width: "fit-content" }}>
                    <InfoOutlinedIcon fontSize="small" />
                </IconButton>
            </Paper>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box sx={{ p: 2 }}>{details}</Box>
            </Popover>
        </Box>
    );
};

export default AuctionPriceNet;