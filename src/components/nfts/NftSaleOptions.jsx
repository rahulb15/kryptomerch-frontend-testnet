// // NftSaleOptions.js
// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Box,
//     Typography,
//     FormControl,
//     Select,
//     MenuItem,
//     InputLabel,
//     Button,
// } from "@mui/material";
// import { Grid } from "semantic-ui-react";
// import { TransactionManager } from "@components/Transactions";
// import { MAKE_TRX, useFee } from "./nftUtils";
// import {
//     clear_sales,
//     useTokenBalance,
//     useRoyaltyRate,
// } from "src/hooks/SWR_Hooks";
// import FixedSaleForm from "./FixedSaleForm";
// import DutchAuctionSaleForm from "./DutchAuctionSaleForm";
// import AuctionSaleForm from "./AuctionSaleForm";
// import FixedPriceNet from "./FixedPriceNet";
// import DutchAuctionPriceNet from "./DutchAuctionPriceNet";
// import AuctionPriceNet from "./AuctionPriceNet";
// import DateWarningMessage from "./DateWarningMessage";

// const NftSaleOptions = ({ type, data, userData, onCancel }) => {
//     const [saleType, setSaleType] = useState(type || "FIXED-SALE");
//     const [saleData, setSaleData] = useState(null);
//     const [trx, setTrx] = useState(null);
//     const { balance } = useTokenBalance(data.tokenId, userData?.account);
//     const fee = useFee(data.tokenId);
//     const royaltyRate = useRoyaltyRate(data.tokenId);

//     const handleSaleDataChange = useCallback((newSaleData) => {
//         setSaleData(newSaleData);
//     }, []);

//     useEffect(() => {
//         if (userData && saleData && saleType && balance && balance.gt(0)) {
//             try {
//                 const newTrx = MAKE_TRX[saleType](
//                     data.tokenId,
//                     balance,
//                     userData.account,
//                     userData.guard,
//                     fee,
//                     saleData
//                 );
//                 setTrx(newTrx);
//             } catch (error) {
//                 console.error("Error creating transaction:", error);
//             }
//         }
//     }, [userData, saleData, saleType, data.tokenId, fee, balance]);

//     const handleSaleTypeChange = (event) => {
//         setSaleType(event.target.value);
//         setSaleData(null);
//     };

//     const renderSaleForm = () => {
//         switch (saleType) {
//             case "FIXED-SALE":
//                 return <FixedSaleForm onChange={handleSaleDataChange} />;
//             case "DUTCH-AUCTION-SALE":
//                 return <DutchAuctionSaleForm onChange={handleSaleDataChange} />;
//             case "AUCTION-SALE":
//                 return <AuctionSaleForm onChange={handleSaleDataChange} />;
//             default:
//                 return null;
//         }
//     };

//     const renderPriceNet = () => {
//         if (!saleData) return null;

//         switch (saleType) {
//             case "FIXED-SALE":
//                 return (
//                     <FixedPriceNet
//                         sale_data={saleData}
//                         token_id={data.tokenId}
//                         fee={fee}
//                     />
//                 );
//             case "DUTCH-AUCTION-SALE":
//                 return (
//                     <DutchAuctionPriceNet
//                         sale_data={saleData}
//                         token_id={data.tokenId}
//                         fee={fee}
//                     />
//                 );
//             case "AUCTION-SALE":
//                 return (
//                     <AuctionPriceNet
//                         sale_data={saleData}
//                         token_id={data.tokenId}
//                         fee={fee}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Box sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
//             <Typography variant="h5" gutterBottom>
//                 Create NFT Sale
//             </Typography>

//             <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Sale Type</InputLabel>
//                 <Select
//                     value={saleType}
//                     onChange={handleSaleTypeChange}
//                     label="Sale Type"
//                 >
//                     <MenuItem value="FIXED-SALE">Fixed Price Sale</MenuItem>
//                     <MenuItem value="DUTCH-AUCTION-SALE">
//                         Dutch Auction Sale
//                     </MenuItem>
//                     <MenuItem value="AUCTION-SALE">Auction Sale</MenuItem>
//                 </Select>
//             </FormControl>

//             {renderSaleForm()}
//             {renderPriceNet()}
//             <DateWarningMessage date={saleData?.tout} />

