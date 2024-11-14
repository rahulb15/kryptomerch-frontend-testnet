// DutchAuctionPriceNet.js
import React, { useState } from "react";
import { Box, Paper, Typography, IconButton, Popover } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRoyaltyRate } from "src/hooks/SWR_Hooks";
import { compute_marketplace_fees, pretty_price } from "@utils/marmalade_common";
import FeeDetailsModal from "./FeeDetailsModal";

const DutchAuctionPriceNet = ({ sale_data, token_id, fee }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const royalty_rate = useRoyaltyRate(token_id);

    if (!sale_data) return null;

    const gross = [sale_data.start_price, sale_data.end_price];
    const mplace_fee = gross.map(price => compute_marketplace_fees(price, fee));
    const gross_after_mplace = gross.map((price, i) => price.sub(mplace_fee[i]));
    const royalty = gross_after_mplace.map(price => royalty_rate.mul(price));
    const total = gross_after_mplace.map((price, i) => price.sub(royalty[i]));

    const handleInfoClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const details = (
        <FeeDetailsModal
            headers={["Starting Price", "Ending Price"]}
            gross={gross.map(price => pretty_price(price, "KDA"))}
            fees={[
                ["Marketplace"].concat(mplace_fee.map(fee => "- " + pretty_price(fee, "KDA"))),
                ["Royalty"].concat(royalty.map(fee => "- " + pretty_price(fee, "KDA"))),
            ]}
            total={total.map(price => pretty_price(price, "KDA"))}
        />
    );

    return (
        <Box sx={{ mt: 2, position: "relative" }}>
            <Paper elevation={1} sx={{ p: 2, display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Typography variant="body1">
                    You will receive between {pretty_price(total[1], "KDA")} and {pretty_price(total[0], "KDA")}
                </Typography>
                <IconButton size="small" onClick={handleInfoClick} sx={{ ml: 1 }}>
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

export default DutchAuctionPriceNet;