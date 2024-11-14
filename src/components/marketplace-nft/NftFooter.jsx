import React from "react";
import { Box, Typography } from "@mui/material";

const NftFooter = ({ data }) => (
  <Box className="nft-modal-footer">
    <Typography variant="body1" paragraph>
      Listed: <strong>{321}</strong>
    </Typography>
    <Typography variant="body1" paragraph>
      Supply: <strong>{5}</strong>
    </Typography>
    <Typography variant="body1" paragraph>
      24H Floor: <strong>{5}</strong>
    </Typography>
    <Typography variant="body1" paragraph>
      24H Volume: <strong>{6}</strong>
    </Typography>
    <Typography variant="body1" paragraph>
      Social Media Links:{" "}
      <strong>
        <a href={"https://google.com"}>Twittessr</a>
      </strong>
    </Typography>
  </Box>
);

export default NftFooter;