// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useRef, useEffect } from "react";
// import { Tooltip } from "react-tooltip";
// import { useRouter } from "next/router";

// const BalanceDropdown = ({ balance }) => {
//     const router = useRouter();
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const balanceRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 dropdownRef.current &&
//                 !dropdownRef.current.contains(event.target)
//             ) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const toggleDropdown = () => setIsOpen(!isOpen);

//     return (
//         <div
//             style={{ position: "relative", display: "inline-block" }}
//             ref={dropdownRef}
//         >
//             <motion.div
//                 onClick={toggleDropdown}
//                 style={{ cursor: "pointer" }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 ref={balanceRef}
//             >
//                 <span
//                     className="current"
//                     style={{
//                         color: "white",
//                         fontSize: "clamp(0.8rem, 2.5vw, 1.2rem)",
//                         fontWeight: "bold",
//                         display: "inline-flex",
//                         alignItems: "center",
//                     }}
//                     data-tooltip-id="balance-tooltip"
//                     data-tooltip-content={`Your current balance is ${parseFloat(
//                         balance
//                     ).toFixed(2) === "NaN" ? "0.00" : parseFloat(balance).toFixed(2)
//                 }`}
//                 >
//                     {parseFloat(balance).toFixed(2) === "NaN" ? "0.00" : parseFloat(balance).toFixed(2)}
//                     <motion.span
//                         animate={{ rotate: isOpen ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                         style={{ marginLeft: "5px", fontSize: "0.8em" }}
//                     >
//                         ▼
//                     </motion.span>
//                 </span>
//             </motion.div>
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.2 }}
//                         style={{
//                             position: "absolute",
//                             top: "100%",
//                             left: "50%",
//                             transform: "translateX(-50%)",
//                             backgroundColor: "#2a2a2a",
//                             color: "#fff",
//                             border: "1px solid #444",
//                             borderRadius: "12px",
//                             padding: "15px",
//                             zIndex: 1000,
//                             width: "max-content",
//                             minWidth: "200px",
//                             maxWidth: "90vw",
//                             textAlign: "center",
//                             boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
//                             marginTop: "10px",
//                         }}
//                     >
//                         <h3
//                             style={{
//                                 marginBottom: "15px",
//                                 fontSize: "clamp(1rem, 4vw, 1.2rem)",
//                             }}
//                         >
//                             Your Balance
//                         </h3>
//                         <p
//                             style={{
//                                 fontSize: "clamp(1.2rem, 5vw, 1.5rem)",
//                                 fontWeight: "bold",
//                                 marginBottom: "20px",
//                             }}
//                         >
//                             {parseFloat(balance).toFixed(2) === "NaN" ? "0.00" : parseFloat(balance).toFixed(2)}
//                         </p>
//                         <motion.button
//                             onClick={() => router.push("/deposit")}
//                             style={{
//                                 backgroundColor: "#b89503",
//                                 color: "white",
//                                 border: "none",
//                                 padding:
//                                     "clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)",
//                                 borderRadius: "8px",
//                                 cursor: "pointer",
//                                 fontSize: "clamp(0.8rem, 3vw, 1rem)",
//                                 fontWeight: "bold",
//                                 transition: "all 0.2s ease",
//                                 width: "100%",
//                             }}
//                             whileHover={{
//                                 backgroundColor: "#e8c221",
//                                 scale: 1.05,
//                             }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             Top Up Balance
//                         </motion.button>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//             <Tooltip id="balance-tooltip" place="bottom" effect="solid" />
//         </div>
//     );
// };

// export default BalanceDropdown;

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/router";
import { FaWallet } from "react-icons/fa";

const BalanceDropdown = ({ balance }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const balanceRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const formattedBalance =
        parseFloat(balance).toFixed(2) === "NaN"
            ? "0.00"
            : parseFloat(balance).toFixed(2);

    return (
        <div className="balance-dropdown-container" ref={dropdownRef}>
            <motion.div
                onClick={toggleDropdown}
                className="balance-dropdown-trigger"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                ref={balanceRef}
            >
                <span
                    className="balance-dropdown-balance"
                    data-tooltip-id="balance-tooltip"
                    data-tooltip-content={`Your current balance is ${formattedBalance}`}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <FaWallet style={{ fontSize: "16px" }} className="balance-icon" />
                        <span>{formattedBalance}</span>
                    </div>
                    <motion.span
                        className="balance-dropdown-caret"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        ▼
                    </motion.span>
                </span>
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="balance-dropdown-panel"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h3 className="balance-dropdown-title">Your Balance</h3>
                        <p className="balance-dropdown-amount">
                            <FaWallet style={{ fontSize: "16px" }} />
                            {formattedBalance}
                        </p>
                        <motion.button
                            className="balance-dropdown-button"
                            onClick={() => router.push("/deposit")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Top Up Balance
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
            <Tooltip id="balance-tooltip" place="bottom" effect="solid" />
        </div>
    );
};

export default BalanceDropdown;
