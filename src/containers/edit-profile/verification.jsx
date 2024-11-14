// import React, { useState } from "react";
// import SumsubWebSdk from "@sumsub/websdk-react";
// import { toast } from "react-toastify";
// import userService from "src/services/user.service";

// const KYCVerification = ({ onVerificationComplete }) => {
//   const [open, setOpen] = useState(false);
//   const [accessToken, setAccessToken] = useState("");

//   const handleKyc = async () => {
//     try {
//       const response = await userService.getAccessToken();
//       if (response?.data?.status === "success") {
//         setAccessToken(response.data.data.token);
//         setOpen(true);
//       } else {
//         toast.error("Failed to get access token. Please try again later.");
//       }
//     } catch (error) {
//       console.error("Error in handleKyc:", error);
//       toast.error("An error occurred. Please try again later.");
//     }
//   };

//   const handleVerificationComplete = async (payload) => {
//     try {
//       const response = await userService.createVerification({ applicantData: payload });
//       console.log("Verification response:", response);
//       if (response?.status === 200 || response?.status === 201) {
//         // onVerificationComplete(true);
//         toast.success("KYC verification completed successfully!");
//       } else {
//         toast.error("Verification failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error in handleVerificationComplete:", error);
//       toast.error("An error occurred during verification. Please try again.");
//     }
//     setOpen(false);
//   };

//   return (
//     <div className="kyc-verification-container">
//       <button
//         className="kyc-verification-start-btn"
//         onClick={handleKyc}
//       >
//         Start KYC Verification
//       </button>

//       {open && (
//         <div className="kyc-verification-modal-overlay">
//           <div className="kyc-verification-modal">
//             <h2 className="kyc-verification-modal-title">KYC Verification</h2>
//             <div className="kyc-verification-modal-content">
//               <SumsubWebSdk
//                 accessToken={accessToken}
//                 expirationHandler={() => Promise.resolve(accessToken)}
//                 config={{
//                   lang: "en",
//                   email: "user@example.com", // Replace with actual user email
//                   phone: "123456789", // Replace with actual user phone
//                   i18n: {
//                     document: {
//                       subTitles: {
//                         IDENTITY: "Upload a document that proves your identity"
//                       }
//                     }
//                   },
//                   onMessage: (type, payload) => {
//                     console.log("WebSDK onMessage", type, payload);
//                   },
//                   onError: (error) => {
//                     console.error("WebSDK onError", error);
//                     toast.error("An error occurred during KYC. Please try again.");
//                   },
//                 }}
//                 options={{ addViewportTag: false, adaptIframeHeight: true }}
//                 onMessage={(type, payload) => {
//                   if (payload.reviewStatus === "completed") {
//                     handleVerificationComplete(payload);
//                   }
//                 }}
//                 onError={(error) => console.error("SumsubWebSdk Error:", error)}
//               />
//             </div>
//             <button
//               className="kyc-verification-modal-close-btn"
//               onClick={() => setOpen(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KYCVerification;



import React, { useState, useCallback, useContext } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { toast } from "react-toastify";
import userService from "src/services/user.service";
import { AccountContext } from "src/contexts/AccountContext";

const KYCVerification = ({ user, setRefresh }) => {
    const { refreshUserData } = useContext(AccountContext);

    const [isOpen, setIsOpen] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [verificationStatus, setVerificationStatus] = useState(user.verified ? "verified" : "idle");

    const handleKyc = useCallback(async () => {
        if (user.verified) {
            return;
        }
        setVerificationStatus("loading");
        try {
            const response = await userService.getAccessToken();
            if (response?.data?.status === "success") {
                setAccessToken(response.data.data.token);
                setIsOpen(true);
                setVerificationStatus("inProgress");
            } else {
                throw new Error("Failed to get access token");
            }
        } catch (error) {
            console.error("Error in handleKyc:", error);
            toast.error("Unable to start KYC verification. Please try again later.");
            setVerificationStatus("error");
        }
    }, [user.verified]);

    const handleVerificationComplete = useCallback(async (payload) => {
        try {
            const response = await userService.createVerification({
                applicantData: payload,
            });
            console.log("Verification response:", response);
            if (response?.status === 200 || response?.status === 201) {
                setVerificationStatus("success");
                toast.success("KYC verification completed successfully!");
                refreshUserData();
                setRefresh(prev => !prev);
            } else {
                throw new Error("Verification failed");
            }
        } catch (error) {
            console.error("Error in handleVerificationComplete:", error);
            toast.error("Verification failed. Please try again.");
            setVerificationStatus("error");
        }
        setIsOpen(false);
    }, [refreshUserData, setRefresh]);

    const renderStatus = () => {
        switch (verificationStatus) {
            case "verified":
                return (
                    <div className="alert alert-success">
                        <h4 className="alert-heading">Verification Completed</h4>
                        <p>Your account is already verified. Thank you for completing the KYC process.</p>
                    </div>
                );
            case "idle":
                return (
                    <div className="alert alert-info">
                        <h4 className="alert-heading">KYC Verification Required</h4>
                        <p>To ensure compliance and security, we need to verify your identity. This process is quick and secure.</p>
                    </div>
                );
            case "loading":
                return (
                    <div className="alert alert-warning">
                        <h4 className="alert-heading">Preparing Verification</h4>
                        <p>We're setting up your KYC verification. This should only take a moment.</p>
                    </div>
                );
            case "inProgress":
                return (
                    <div className="alert alert-primary">
                        <h4 className="alert-heading">Verification in Progress</h4>
                        <p>Please complete the verification process. This helps us maintain a secure platform for all users.</p>
                    </div>
                );
            case "success":
                return (
                    <div className="alert alert-success">
                        <h4 className="alert-heading">Verification Successful</h4>
                        <p>Thank you for completing the KYC verification. Your account is now fully verified.</p>
                    </div>
                );
            case "error":
                return (
                    <div className="alert alert-danger">
                        <h4 className="alert-heading">Verification Failed</h4>
                        <p>We encountered an issue during the verification process. Please try again or contact support if the problem persists.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="kyc-verification-container">
            {renderStatus()}

            <button
                className="btn btn-primary"
                onClick={handleKyc}
                disabled={user.verified || verificationStatus === "loading" || verificationStatus === "inProgress"}
            >
                {user.verified
                    ? "Verification Completed"
                    : verificationStatus === "idle"
                    ? "Start KYC Verification"
                    : "Continue Verification"}
            </button>

            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2 className="modal-title">KYC Verification</h2>
                        <div className="kyc-verification-modal-content">
                            <SumsubWebSdk
                                accessToken={accessToken}
                                expirationHandler={() => Promise.resolve(accessToken)}
                                config={{
                                    lang: "en",
                                    email: user.email,
                                    phone: user.phone, // Assuming phone is in the user object
                                    i18n: {
                                        document: {
                                            subTitles: {
                                                IDENTITY: "Upload a document that proves your identity",
                                            },
                                        },
                                    },
                                    onMessage: (type, payload) => {
                                        console.log("WebSDK onMessage", type, payload);
                                    },
                                    onError: (error) => {
                                        console.error("WebSDK onError", error);
                                        toast.error("An error occurred during KYC. Please try again.");
                                    },
                                }}
                                options={{ addViewportTag: false, adaptIframeHeight: true }}
                                onMessage={(type, payload) => {
                                    if (payload.reviewStatus === "completed") {
                                        handleVerificationComplete(payload);
                                    }
                                }}
                                onError={(error) => {
                                    console.error("SumsubWebSdk Error:", error);
                                    setVerificationStatus("error");
                                }}
                            />
                        </div>
                        <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KYCVerification;