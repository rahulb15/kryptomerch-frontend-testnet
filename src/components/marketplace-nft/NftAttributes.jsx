import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const NftAttributes = ({ data }) => {
  if (!data?.attributes || data.attributes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="animate-fade-in"
    >
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Attributes
        </Typography>
        <Box className="nft-attributes-grid">
          {data.attributes.map((attr, index) => (
            <Box key={index} className="nft-attribute-box">
              <Typography variant="subtitle2" className="attribute-type">
                {attr.trait_type}
              </Typography>
              <Typography variant="body1" className="attribute-value">
                {attr.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

export default NftAttributes;