//             <Box sx={{ mt: 2 }}>
//                 <TransactionManager
//                     trx={trx}
//                     wallet={userData?.wallet}
//                     type="sell"
//                     onConfirm={clear_sales}
//                     data={data}
//                     onClose={onCancel}
//                 />
//                 <Button
//                     variant="outlined"
//                     onClick={onCancel}
//                     sx={{ mt: 2, mr: 2 }}
//                 >
//                     Cancel
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// export default NftSaleOptions;

// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Box,
//     Typography,
//     FormControl,
//     Select,
//     MenuItem,
//     InputLabel,
//     Button,
// } from "@mui/material";
// import { Grid } from "semantic-ui-react";
// import { TransactionManager } from "@components/Transactions";
// import { MAKE_TRX, useFee } from "./nftUtils";
// import {
//     clear_sales,
//     useTokenBalance,
//     useRoyaltyRate,
// } from "src/hooks/SWR_Hooks";
// import FixedSaleForm from "./FixedSaleForm";
// import DutchAuctionSaleForm from "./DutchAuctionSaleForm";
// import AuctionSaleForm from "./AuctionSaleForm";
// import FixedPriceNet from "./FixedPriceNet";
// import DutchAuctionPriceNet from "./DutchAuctionPriceNet";
// import AuctionPriceNet from "./AuctionPriceNet";
// import DateWarningMessage from "./DateWarningMessage";

// const NftSaleOptions = ({ type, data, userData, onCancel }) => {
//     console.log("NftSaleOptions", type);
//     const [saleType, setSaleType] = useState(type || "FIXED-SALE");
//     const [saleData, setSaleData] = useState(null);
//     const [trx, setTrx] = useState(null);
//     const { balance } = useTokenBalance(data.tokenId, userData?.account);
//     const fee = useFee(data.tokenId);
//     const royaltyRate = useRoyaltyRate(data.tokenId);

//     const handleSaleDataChange = useCallback((newSaleData) => {
//         setSaleData(newSaleData);
//     }, []);

//     useEffect(() => {
//         if(type) {
//             setSaleType(type);
//         }
//     }, [type]);

//     useEffect(() => {
//         if (userData && saleData && saleType && balance && balance.gt(0)) {
//             try {
//                 const newTrx = MAKE_TRX[saleType](
//                     data.tokenId,
//                     balance,
//                     userData.account,
//                     userData.guard,
//                     fee,
//                     saleData
//                 );
//                 setTrx(newTrx);
//             } catch (error) {
//                 console.error("Error creating transaction:", error);
//             }
//         }
//     }, [userData, saleData, saleType, data.tokenId, fee, balance]);

//     const renderSaleForm = () => {
//         switch (saleType) {
//             case "FIXED-SALE":
//                 return <FixedSaleForm onChange={handleSaleDataChange} />;
//             case "DUTCH-AUCTION-SALE":
//                 return <DutchAuctionSaleForm onChange={handleSaleDataChange} />;
//             case "AUCTION-SALE":
//                 return <AuctionSaleForm onChange={handleSaleDataChange} />;
//             default:
//                 return null;
//         }
//     };

//     const renderPriceNet = () => {
//         if (!saleData) return null;

//         switch (saleType) {
//             case "FIXED-SALE":
//                 return (
//                     <FixedPriceNet
//                         sale_data={saleData}
//                         token_id={data.tokenId}
//                         fee={fee}
//                     />
//                 );
//             case "DUTCH-AUCTION-SALE":
//                 return (
//                     <DutchAuctionPriceNet
//                         sale_data={saleData}
//                         token_id={data.tokenId}
//                         fee={fee}
//                     />
//                 );
//             case "AUCTION-SALE":
//                 return (
//                     <AuctionPriceNet
//                         sale_data={saleData}
//                         token_id={data.tokenId}
//                         fee={fee}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Box sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
//             <Typography variant="h5" gutterBottom>
//                 Create NFT Sale
//             </Typography>
//             {renderSaleForm()}
//             {renderPriceNet()}
//             <DateWarningMessage date={saleData?.tout} />

//             <Box sx={{ mt: 2 }}>
//                 <TransactionManager
//                     trx={trx}
//                     wallet={userData?.wallet}
//                     type="sell"
//                     onConfirm={clear_sales}
//                     data={data}
//                     onClose={onCancel}
//                 />
//                 <Button
//                     variant="outlined"
//                     onClick={onCancel}
//                     sx={{ mt: 2, mr: 2 }}
//                 >
//                     Cancel
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// export default NftSaleOptions;



// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Box,
//     Typography,
//     FormControl,
//     Select,
//     MenuItem,
//     InputLabel,
//     Button,
// } from "@mui/material";
// import { TransactionManager } from "@components/Transactions";
// import { MAKE_TRX, useFee } from "./nftUtils";
// import {
//     clear_sales,
//     useTokenBalance,
//     useRoyaltyRate,
// } from "src/hooks/SWR_Hooks";
// import FixedSaleForm from "./FixedSaleForm";
// import DutchAuctionSaleForm from "./DutchAuctionSaleForm";
// import AuctionSaleForm from "./AuctionSaleForm";
// import FixedPriceNet from "./FixedPriceNet";
// import DutchAuctionPriceNet from "./DutchAuctionPriceNet";
// import AuctionPriceNet from "./AuctionPriceNet";
// import DateWarningMessage from "./DateWarningMessage";

// const NftSaleOptions = ({ type, data, userData, onCancel }) => {
//     console.log("NftSaleOptions", type, data, userData, onCancel);
//     const [saleType, setSaleType] = useState(type || "FIXED-SALE");
//     const [saleData, setSaleData] = useState(null);
//     const [trx, setTrx] = useState(null);
//     const { balance } = useTokenBalance(data.tokenId, userData?.account);
//     const fee = useFee(data.tokenId);
//     const royaltyRate = useRoyaltyRate(data.tokenId);

//     const handleSaleDataChange = useCallback((newSaleData) => {
//         setSaleData(newSaleData);
//     }, []);

//     useEffect(() => {
//         if(type) {
//             setSaleType(type);
//         }
//     }, [type]);

//     useEffect(() => {
//         if (userData && saleData && saleType && balance && balance.gt(0)) {
//             try {
//                 const newTrx = MAKE_TRX[saleType](
//                     data.tokenId,
//                     balance,
//                     userData.account,
//                     userData.guard,
//                     fee,
//                     saleData
//                 );
//                 setTrx(newTrx);
//             } catch (error) {
//                 console.error("Error creating transaction:", error);
//             }
//         }
//     }, [userData, saleData, saleType, data.tokenId, fee, balance]);

//     const renderSaleForm = () => {
//         switch (saleType) {
//             case "FIXED-SALE":
//                 return <FixedSaleForm onChange={handleSaleDataChange} />;
//             case "DUTCH-AUCTION-SALE":
//                 return <DutchAuctionSaleForm onChange={handleSaleDataChange} />;
//             case "AUCTION-SALE":
//                 return <AuctionSaleForm onChange={handleSaleDataChange} />;
//             default:
//                 return null;
//         }
//     };

//     const renderPriceNet = () => {
//         if (!saleData) return null;

//         switch (saleType) {
//             case "FIXED-SALE":
//                 return (
//                     <FixedPriceNet
//                         sale_data={saleData}
//                         token_id={data.tokenId}
//                         fee={fee}
//                     />
//                 );
//             case "DUTCH-AUCTION-SALE":
//                 return (
//                     <DutchAuctionPriceNet
//                         sale_data={saleData}
//                         token_id={data.tokenId}
//                         fee={fee}
//                     />
//                 );
//             case "AUCTION-SALE":
//                 return (
//                     <AuctionPriceNet
//                         sale_data={saleData}
//                         token_id={data.tokenId}
//                         fee={fee}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Box className="nft-sale-options">
//             <Typography variant="h5" className="nft-sale-options-title">
//                 Create NFT Sale
//             </Typography>
//             <div className="nft-sale-form-container">
//                 {renderSaleForm()}
//             </div>
//             <div className="nft-sale-price-net">
//                 {renderPriceNet()}
//             </div>
//             <div className="nft-sale-date-warning">
//                 <DateWarningMessage date={saleData?.tout} />
//             </div>
//             <div className="nft-sale-actions">
//                 <TransactionManager
//                     trx={trx}
//                     wallet={userData?.wallet}
//                     type="sell"
//                     onConfirm={clear_sales}
//                     data={data}
//                     onClose={onCancel}
//                 />
//                 <Button
//                     variant="outlined"
//                     onClick={onCancel}
//                     className="nft-sale-cancel-button"
//                     style={{
//                         marginTop: "20px",
//                         backgroundColor: "#fae944",
//                         color: "#000",
//                         border: "1px solid #fae944",
//                         fontSize: 16,
//                         fontWeight: 600,
//                         width: "100%",
//                         height: 40,
//                         borderRadius: 2,
//                         padding: 2,
//                         textAlign: "center",
//                         transition:
//                             "transform 0.2s, box-shadow 0.2s",
//                         "&:hover": {
//                             transform: "translateY(-5px)",
//                             boxShadow:
//                                 "0 4px 10px rgba(0, 0, 0, 0.1)",
//                         },
//                         cursor: "pointer",
//                     }}
//                 >
//                     Cancel
//                 </Button>
//             </div>
//         </Box>
//     );
// };

