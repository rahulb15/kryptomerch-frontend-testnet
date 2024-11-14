// import React, { useState, useEffect } from "react";
// import { IoClose } from "react-icons/io5";

// const SettingsModal = ({ isOpen, onClose,mouseEffects, setMouseEffects, setMouseEffectSparkles, setMouseEffectBubbles }) => {
//     const [isAnimating, setIsAnimating] = useState(false);
//     const [activeTab, setActiveTab] = useState("GENERAL");

//     useEffect(() => {
//         if (mouseEffects === "none") {
//             setMouseEffectSparkles(false);
//             setMouseEffectBubbles(false);
//         } else if (mouseEffects === "sparkles") {
//             setMouseEffectSparkles(true);
//             setMouseEffectBubbles(false);
//         } else if (mouseEffects === "bubbles") {
//             setMouseEffectBubbles(true);
//             setMouseEffectSparkles(false);
//         }
//     }, [mouseEffects]);

//     useEffect(() => {
//         if (isOpen) {
//             setIsAnimating(true);
//             setTimeout(() => setIsAnimating(false), 300);
//         }
//     }, [isOpen]);

//     if (!isOpen && !isAnimating) return null;

//     return (
//         <div
//             className={`settings-modal-overlay ${
//                 isAnimating ? "animating" : ""
//             }`}
//         >
//             <div className={`settings-modal ${isAnimating ? "animating" : ""}`}>
//                 <button className="close-button" onClick={onClose}>
//                     <IoClose />
//                 </button>
//                 <div className="settings-modal-header">
//                     <h2>App Settings</h2>
//                 </div>
//                 <div className="settings-modal-content">
//                     <div className="settings-tabs">
//                         <button
//                             className={activeTab === "GENERAL" ? "active" : ""}
//                             onClick={() => setActiveTab("GENERAL")}
//                         >
//                             GENERAL
//                         </button>
//                         <button
//                             className={
//                                 activeTab === "NOTIFICATIONS" ? "active" : ""
//                             }
//                             onClick={() => setActiveTab("NOTIFICATIONS")}
//                         >
//                             NOTIFICATIONS
//                         </button>
//                     </div>
//                     {activeTab === "GENERAL" && (
//                         <div className="settings-general">

//                             {/* //mouseEffect */}
//                             <div className="settings-section">
//                                 <h3>Mouse Effects</h3>
//                                 <select
//                                     value={mouseEffects}
//                                     onChange={(e) =>
//                                         setMouseEffects(e.target.value)
//                                     }
//                                 >
//                                     <option value="none">None</option>
//                                     <option value="sparkles">Sparkles</option>
//                                     <option value="bubbles">Bubbles</option>
//                                 </select>

//                             </div>

//                             <div className="settings-section">
//                                 <h3>RARITY</h3>
//                                 <select defaultValue="default">
//                                     <option value="default">
//                                         Default / Rarity
//                                     </option>
//                                     <option value="statistical">
//                                         Statistical Rarity
//                                     </option>
//                                     <option value="team"> Team Rarity</option>
//                                     <option value="trait">
//                                         Trait Normalized
//                                     </option>
//                                 </select>
//                             </div>
//                             <div className="settings-section">
//                                 <h3>DISPLAY</h3>
//                                 <label>
//                                     <input type="checkbox" /> Freeze GIFs
//                                 </label>
//                                 <label>
//                                     <input type="checkbox" defaultChecked />{" "}
//                                     Keep pools grouped
//                                 </label>
//                                 <label>
//                                     <input type="checkbox" defaultChecked />{" "}
//                                     Show prices post fees/royalties
//                                 </label>
//                                 <label>
//                                     <input type="checkbox" /> Show marketplace
//                                     icons
//                                 </label>
//                                 <label>
//                                     <input type="checkbox" defaultChecked />{" "}
//                                     Show YOLO buy
//                                 </label>
//                                 <label>
//                                     <input type="checkbox" defaultChecked />{" "}
//                                     Show Tensorian helper (bottom right)
//                                 </label>
//                             </div>
//                             {/* <div className="settings-section">
//                                 <h3>TRADING</h3>
//                                 <div>Optional Royalty</div>
//                                 <div className="royalty-options">
//                                     <button>NONE</button>
//                                     <button>HALF</button>
//                                     <button className="active">FULL</button>
//                                 </div>
//                                 <label>
//                                     <input type="checkbox" /> Use shared escrow
//                                     for bids
//                                 </label>
//                                 <label>
//                                     <input type="checkbox" defaultChecked /> Use
//                                     Jito bundled transactions
//                                 </label>
//                             </div>
//                             <div className="settings-section">
//                                 <h3>EXPLORER & RPC</h3>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="explorer"
//                                         defaultChecked
//                                     />{" "}
//                                     SolanaFM
//                                 </label>
//                                 <label>
//                                     <input type="radio" name="explorer" />{" "}
//                                     Solscan
//                                 </label>
//                                 <label>
//                                     <input type="radio" name="explorer" /> XRAY
//                                 </label>
//                                 <label>
//                                     <input type="radio" name="explorer" />{" "}
//                                     Solana Explorer
//                                 </label>
//                                 <label>
//                                     <input type="radio" name="explorer" /> Jito
//                                 </label>
//                                 <div className="custom-rpc">
//                                     <input
//                                         type="text"
//                                         placeholder="Custom RPC url: https://..."
//                                     />
//                                     <button>Confirm</button>
//                                 </div>
//                             </div> */}
//                         </div>
//                     )}
//                     {activeTab === "NOTIFICATIONS" && (
//                         <div className="settings-notifications">
//                             {/* Add notification settings here */}
//                         </div>
//                     )}
//                 </div>
//                 <div className="settings-modal-footer">
//                     <label>
//                         <input type="checkbox" /> Lite
//                     </label>
//                     <label>
//                         <input type="checkbox" defaultChecked /> Pro
//                     </label>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SettingsModal;
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { IoClose, IoChevronForward } from "react-icons/io5";

