import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { AlertCircle, X } from "lucide-react";
import ChainIcon from "@components/ChainIcon";
import BitcoinIcon from "src/data/icons/Bitcoin";
import BlastIcon from "src/data/icons/Blast";
import EthereumLogo from "src/data/icons/Ethereum";
import FantomLogo from "src/data/icons/Fantom";
import PolygonLogo from "src/data/icons/Polygon";
import OptimismLogo from "src/data/icons/Optimum";
import AvalancheLogo from "src/data/icons/Avalanche";
import BNBLogo from "src/data/icons/BNB";
import ArbitrumLogo from "src/data/icons/Arbitrum";
import SolanaLogo from "src/data/icons/Solana";
import KadenaLogo from "src/data/icons/Kadena";
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

const LaunchpadChainHeader = ({
    className,
    space,
    initialChain = "kadena",
}) => {
    const [activeChain, setActiveChain] = useState(initialChain);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedChain, setSelectedChain] = useState(null);
    const [loadingChain, setLoadingChain] = useState(null); // Add loading state
    const [pressedChain, setPressedChain] = useState(null);
    console.log("pressedChain", pressedChain);

    const chains = [
        { id: "all", name: "All Chains", icon: null },
        {
            id: "kadena",
            name: "Kadena",
            icon: (
                <KadenaLogo
                    className={
                        pressedChain === "kadena"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
        {
            id: "solana",
            name: "Solana",
            icon: (
                <SolanaLogo
                    className={
                        pressedChain === "solana"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
        {
            id: "arbitrum",
            name: "Arbitrum",
            icon: (
                <ArbitrumLogo
                    className={
                        pressedChain === "arbitrum"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
        {
            id: "bnb",
            name: "BNB Smart Chain",
            icon: (
                <BNBLogo
                    className={
                        pressedChain === "bnb"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
        {
            id: "avalanche",
            name: "Avalanche",
            icon: (
                <AvalancheLogo
                    className={
                        pressedChain === "avalanche"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
        {
            id: "optimism",
            name: "Optimism",
            icon: (
                <OptimismLogo
                    className={
                        pressedChain === "optimism"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
        {
            id: "polygon",
            name: "Polygon",
            icon: (
                <PolygonLogo
                    className={
                        pressedChain === "polygon"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
        {
            id: "fantom",
            name: "Fantom",
            icon: (
                <FantomLogo
                    className={
                        pressedChain === "fantom"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
        {
            id: "ethereum",
            name: "Ethereum",
            icon: (
                <EthereumLogo
                    className={
                        pressedChain === "ethereum"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
        {
            id: "blast",
            name: "Blast",
            icon: (
                <BlastIcon
                    className={
                        pressedChain === "blast"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
        {
            id: "bitcoin",
            name: "Bitcoin",
            icon: (
                <BitcoinIcon
                    className={
                        pressedChain === "bitcoin"
                            ? "bitcoin-icon--black"
                            : "bitcoin-icon--white"
                    }
                />
            ),
        },
    ];

    const handleChainClick = async (chain) => {
        if (chain.id === "kadena") {
            setLoadingChain(chain.id);
            // setPressedChain(chain.id);
            await new Promise((resolve) => setTimeout(resolve, 500));
            setActiveChain(chain.id);
            setLoadingChain(null);
            // setPressedChain(null)
        } else if (chain.id === "all") {
            setActiveChain(chain.id);
        } else {
            setSelectedChain(chain);
            setModalOpen(true);
        }
    };

    return (
        <>
            <div
                className={clsx(
                    "rn-breadcrumb-inner",
                    className,
                    space === 1 && "ptb--1"
                )}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 col-md-12 col-12">
                            <nav className="chain-tabs">
                                <ul>
                                    {chains.map((chain) => (
                                        <li
                                            key={chain.id}
                                            className={clsx(
                                                activeChain === chain.id &&
                                                    "active",
                                                chain.id === "all" &&
                                                    "all-chains"
                                            )}
                                        >
                                            {chain.id === "all" ? (
                                                <button
                                                    className="special-btn"
                                                    onClick={() =>
                                                        handleChainClick(chain)
                                                    }
                                                >
                                                    All Chains
                                                </button>
                                            ) : (
                                                <Tooltip
                                                    title={chain.name}
                                                    arrow
                                                    placement="top"
                                                    classes={{
                                                        tooltip:
                                                            "custom-tooltip",
                                                    }}
                                                >
                                                    <button
                                                        className={clsx(
                                                            "chain-btn",
                                                            activeChain ===
                                                                chain.id &&
                                                                "chain-btn-active",
                                                            loadingChain ===
                                                                chain.id &&
                                                                "loading" // Add loading class
                                                        )}
                                                        onClick={() =>
                                                            handleChainClick(
                                                                chain
                                                            )
                                                        }
                                                        onMouseDown={() =>
                                                            setPressedChain(
                                                                chain.id
                                                            )
                                                        }
                                                        onMouseUp={() =>
                                                            setPressedChain(
                                                                null
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setPressedChain(
                                                                null
                                                            )
                                                        }
                                                        disabled={
                                                            loadingChain ===
                                                            chain.id
                                                        } // Disable during loading
                                                    >
                                                        {/* <Image
                                                            src={chain.icon}
                                                            alt={chain.name}
                                                            width={20}
                                                            height={20}
                                                        /> */}

                                                        {chain.icon}

                                                        {/* <ChainIcon
  chainId={chain.id}
  icon={chain.icon}
  name={chain.name}
  isActive={activeChain === chain.id}
  size={20}
/> */}
                                                        {/* {activeChain ===
                                                            chain.id && (
                                                            <div className="live-indicator">
                                                                <div className="pulse"></div>
                                                            </div>
                                                        )} */}
                                                    </button>
                                                </Tooltip>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {selectedChain && (
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <div className="modal-header">
                        <div className="chain-icon-wrapper">
                            <Image
                                src={selectedChain.icon}
                                alt={selectedChain.name}
                                width={60}
                                height={60}
                                className="chain-icon"
                            />
                        </div>
                        <h2 className="modal-title">
                            {selectedChain.name} Coming Soon!
                        </h2>
                    </div>

                    <div className="modal-body">
                        <div className="alert-wrapper">
                            <AlertCircle className="alert-icon" />
                            <span>Chain Integration In Progress</span>
                        </div>
                        <p className="modal-description">
                            We're working hard to bring {selectedChain.name} to
                            our platform. Stay tuned for updates! Currently,
                            only Kadena chain is supported.
                        </p>
                        <div className="progress-wrapper">
                            <div className="progress-header">
                                <span className="progress-label">
                                    Integration Progress
                                </span>
                                <span className="progress-value">30%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

LaunchpadChainHeader.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    initialChain: PropTypes.string,
};

LaunchpadChainHeader.defaultProps = {
    space: 1,
    initialChain: "kadena",
};

export default LaunchpadChainHeader;
