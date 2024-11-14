/* eslint-disable */

"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { NETWORKID } from "src/constants/contextConstants";

/** * Types */
const IContext = {
    eckoWalletConnect: () => {},
    eckoSuccessWalletAddress: "",
    eckoAccounts: [],
};

/** * Context */
export const ClientContext = createContext(IContext);

/** * Provider */
export function EckoWalletContextProvider({ children }) {
    const [eckoSuccessWalletAddress, setEckoSuccessWalletAddress] =
        useState("");
    const [eckoAccounts, setEckoAccounts] = useState([]);

    const eckoWalletConnect = async () => {
        const checkNetwork = await window.kadena.request({
            method: "kda_getNetwork",
        });
        if (
            (checkNetwork?.name === "Testnet" && NETWORKID === "testnet04") ||
            (checkNetwork?.name === "Mainnet" && NETWORKID === "mainnet01")
        ) {
            const response = await window.kadena.request({
                method: "kda_connect",
                networkId: NETWORKID,
            });
            if (response?.status === "success") {
                const account = await window.kadena.request({
                    method: "kda_checkStatus",
                    networkId: NETWORKID,
                });
                if (account?.status === "success") {
                    setEckoSuccessWalletAddress(response.account.account);
                    return response;
                }
            } else {
                // Handle error case
            }
        } else {
            if (NETWORKID === "testnet04") {
                // alert("Please connect to Testnet");
                return {
                    status: "error",
                    message: "Please connect to Testnet",
                };
            } else {
                // alert("Please connect to Mainnet");
                return {
                    status: "error",
                    message: "Please connect to Mainnet",
                };
            }
        }
    };

    const value = useMemo(
        () => ({ eckoWalletConnect, eckoSuccessWalletAddress, eckoAccounts }),
        []
    );

    return (
        <ClientContext.Provider value={{ ...value }}>
            {children}
        </ClientContext.Provider>
    );
}

export function useEckoWallletClient() {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error(
            "useEckoWalletClient must be used within a EckoContextProvider"
        );
    }
    return context;
}
