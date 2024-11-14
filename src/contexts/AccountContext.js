// /* eslint-disable */
// "use client";
// import Pact from "pact-lang-api";
// import { createContext, useEffect, useState } from "react";
// import {
//     CHAIN_ID,
//     GAS_PRICE,
//     NETWORK,
//     creationTime,
// } from "../constants/contextConstants";
// import userService from "src/services/user.service";

// export const AccountContext = createContext();
// export const AccountProvider = (props) => {
//     const [fetchAccountBalance, setFetchAccountBalance] = useState(false);
//     const [localRes, setLocalRes] = useState(null);
//     const [walletAddressContect, setWalletAddressContect] = useState("");
//     const [user, setUser] = useState({});

//     const checkUser = async (token) => {
//         try {
//             const response = await userService.checkUser(token);
//             return response;
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const initializeUser = async () => {
//         const token = localStorage.getItem("token");
//         console.log("token", token);

//         if (token?.length > 0) {
//             const response = await checkUser(token);
//             console.log("response", response);
//             if (response?.data?.status === "failed") {
//                 console.log("failed");
//                 logoutWalletConnect();
//             }
//             if (response?.data?.status === "success") {
//                 console.log("success");
//                 setWalletAddressContect(response.data.data.walletAddress);
//                 setUser(response.data.data);
//             }
//         }
//     };

//     const authWalletConnect = async (walletAddress) => {
//         setWalletAddressContect(walletAddress);
//         localStorage.setItem("walletAddress", walletAddress);
//         initializeUser();
//     };

//     const clearCookie = (cookieName) => {
//         document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//     };

//     const logoutWalletConnect = async () => {
//         clearCookie("connect.sid");
//         sessionStorage.clear();
//         setWalletAddressContect("");
//         localStorage.removeItem("walletAddress");
//         localStorage.removeItem("token");
//     };

//     // useEffect to check if local storage has wallet address
//     useEffect(() => {
//         initializeUser();
//     }, []);

//     const setVerifiedAccount = async (accountName) => {
//         try {
//             let data = await Pact.fetch.local(
//                 {
//                     pactCode: `(coin.details ${JSON.stringify(accountName)})`,
//                     meta: Pact.lang.mkMeta(
//                         "",
//                         CHAIN_ID,
//                         GAS_PRICE,
//                         3000,
//                         creationTime(),
//                         600
//                     ),
//                 },
//                 NETWORK
//             );
//             if (data.result.status === "success") {
//                 setLocalRes(data.result.data);
//                 return data.result;
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     const contextValues = {
//         setFetchAccountBalance,
//         setLocalRes,
//         setVerifiedAccount,
//         walletAddressContect,
//         authWalletConnect,
//         fetchAccountBalance,
//         localRes,
//         logoutWalletConnect,
//         user,
//     };

//     return (
//         <AccountContext.Provider value={contextValues}>
//             {props.children}
//         </AccountContext.Provider>
//     );
// };

// export const AccountConsumer = AccountContext.Consumer;



"use client";
import Pact from "pact-lang-api";
import { createContext, useEffect, useState, useCallback } from "react";
import {
    CHAIN_ID,
    GAS_PRICE,
    NETWORK,
    creationTime,
} from "../constants/contextConstants";
import userService from "src/services/user.service";

export const AccountContext = createContext();

export const AccountProvider = (props) => {
    const [fetchAccountBalance, setFetchAccountBalance] = useState(false);
    const [localRes, setLocalRes] = useState(null);
    const [walletAddressContect, setWalletAddressContect] = useState("");
    const [user, setUser] = useState({});

    const checkUser = async (token) => {
        try {
            const response = await userService.checkUser(token);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const initializeUser = async () => {
        const token = localStorage.getItem("token");
        console.log("token", token);

        if (token?.length > 0) {
            const response = await checkUser(token);
            console.log("response", response);
            if (response?.data?.status === "failed") {
                console.log("failed");
                logoutWalletConnect();
            }
            if (response?.data?.status === "success") {
                console.log("success");
                setWalletAddressContect(response?.data?.data?.walletAddress);
                setUser(response?.data?.data);
            }
        }
    };

    const refreshUserData = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (token?.length > 0) {
            const response = await checkUser(token);
            if (response?.data?.status === "success") {
                setUser(response.data.data);
            }
        }
    }, []);

    const authWalletConnect = async (walletAddress) => {
        setWalletAddressContect(walletAddress);
        localStorage.setItem("walletAddress", walletAddress);
        initializeUser();
    };

    const clearCookie = (cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const logoutWalletConnect = async () => {
        console.log("logoutWalletConnect");
        clearCookie("connect.sid");
        sessionStorage.clear();
        setWalletAddressContect("");
        setUser({});  // Clear user data
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("token");
        localStorage.removeItem("accountType");  // Remove accountType as well
    };

    useEffect(() => {
        initializeUser();
    }, []);

    const setVerifiedAccount = async (accountName) => {
        try {
            let data = await Pact.fetch.local(
                {
                    pactCode: `(coin.details ${JSON.stringify(accountName)})`,
                    meta: Pact.lang.mkMeta(
                        "",
                        CHAIN_ID,
                        GAS_PRICE,
                        3000,
                        creationTime(),
                        600
                    ),
                },
                NETWORK
            );
            if (data.result.status === "success") {
                setLocalRes(data.result.data);
                return data.result;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const contextValues = {
        setFetchAccountBalance,
        setLocalRes,
        setVerifiedAccount,
        walletAddressContect,
        authWalletConnect,
        fetchAccountBalance,
        localRes,
        logoutWalletConnect,
        user,
        refreshUserData,
    };

    return (
        <AccountContext.Provider value={contextValues}>
            {props.children}
        </AccountContext.Provider>
    );
};

export const AccountConsumer = AccountContext.Consumer;
