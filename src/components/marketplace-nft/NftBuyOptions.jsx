import React from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { TransactionManager } from "@components/Transactions";
import { make_trx } from "./nftUtils";
import { clear_sales } from "src/hooks/SWR_Hooks";

const NftBuyOptions = ({ data, userData, sales }) => {
  console.log("NftBuyOptions", sales);
  const buyTrx = sales[0] && userData?.account && userData?.guard && userData?.key
    ? make_trx(sales[0], userData.account, userData.guard)
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
      <TransactionManager
        trx={buyTrx}
        wallet={userData?.wallet}
        data={data}
        type="buy"
        onClose={() => {}} // Add your close handler here
        onConfirm={() => {
          clear_sales();
          console.log("Sale cancelled successfully");
          // Add any additional actions after successful cancellation
        }}
      />
    </motion.div>
  );
};

export default NftBuyOptions;