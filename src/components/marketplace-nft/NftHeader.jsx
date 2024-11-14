import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";

const NftHeader = ({ data, isFullScreen, toggleFullScreen, onClose }) => (
  <Box className="nft-modal-header">
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Typography variant="h4">{data.collectionName}</Typography>
        <Typography variant="h5" color="textSecondary">
          Token ID: {data.tokenId}
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Rarity Rank: {data?.rarityRank}
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Rarity Score: {data?.rarityScore}
        </Typography>
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 8 }}>
        <IconButton onClick={toggleFullScreen}>
          {isFullScreen ? (
            <FullscreenExitIcon className="fullscreen-icon" />
          ) : (
            <FullscreenIcon className="fullscreen-icon" />
          )}
        </IconButton>
        <IconButton onClick={onClose}>
          <CloseIcon className="close-icon" />
        </IconButton>
      </Box>
    </div>
  </Box>
);

export default NftHeader;