// export default NftSaleOptions;


import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Typography,
    Button,
} from "@mui/material";
import { TransactionManager } from "@components/Transactions";
import { MAKE_TRX, useFee } from "./nftUtils";
import {
    clear_sales,
    useTokenBalance,
    useRoyaltyRate,
} from "src/hooks/SWR_Hooks";
import FixedSaleForm from "./FixedSaleForm";
import DutchAuctionSaleForm from "./DutchAuctionSaleForm";
import AuctionSaleForm from "./AuctionSaleForm";
import FixedPriceNet from "./FixedPriceNet";
import DutchAuctionPriceNet from "./DutchAuctionPriceNet";
import AuctionPriceNet from "./AuctionPriceNet";
import DateWarningMessage from "./DateWarningMessage";

const NftSaleOptions = ({ type, data, userData, onCancel }) => {
    console.log("NftSaleOptions", type);
    const [saleType, setSaleType] = useState(type || "FIXED-SALE");
    const [saleData, setSaleData] = useState(null);
    const [trx, setTrx] = useState(null);
    const { balance } = useTokenBalance(data.tokenId, userData?.account);
    const fee = useFee(data.tokenId);
    const royaltyRate = useRoyaltyRate(data.tokenId);

    const handleSaleDataChange = useCallback((newSaleData) => {
        setSaleData(newSaleData);
    }, []);

    useEffect(() => {
        if (type) {
            setSaleType(type);
            setSaleData(null); // Reset saleData when type changes
        }
    }, [type]);

    useEffect(() => {
        if (userData && saleData && saleType && balance && balance.gt(0)) {
            try {
                const newTrx = MAKE_TRX[saleType](
                    data.tokenId,
                    balance,
                    userData.account,
                    userData.guard,
                    fee,
                    saleData
                );
                setTrx(newTrx);
            } catch (error) {
                console.error("Error creating transaction:", error);
            }
        }
    }, [userData, saleData, saleType, data.tokenId, fee, balance]);

    const renderSaleForm = () => {
        switch (saleType) {
            case "FIXED-SALE":
                return <FixedSaleForm onChange={handleSaleDataChange} />;
            case "DUTCH-AUCTION-SALE":
                return <DutchAuctionSaleForm onChange={handleSaleDataChange} />;
            case "AUCTION-SALE":
                return <AuctionSaleForm onChange={handleSaleDataChange} />;
            default:
                return null;
        }
    };

    const renderPriceNet = () => {
        if (!saleData) return null;

        switch (saleType) {
            case "FIXED-SALE":
                return (
                    <FixedPriceNet
                        sale_data={saleData}
                        token_id={data.tokenId}
                        fee={fee}
                    />
                );
            case "DUTCH-AUCTION-SALE":
                return (
                    <DutchAuctionPriceNet
                        sale_data={saleData}
                        token_id={data.tokenId}
                        fee={fee}
                    />
                );
            case "AUCTION-SALE":
                return (
                    <AuctionPriceNet
                        sale_data={saleData}
                        token_id={data.tokenId}
                        fee={fee}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Box className="nft-sale-options">
            <Typography variant="h5" className="nft-sale-options-title">
                Create NFT Sale
            </Typography>
            <div className="nft-sale-form-container">
                {renderSaleForm()}
            </div>
            <div className="nft-sale-price-net">
                {renderPriceNet()}
            </div>
            <div className="nft-sale-date-warning">
                <DateWarningMessage date={saleData?.tout} />
            </div>
            <div className="nft-sale-actions">
                <TransactionManager
                    trx={trx}
                    wallet={userData?.wallet}
                    type="sell"
                    onConfirm={clear_sales}
                    data={data}
                    onClose={onCancel}
                />
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    className="nft-sale-cancel-button"
                    style={{
                        marginTop: "20px",
                        backgroundColor: "#fae944",
                        color: "#000",
                        border: "1px solid #fae944",
                        fontSize: 16,
                        fontWeight: 600,
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
            </div>
        </Box>
    );
};

export default NftSaleOptions;