import React, { useState, useMemo, useEffect } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { AnimatePresence, motion } from "framer-motion";
import { useAccountContext } from "src/contexts";
import {
    useTokenPolicies,
    useSalesForToken,
    useTokenBalance,
    useTokenSupply,
    usePrecision,
    useRoyalty,
} from "src/hooks/SWR_Hooks";
import NftHeader from "./NftHeader";
import NftContent from "./NftContent";
import NftFooter from "./NftFooter";
import NftSaleOptions from "./NftSaleOptions";
import NftBuyOptions from "./NftBuyOptions";
import NftBidOptions from "./NftBidOptions";
import { useFee, get_guard } from "./nftUtils";

const NftMarketPlaceDetailModal = ({ open, onClose, data }) => {
    const accountuser = useAccountContext();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const { policies } = useTokenPolicies(data.tokenId);
    const { sales } = useSalesForToken(data.tokenId);
    const [userData, setUserData] = useState(null);
    const [selectedSale, setSelectedSale] = useState(null);
    const { precision } = usePrecision(data.tokenId);
    const { supply } = useTokenSupply(data.tokenId);
    const { balance } = useTokenBalance(data.tokenId, userData?.account);
    const [wallet, setWallet] = useState("");
    const [account, setAccount] = useState("");
    const [guard, setGuard] = useState("");
    const [keyError, setKeyError] = useState(false);
    const [saleType, setSaleType] = useState(null);
    const [showSaleOptions, setShowSaleOptions] = useState(false);
    const [showBuyOptions, setShowBuyOptions] = useState(false);
    const [showBidOptions, setShowBidOptions] = useState(false);
    const [showDutchBuyOptions, setShowDutchBuyOptions] = useState(false);

    const fee = useFee(data.tokenId);

    useEffect(() => {
        setWallet(
            accountuser?.user?.walletName === "Ecko Wallet"
                ? "Ecko"
                : accountuser?.user?.walletName === "Chainweaver"
                ? "ChainWeaver_Desktop"
                : "Other"
        );
        setAccount(accountuser?.user?.walletAddress);
    }, [accountuser]);

    useEffect(() => {
        if (wallet && account && guard) {
            setUserData({ wallet, account, guard, key: guard?.keys?.[0] });
        } else {
            setUserData(null);
        }
    }, [wallet, account, guard]);

    useEffect(() => {
        if (account) {
            get_guard(account)
                .then((g) => {
                    setGuard(g);
                    setKeyError(false);
                })
                .catch(() => setKeyError(true));
        }
    }, [account]);

    const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

    if (!open) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                className={`nft-modal-box ${
                    isFullScreen ? "nft-fullscreen" : ""
                }`}
            >
                <div
                    className={`nft-modal-box-child ${
                        isFullScreen ? "nft-fullscreen" : ""
                    }`}
                >
                    <NftHeader
                        data={data}
                        isFullScreen={isFullScreen}
                        toggleFullScreen={toggleFullScreen}
                        onClose={onClose}
                    />
                    <NftContent
                        data={data}
                        userData={userData}
                        sales={sales}
                        showSaleOptions={showSaleOptions}
                        showBuyOptions={showBuyOptions}
                        showBidOptions={showBidOptions}
                        showDutchBuyOptions={showDutchBuyOptions}
                        setShowBuyOptions={setShowBuyOptions}
                        setShowBidOptions={setShowBidOptions}
                        setShowDutchBuyOptions={setShowDutchBuyOptions}
                    />
                    <NftFooter data={data} />
                </div>
            </Box>
        </Modal>
    );
};

export default NftMarketPlaceDetailModal;
