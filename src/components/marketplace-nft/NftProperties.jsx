import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const NftProperties = ({ data }) => {
  if (!data.properties || data.properties.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="animate-fade-in"
    >
      <Box mt={4}>
        <Typography variant="h5" gutterBottom className="nft-properties-heading">
          Properties
        </Typography>
        {data.properties.map((prop, index) => (
          <Box key={index} mt={2}>
            <Typography variant="body1">
              Collection: <strong>{prop.collection.name}</strong> ({prop.collection.family})
            </Typography>
            <Typography variant="body1">
              Authors: <strong>{prop.authors.map((author) => author.name).join(", ")}</strong>
            </Typography>
          </Box>
        ))}
      </Box>
    </motion.div>
  );
};

export default NftProperties;