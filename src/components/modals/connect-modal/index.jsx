// import PropTypes from "prop-types";
// import Modal from "react-bootstrap/Modal";
// import Image from "next/image";
// import styled, { ThemeProvider } from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import { useWallet } from "src/contexts/WalletContext";

// const lightTheme = {
//     background: "#ffffff",
//     text: "#000000",
//     walletBg: "rgba(0, 0, 0, 0.05)",
//     walletBorder: "rgba(0, 0, 0, 0.1)",
//     modalBg: "#f8f9fa",
// };

// const darkTheme = {
//     background: "#1a1a1a",
//     text: "#ffffff",
//     walletBg: "rgba(255, 255, 255, 0.05)",
//     walletBorder: "rgba(255, 255, 255, 0.1)",
//     modalBg: "#2a2a2a",
// };

// const StyledModal = styled(Modal)`
//     .modal-content {
//         background-color: ${(props) => props.theme.modalBg};
//         border: 0 none;
//         padding: 40px 20px;
//         border-radius: 10px;
//         color: ${(props) => props.theme.text};
//         @media (max-width: 575px) {
//             padding: 20px 15px;
//         }
//     }

//     .btn-close {
//         margin: 0;
//         position: fixed;
//         z-index: 99;
//         right: 30px;
//         top: 30px;
//         background: ${(props) => props.theme.walletBg};
//         opacity: 1;
//         padding: 0;
//         width: 40px;
//         height: 40px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         border-radius: 100%;
//         transition: opacity 0.3s;
//         transition-delay: 0.3s;

//         svg,
//         i {
//             color: ${(props) => props.theme.text};
//             width: 18px;
//             font-size: 18px;
//         }
//     }

//     .modal-header {
//         border: 0 none;
//         justify-content: center;
//         margin-bottom: 10px;
//     }

//     @media (min-width: 576px) {
//         .modal-dialog {
//             max-width: 450px;
//         }
//     }
// `;

// const WalletGrid = styled(motion.div)`
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
//     gap: 15px;
//     padding: 20px;
// `;

// const WalletOption = styled(motion.div)`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 15px;
//     border-radius: 10px;
//     background-color: ${(props) => props.theme.walletBg};
//     cursor: pointer;
//     border: 2px solid transparent;
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
// `;

// const WalletIcon = styled(motion.div)`
//     width: 50px;
//     height: 50px;
//     margin-bottom: 10px;
// `;

// const WalletName = styled(motion.h4)`
//     font-size: 14px;
//     text-align: center;
//     margin: 0;
//     color: ${(props) => props.theme.text};
// `;

// const ThemeToggle = styled.button`
//     position: absolute;
//     top: 10px;
//     left: 10px;
//     background: none;
//     border: none;
//     color: ${(props) => props.theme.text};
//     font-size: 24px;
//     cursor: pointer;
// `;

// const ConnectModal = ({ show, handleModal }) => {
//     const { connectEckoWallet, connectChainweaver, loading } = useWallet();
//     const [isDarkMode, setIsDarkMode] = useState(true);
//     console.log(isDarkMode);
//     const theme = isDarkMode ? darkTheme : lightTheme;

//     const wallets = [
//         { name: "EckoWallet", icon: "/wallet/eckowallet.png" },
//         { name: "Chainweaver", icon: "/wallet/chainweaver.png" },
//         { name: "Koala", icon: "/wallet/koala.svg" },
//         { name: "Wallet Connect", icon: "/wallet/Logo.svg" },
//         { name: "Zelcore", icon: "/wallet/zelcore-logo.svg" },
//     ];

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 24,
//             },
//         },
//     };

//     const handleEckoConnect = async () => {
//         const result = await connectEckoWallet();
//         if (result.status === "success") {
//             // Handle successful connection
//         } else if (result.status === "register") {
//             console.log("Register");
//             // Handle registration
//         } else if (result.status === "2FA") {
//             console.log("2FA");
//             // Handle 2FA
//         } else {
//             console.log("Error");
//             // Handle error
//         }
//     };

