// // FixedPriceNet.js
// import React, { useState } from "react";
// import { Box, Paper, Typography, IconButton, Popover } from "@mui/material";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { useRoyaltyRate } from "src/hooks/SWR_Hooks";
// import { compute_marketplace_fees, pretty_price } from "@utils/marmalade_common";
// import FeeDetailsModal from "./FeeDetailsModal";

// const FixedPriceNet = ({ sale_data, token_id, fee }) => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const royalty_rate = useRoyaltyRate(token_id);

//     if (!sale_data || !sale_data.price) return null;

//     const gross = sale_data.price;
//     const mplace_fee = compute_marketplace_fees(gross, fee);
//     const gross_after_mplace = gross.sub(mplace_fee);
//     const royalty = royalty_rate.mul(gross);
//     const total = gross_after_mplace.sub(royalty);

//     const handleInfoClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const open = Boolean(anchorEl);

//     const details = (
//         <FeeDetailsModal
//             headers={["Amount"]}
//             gross={[pretty_price(gross, "KDA")]}
//             fees={[
//                 ["Marketplace", "- " + pretty_price(mplace_fee, "KDA")],
//                 ["Royalty", "- " + pretty_price(royalty, "KDA")],
//             ]}
//             total={[pretty_price(total, "KDA")]}
//         />
//     );

//     return (
//         <Box sx={{ mt: 2, position: "relative" }}>
//             <Paper elevation={1} sx={{ p: 2, display: "flex", flexDirection: "row", alignItems: "center" }}>
//                 <Typography variant="body1">
//                     You will receive {pretty_price(total, "KDA")}
//                 </Typography>
//                 <IconButton size="small" onClick={handleInfoClick} sx={{ ml: 1 }}>
//                     <InfoOutlinedIcon fontSize="small" />
//                 </IconButton>
//             </Paper>
//             <Popover
//                 open={open}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 anchorOrigin={{
//                     vertical: "bottom",
//                     horizontal: "right",
//                 }}
//                 transformOrigin={{
//                     vertical: "top",
//                     horizontal: "right",
//                 }}
//             >
//                 <Box sx={{ p: 2 }}>{details}</Box>
//             </Popover>
//         </Box>
//     );
// };

// export default FixedPriceNet;

import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useRoyaltyRate } from "src/hooks/SWR_Hooks";
import { compute_marketplace_fees, pretty_price } from "@utils/marmalade_common";
import FeeDetailsModal from "./FeeDetailsModal";

const FixedPriceNet = ({ sale_data, token_id, fee }) => {
    const [showDetails, setShowDetails] = useState(false);
    const royalty_rate = useRoyaltyRate(token_id);

    if (!sale_data || !sale_data.price) return null;

    const gross = sale_data.price;
    const mplace_fee = compute_marketplace_fees(gross, fee);
    const gross_after_mplace = gross.sub(mplace_fee);
    const royalty = royalty_rate.mul(gross);
    const total = gross_after_mplace.sub(royalty);

    const handleInfoClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="fixed-price-net">
            <div className="fixed-price-net-content">
                <div className="fixed-price-net-text">
                    <span className="label">You will receive</span>
                    <span className="value">{pretty_price(total, "KDA")}</span>
                </div>
                <button onClick={handleInfoClick} className="fixed-price-net-info-button">
                    <InfoOutlinedIcon />
                </button>
            </div>
            {showDetails && (
                <FeeDetailsModal
                    headers={["Amount"]}
                    gross={[pretty_price(gross, "KDA")]}
                    fees={[
                        ["Marketplace", "- " + pretty_price(mplace_fee, "KDA")],
                        ["Royalty", "- " + pretty_price(royalty, "KDA")],
                    ]}
                    total={[pretty_price(total, "KDA")]}
                />
            )}
        </div>
    );
};

export default FixedPriceNet;