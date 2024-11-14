import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { TransactionManager } from "@components/Transactions";
import { make_trx } from "./nftUtils";
import { clear_sales } from "src/hooks/SWR_Hooks";
import { useDutchPrice } from "src/hooks/useDutchPrice";
import Decimal from "decimal.js";

const NftDutchBuyOptions = ({ data, userData, sales }) => {
  console.log("NftDutchBuyOptions", data, userData, sales);

  const [currentPrice, setCurrentPrice] = useState(null);

  // Determine if we need to fetch Dutch price
  const isDutchAuction = sales[0]?.type === "d";
  const saleId = isDutchAuction ? sales[0]?.["sale-id"] : null;

  // Use the custom hook
  const { price: fetchedPrice, isLoading, error, refetch } = useDutchPrice(saleId, sales[0]?.type);

  console.log("fetchedPrice", fetchedPrice);

  // Update the current price when the query completes
  useEffect(() => {
    if (fetchedPrice && !isLoading && !error) {
      const decimalPrice = new Decimal(fetchedPrice);
      console.log("Setting current price to:", decimalPrice.toDecimalPlaces(2, Decimal.ROUND_UP).toString());
      setCurrentPrice(decimalPrice.toDecimalPlaces(2, Decimal.ROUND_UP));
    }
  }, [fetchedPrice, isLoading, error]);

  // Create an updated sale object with the current price
  const updatedSale = sales[0] ? {
    ...sales[0],
    price: currentPrice ? currentPrice.toString() : sales[0]["start-price"]
  } : null;

  console.log("updatedSale", updatedSale);

  const buyTrx = updatedSale && userData?.account && userData?.guard && userData?.key
    ? make_trx(updatedSale, userData.account, userData.guard)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Typography variant="h5" gutterBottom>
        Confirm Purchase
      </Typography>
      {isLoading && isDutchAuction && (
        <Typography>Loading current Dutch auction price...</Typography>
      )}
      {error && isDutchAuction && (
        <Typography color="error">Error fetching Dutch auction price: {error}</Typography>
      )}
      {isDutchAuction && currentPrice && (
        <Typography>Current Dutch auction price: {currentPrice.toString()}</Typography>
      )}
      {!isDutchAuction && (
        <Typography>Fixed price: {sales[0]?.["start-price"]}</Typography>
      )}
      {buyTrx && (
        <TransactionManager
          trx={buyTrx}
          wallet={userData?.wallet}
          data={data}
          type="buy"
          onClose={() => {}} // Add your close handler here
          onConfirm={() => {
            clear_sales();
            console.log("Purchase completed successfully");
            // Add any additional actions after successful purchase
          }}
        />
      )}
    </motion.div>
  );
};

export default NftDutchBuyOptions;