//     const handleChainweaverConnect = async () => {
//         const result = await connectChainweaver("k:someaddress");
//         // Handle result...
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <StyledModal show={show} onHide={handleModal} centered size="lg">
//                 <AnimatePresence>
//                     {show && (
//                         <>
//                             {/* <ThemeToggle
//                                 onClick={() => setIsDarkMode(!isDarkMode)}
//                             >
//                                 {isDarkMode ? "☀️" : "🌙"}
//                             </ThemeToggle> */}
//                             <motion.button
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.8 }}
//                                 transition={{ duration: 0.3 }}
//                                 type="button"
//                                 className="btn-close"
//                                 aria-label="Close"
//                                 onClick={handleModal}
//                             >
//                                 <i className="feather-x" />
//                             </motion.button>
//                             <Modal.Body>
//                                 <motion.h3
//                                     initial={{ opacity: 0, y: -20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: 0.2, duration: 0.5 }}
//                                     className="text-center mb-4"
//                                 >
//                                     Connect Your Wallet
//                                 </motion.h3>
//                                 <WalletGrid
//                                     variants={containerVariants}
//                                     initial="hidden"
//                                     animate="visible"
//                                 >
//                                     {wallets.map((wallet) => (
//                                         <WalletOption
//                                             key={wallet.name}
//                                             variants={itemVariants}
//                                             whileHover={{
//                                                 scale: 1.05,
//                                                 boxShadow:
//                                                     "0 10px 20px rgba(0, 0, 0, 0.2)",
//                                                 borderColor: theme.walletBorder,
//                                             }}
//                                             whileTap={{ scale: 0.95 }}
//                                             onClick={
//                                                 wallet.name === "EckoWallet"
//                                                     ? handleEckoConnect
//                                                     : wallet.name ===
//                                                       "Chainweaver"
//                                                     ? () =>
//                                                           handleChainweaverConnect()
//                                                     : () => {}
//                                             }
//                                         >
//                                             <WalletIcon
//                                                 whileHover={{ rotate: 5 }}
//                                                 transition={{
//                                                     type: "spring",
//                                                     stiffness: 300,
//                                                 }}
//                                             >
//                                                 <Image
//                                                     src={wallet.icon}
//                                                     alt={`${wallet.name} icon`}
//                                                     width={50}
//                                                     height={50}
//                                                 />
//                                             </WalletIcon>
//                                             <WalletName>
//                                                 {wallet.name}
//                                             </WalletName>
//                                         </WalletOption>
//                                     ))}


                                



//                                 </WalletGrid>
//                             </Modal.Body>
//                         </>
//                     )}
//                 </AnimatePresence>
//             </StyledModal>
//         </ThemeProvider>
//     );
// };

// ConnectModal.propTypes = {
//     show: PropTypes.bool.isRequired,
//     handleModal: PropTypes.func.isRequired,
//     onWalletConnect: PropTypes.func.isRequired,
// };

// export default ConnectModal;





import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import styled, { ThemeProvider } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useWallet } from "src/contexts/WalletContext";
import { useRouter } from "next/navigation";

const lightTheme = {
    background: "#ffffff",
    text: "#000000",
    walletBg: "rgba(0, 0, 0, 0.05)",
    walletBorder: "rgba(0, 0, 0, 0.1)",
    modalBg: "#f8f9fa",
};

const darkTheme = {
    background: "#1a1a1a",
    text: "#ffffff",
    walletBg: "rgba(255, 255, 255, 0.05)",
    walletBorder: "rgba(255, 255, 255, 0.1)",
    modalBg: "#2a2a2a",
};

