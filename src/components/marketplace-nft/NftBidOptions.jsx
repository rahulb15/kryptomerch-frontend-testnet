import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { TransactionManager } from "@components/Transactions";
import { make_bid_trx, auction_next_price } from "./nftUtils";
import { clear_sales } from "src/hooks/SWR_Hooks";
import Decimal from "decimal.js";
import { Price } from "./Price";

const NftBidOptions = ({ data, userData, sales }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [bidError, setBidError] = useState("");
  const [bidTrx, setBidTrx] = useState(null);

  const handleBidAmountChange = (event) => {
    const value = event.target.value;
    setBidAmount(value);
    validateBidAmount(value);
  };

  const validateBidAmount = (value) => {
    if (!value) {
      setBidError("Bid amount is required");
      return;
    }

    const minBid = auction_next_price(sales[0]);
    if (Decimal(value).lt(minBid)) {
      setBidError(`Bid must be at least ${minBid}`);
    } else {
      setBidError("");
    }
  };

  useEffect(() => {
    if (bidAmount && !bidError) {
      const transaction = sales[0] && userData?.account && userData?.guard && userData?.key
        ? make_bid_trx(sales[0], userData.account, userData.guard, Decimal(bidAmount))
        : null;
      setBidTrx(transaction);
    } else {
      setBidTrx(null);
    }
  }, [bidAmount, bidError, sales, userData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Typography variant="h5" gutterBottom style={{marginTop: "20px"}} className="nft-bid-title">
        Confirm Bid
      </Typography>
      <div className="nft-bid-options">
        <label className="nft-bid-label">
          Bid amount: Min:{" "}
          <span className="nft-price-display">
            <Price value={auction_next_price(sales[0])} curr={sales[0]?.currency} />{" "}
          </span>
        </label>
        <input
          type="number"
          className={`nft-bid-input ${bidError ? "error" : ""}`}
          value={bidAmount}
          onChange={handleBidAmountChange}
        />
        {bidError && <p className="nft-bid-error-message">{bidError}</p>}
      </div>
      <Box mt={2}>
        <TransactionManager
          trx={bidTrx}
          wallet={userData?.wallet}
          data={data}
          type="bid"
          onClose={() => {}} // Add your close handler here
          amount={bidAmount}
          onConfirm={() => {
            clear_sales();
            console.log("Bid placed successfully");
            // Add any additional actions after successful bid
          }}
        />
      </Box>
    </motion.div>
  );
};

export default NftBidOptions;