/* eslint-disable */

"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { NETWORKID } from "src/constants/contextConstants";

/** * Types */
const IContext = {
    koalaWalletConnect: () => {},
    koalaSuccessWalletAddress: "",
    koalaAccounts: [],
};

/** * Context */
export const ClientContext = createContext(IContext);

/** * Provider */
export function KoalaWalletContextProvider({ children }) {
    const [koalaSuccessWalletAddress, setKoalaSuccessWalletAddress] =
        useState("");
    const [koalaAccounts, setKoalaAccounts] = useState([]);

    const koalaWalletConnect = async () => {
        const response = await window.koala.request({
            method: "kda_connect",
            networkId: NETWORKID,
        });
        if (response?.status === "success") {
            setKoalaSuccessWalletAddress(response.wallet.account);
            return response;
        } else {
            console.log("error");
        }
    };

    const value = useMemo(
        () => ({
            koalaWalletConnect,
            koalaSuccessWalletAddress,
            koalaAccounts,
        }),
        []
    );

    return (
        <ClientContext.Provider value={{ ...value }}>
            {children}
        </ClientContext.Provider>
    );
}

export function useKoalaWallletClient() {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error(
            "useKoalaWalletClient must be used within a KoalaContextProvider"
        );
    }
    return context;
}
