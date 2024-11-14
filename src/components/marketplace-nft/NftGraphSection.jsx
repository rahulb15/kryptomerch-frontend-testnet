import React from "react";
import { Box, Typography } from "@mui/material";
import NftPriceHistoryGraph from "@components/NftPriceHistoryGraph";

const mockPriceData = [
  { date: '2023-01', price: 100 },
  { date: '2023-02', price: 120 },
  { date: '2023-03', price: 110 },
  { date: '2023-04', price: 130 },
  { date: '2023-05', price: 150 },
];

const NftGraphSection = () => (
  <Box className="nft-graph-section">
    <Typography variant="h5" gutterBottom>Price History</Typography>
    <NftPriceHistoryGraph data={mockPriceData} />
  </Box>
);

export default NftGraphSection;