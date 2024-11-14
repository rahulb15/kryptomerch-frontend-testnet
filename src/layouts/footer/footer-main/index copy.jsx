import ColorSwitcher from "@components/color-switcher";
import { ItemType } from "@utils/types";
import PropTypes from "prop-types";
import { IoSettings } from "react-icons/io5";
import { MdKeyboard } from "react-icons/md";
import { FaUser, FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SettingsModal from "@components/SettingsModal";
import { useRouter } from "next/router";
import Image from "next/image";
import AnimatedCursor from "react-animated-cursor";
import dynamic from "next/dynamic";
import { FaChevronDown, FaChevronUp, FaLink } from "react-icons/fa";
import { motion } from "framer-motion";
import styled from "styled-components";
import Foote from "@layout/footer/footer-01";
import ChatBot from "@containers/chatbot";
import { useAccountContext } from "src/contexts";
import { CHAIN_ID } from "src/constants/contextConstants";
import FooterMusicStatus from "@components/FooterMusicStatus";
import { useAudioPlayer } from "src/contexts/AudioPlayerContext";

// Styled component for the button with gradient border
const GradientBorderButton = styled(motion.div)`
    position: relative;
    background: #1a1a1a;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(
            45deg,
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8,
            #ff0000
        );
        z-index: -1;
        border-radius: inherit;
        animation: gradientAnimation 20s linear infinite;
    }

    @keyframes gradientAnimation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;
const MouseParticles = dynamic(() => import("react-mouse-particles"), {
    ssr: false,
});
const Footer = () => {
    const router = useRouter();
    const account = useAccountContext();
    console.log(account, "account");
    const [prices, setPrices] = useState({ solana: 0, kda: 0 });
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { isPlaying } = useAudioPlayer();

    const [mouseEffects, setMouseEffects] = useState("none");
    const [mouseEffectSparkles, setMouseEffectSparkles] = useState(false);
    const [mouseEffectBubbles, setMouseEffectBubbles] = useState(false);
    const [isDetailedFooterOpen, setIsDetailedFooterOpen] = useState(false);

    const toggleDetailedFooter = () => {
        setIsDetailedFooterOpen(!isDetailedFooterOpen);
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const toggleShortcuts = () => {
        setShowShortcuts(!showShortcuts);
    };

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/simple/price?ids=solana,kadena&vs_currencies=usd"
                );
                setPrices({
                    solana: response.data.solana.usd,
                    kda: response.data.kadena.usd,
                });
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        };

        fetchPrices();
        // Set up an interval to fetch prices every minute
        const interval = setInterval(fetchPrices, 60000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const shortcuts = [
        { key: "Ctrl + K", description: "Open search" },
        { key: "Ctrl + L", description: "Launchpad" },
        { key: "Ctrl + H", description: "Home" },
        { key: "Ctrl + P", description: "Profile" },
        { key: "Ctrl + Shift + S", description: "Focus search" },
        { key: "Esc", description: "Close search" },
        { key: "Ctrl + Shift + E", description: "Open settings/preferences" },
        { key: "Ctrl + Alt + N", description: "Open notifications" },
        { key: "Ctrl + Shift + P", description: "Toggle theme" },
        { key: "Ctrl + Shift + D", description: "Go to dashboard" },
        { key: "Ctrl + Alt + M", description: "Open messages" },
        { key: "Ctrl + Alt + O", description: "Open orders" },
        { key: "Ctrl + Shift + F", description: "Focus search bar" },
        { key: "Alt + Shift + H", description: "Open help" },
        {
            key: "Alt + Shift + I",
            description: "Open dev tools or inspection mode",
        },
        { key: "Ctrl + Shift + U", description: "Open user profile" },
        { key: "Ctrl + Alt + S", description: "Save data" },
    ];

    const handleBackward = () => {
        router.back();
    };

    const handleForward = () => {
        window.history.forward();
    };

    const handleHome = () => {
        router.push("/");
    };

    const heartbeatVariants = {
        beat: {
            scale: [1, 1.08, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            },
        },
    };

    return (
        <div
            className={`footer-fixed ${isDetailedFooterOpen ? "expanded" : ""}`}
        >
            <div className="footer-container">
                <div className="footer-menu">
                    <div className="footer-section start">
                        <div className="setting-option" onClick={handleHome}>
                            <FaHome />
                        </div>
                        <div className="setting-option">
                            <div
                                id="my_switcher"
                                className="setting-option my_switcher"
                            >
                                <ColorSwitcher />
                            </div>
                        </div>

                        <div className="setting-option">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#fff",
                                            fontSize: "1.2rem",
                                            fontWeight: "bold",
                                            marginRight: "5px",
                                        }}
                                    >
                                        <FaLink />
                                    </span>
                                    <span style={{ color: "#fff" }}>
                                        {" "}
                                        {CHAIN_ID}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                        <div
                            className="setting-option"
                            onClick={toggleSettings}
                        >
                            <IoSettings />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span
                                style={{
                                    color: "#fff",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                }}
                            >
                                v {process.env.NEXT_PUBLIC_VERSION}
                            </span>
                        </div>

                        {isPlaying && <FooterMusicStatus />}
                    </div>
                    <div className="footer-section middle">
                        <motion.div
                            className="setting-option"
                            onClick={toggleDetailedFooter}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1, ...heartbeatVariants.beat }}
                            exit={{ opacity: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isDetailedFooterOpen ? (
                                // <FaChevronUp />
                                <FaChevronDown />
                            ) : (
                                // <FaChevronDown />
                                <FaChevronUp />
                            )}
                        </motion.div>

                        <div className="copy-right">
                            <span>Kryptomerch</span>
                            <span>&copy; {new Date().getFullYear()}</span>
                        </div>
                    </div>
                    <div className="footer-section end">
                        <div
                            className="setting-option"
                            onClick={handleBackward}
                        >
                            <FaArrowLeft />
                        </div>
                        <div className="setting-option" onClick={handleForward}>
                            <FaArrowRight />
                        </div>
                        <div className="setting-option">
                            <ChatBot userId={account?.user?._id} />
                        </div>
                        <div
                            className="setting-option"
                            onClick={toggleShortcuts}
                            style={{ position: "relative" }}
                        >
                            <MdKeyboard />
                            {showShortcuts && (
                                <div className="shortcuts-menu">
                                    <h3>Keyboard Shortcuts</h3>
                                    <ul>
                                        {shortcuts.map((shortcut, index) => (
                                            <li key={index}>
                                                <span className="shortcut-key">
                                                    {shortcut.key}
                                                </span>
                                                <span className="shortcut-description">
                                                    {shortcut.description}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div
                            style={{
                                color: "#fff",
                                fontSize: "1.2rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                            }}
                        >
                            <span
                                style={{
                                    color: "#fff",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                }}
                            >
                                <Image
                                    src="/wallet/solana-sol-logo.svg"
                                    alt="Solana"
                                    width={15}
                                    height={15}
                                />
                            </span>
                            <span style={{ color: "#fff" }}>
                                {" "}
                                $ {prices.solana.toFixed(2)}
                            </span>

                            <span
                                style={{
                                    color: "#fff",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    marginLeft: "10px",
                                }}
                            >
                                <Image
                                    src="/wallet/Kadena.png"
                                    alt="Kadena"
                                    width={20}
                                    height={20}
                                />
                            </span>
                            <span style={{ color: "#fff" }}>
                                {" "}
                                $ {prices.kda.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {isDetailedFooterOpen && (
                <div className="detailed-footer">
                    <div className="container">
                        <Foote />
                    </div>
                </div>
            )}

            <SettingsModal
                isOpen={showSettings}
                onClose={toggleSettings}
                mouseEffects={mouseEffects}
                setMouseEffects={setMouseEffects}
                setMouseEffectSparkles={setMouseEffectSparkles}
                setMouseEffectBubbles={setMouseEffectBubbles}
            />
            {mouseEffectSparkles && (
                <MouseParticles
                    g={1}
                    color="random"
                    cull="MuiSvgIcon-root,MuiButton-root"
                    level={6}
                />
            )}
            {mouseEffectBubbles && (
                <AnimatedCursor
                    innerSize={8}
                    outerSize={8}
                    color="193, 11, 111"
                    outerAlpha={0.2}
                    innerScale={0.7}
                    outerScale={5}
                />
            )}
        </div>
    );
};

Footer.propTypes = {
    space: PropTypes.oneOf([1, 2, 3]),
    className: PropTypes.string,
    data: PropTypes.shape({
        items: PropTypes.arrayOf(ItemType),
    }),
};

Footer.defaultProps = {
    space: 1,
};

export default Footer;