const StyledModal = styled(Modal)`
    .modal-content {
        background-color: ${(props) => props.theme.modalBg};
        border: 0 none;
        padding: 40px 20px;
        border-radius: 10px;
        color: ${(props) => props.theme.text};
        @media (max-width: 575px) {
            padding: 20px 15px;
        }
    }

    .btn-close {
        margin: 0;
        position: fixed;
        z-index: 99;
        right: 30px;
        top: 30px;
        background: ${(props) => props.theme.walletBg};
        opacity: 1;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        transition: opacity 0.3s;
        transition-delay: 0.3s;

        svg,
        i {
            color: ${(props) => props.theme.text};
            width: 18px;
            font-size: 18px;
        }
    }

    .modal-header {
        border: 0 none;
        justify-content: center;
        margin-bottom: 10px;
    }

    @media (min-width: 576px) {
        .modal-dialog {
            max-width: 450px;
        }
    }
`;

const WalletGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    padding: 20px;
`;

const WalletOption = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.walletBg};
    cursor: pointer;
    border: 2px solid transparent;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const WalletIcon = styled(motion.div)`
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
`;

const WalletName = styled(motion.h4)`
    font-size: 14px;
    text-align: center;
    margin: 0;
    color: ${(props) => props.theme.text};
`;

const ThemeToggle = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    background: none;
    border: none;
    color: ${(props) => props.theme.text};
    font-size: 24px;
    cursor: pointer;
`;

const MessageContainer = styled(motion.div)`
  text-align: center;
`;

const MessageHeading = styled(motion.h4)`
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
  opacity: 0.8;
`;

const MessageText = styled(motion.p)`
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
  opacity: 0.6;
`;

const LoginButton = styled(motion.button)`
  background-color: ${props => props.theme.text};
  color: ${props => props.theme.background};
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ConnectModal = ({ show, handleModal }) => {
    const { connectEckoWallet, connectChainweaver, loading } = useWallet();
    const [isDarkMode, setIsDarkMode] = useState(true);
    console.log(isDarkMode);
    const theme = isDarkMode ? darkTheme : lightTheme;
    const router = useRouter();

    const wallets = [
        { name: "EckoWallet", icon: "/wallet/eckowallet.png" },
        { name: "Chainweaver", icon: "/wallet/chainweaver.png" },
        { name: "Koala", icon: "/wallet/koala.svg" },
        { name: "Wallet Connect", icon: "/wallet/Logo.svg" },
        { name: "Zelcore", icon: "/wallet/zelcore-logo.svg" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
            },
        },
    };

    const handleEckoConnect = async () => {
        const result = await connectEckoWallet();
        if (result.status === "success") {
            // Handle successful connection
        } else if (result.status === "register") {
            console.log("Register");
            // Handle registration
        } else if (result.status === "2FA") {
            console.log("2FA");
            // Handle 2FA
        } else {
            console.log("Error");
            // Handle error
        }
    };

    const handleChainweaverConnect = async () => {
        const result = await connectChainweaver("k:someaddress");
        // Handle result...
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledModal show={show} onHide={handleModal} centered size="lg">
                <AnimatePresence>
                    {show && (
                        <>
                            {/* <ThemeToggle
                                onClick={() => setIsDarkMode(!isDarkMode)}
                            >
                                {isDarkMode ? "☀️" : "🌙"}
                            </ThemeToggle> */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={handleModal}
                            >
                                <i className="feather-x" />
                            </motion.button>
                            <Modal.Body>
                <MessageContainer
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <MessageHeading>
                    Oops! It seems you're not logged in.
                  </MessageHeading>
                  <MessageText>
                    Please log in to connect your wallet and continue.
                  </MessageText>
                  <LoginButton
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        router.push("/connect");
                    }}
                  >
                    Log In
                  </LoginButton>
                </MessageContainer>
              </Modal.Body>
                        </>
                    )}
                </AnimatePresence>
            </StyledModal>
        </ThemeProvider>
    );
};

ConnectModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    onWalletConnect: PropTypes.func.isRequired,
};

export default ConnectModal;