const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled(motion.div)`
    background-color: #18181b;
    border-radius: 16px;
    width: 90%;
    max-width: 480px;
    max-height: 85vh;
    overflow-y: auto;
    color: #e4e4e7;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #27272a;
`;

const ModalTitle = styled.h2`
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #d4d4d8;
    white-space: nowrap;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: #71717a;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.2s ease;
    display: flex;
    align-items: right;
    justify-content: right;

    &:hover {
        color: #d4d4d8;
    }
`;

const SettingsSection = styled.div`
    padding: 24px;
    border-bottom: 1px solid #27272a;

    &:last-child {
        border-bottom: none;
    }
`;

const SectionTitle = styled.h3`
    margin: 0 0 16px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #d4d4d8;
`;

const OptionRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #27272a;
    }
`;

const OptionLabel = styled.span`
    font-size: 1rem;
    color: #a1a1aa;
`;

const OptionValue = styled.span`
    font-size: 0.9rem;
    color: #60a5fa;
    display: flex;
    align-items: center;
`;

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
`;

const SwitchInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
        background-color: #60a5fa;
    }

    &:checked + span:before {
        transform: translateX(24px);
    }
`;

const SwitchSlider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #3f3f46;
    transition: 0.4s;
    border-radius: 24px;

    &:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }
`;

const mouseEffectOptions = [
    { value: "none", label: "None" },
    { value: "sparkles", label: "Sparkles" },
    { value: "bubbles", label: "Bubbles" },
];

const SettingsModal = ({
    isOpen,
    onClose,
    mouseEffects,
    setMouseEffects,
    setMouseEffectSparkles,
    setMouseEffectBubbles,
}) => {
    const [settings, setSettings] = useState({
        freezeGIFs: false,
        keepPoolsGrouped: true,
        showPricesPostFees: true,
        showMarketplaceIcons: false,
        showBubble: true,
        showAI: true,
    });

    useEffect(() => {
        setMouseEffectSparkles(mouseEffects === "sparkles");
        setMouseEffectBubbles(mouseEffects === "bubbles");
    }, [mouseEffects, setMouseEffectSparkles, setMouseEffectBubbles]);

    const handleMouseEffectsChange = () => {
        const currentIndex = mouseEffectOptions.findIndex(
            (option) => option.value === mouseEffects
        );
        const nextIndex = (currentIndex + 1) % mouseEffectOptions.length;
        setMouseEffects(mouseEffectOptions[nextIndex].value);
    };

    const toggleSetting = (key) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: !prevSettings[key],
        }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <ModalContent
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 500,
                        }}
                    >
                        <ModalHeader>
                            <ModalTitle>Settings</ModalTitle>
                            <CloseButton onClick={onClose}>
                                <IoClose />
                            </CloseButton>
                        </ModalHeader>

                        <SettingsSection>
                            <SectionTitle>General</SectionTitle>
                            <OptionRow onClick={handleMouseEffectsChange}>
                                <OptionLabel>Mouse Effects</OptionLabel>
                                <OptionValue>
                                    {
                                        mouseEffectOptions.find(
                                            (option) =>
                                                option.value === mouseEffects
                                        ).label
                                    }
                                    <IoChevronForward
                                        style={{ marginLeft: "8px" }}
                                    />
                                </OptionValue>
                            </OptionRow>
                        </SettingsSection>

                        <SettingsSection>
                            <SectionTitle>Display</SectionTitle>
                            {Object.entries(settings).map(([key, value]) => (
                                <OptionRow
                                    key={key}
                                    onClick={() => toggleSetting(key)}
                                >
                                    <OptionLabel>
                                        {key
                                            .replace(/([A-Z])/g, " $1")
                                            .replace(/^./, (str) =>
                                                str.toUpperCase()
                                            )}
                                    </OptionLabel>
                                    <Switch>
                                        <SwitchInput
                                            type="checkbox"
                                            checked={value}
                                            onChange={() => {}}
                                        />
                                        <SwitchSlider />
                                    </Switch>
                                </OptionRow>
                            ))}
                        </SettingsSection>
                    </ModalContent>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
};

export default SettingsModal;
