/* eslint-disable */
"use client";
import PropTypes from "prop-types";
import { ClientContextProvider } from "src/contexts/WalletConnectContext";
import { AccountProvider } from "src/contexts/AccountContext";
import { EckoWalletContextProvider } from "src/contexts/EckoWalletContext";
import { KoalaWalletContextProvider } from "src/contexts/KoalaWalletContext";
import { WalletProvider } from "src/contexts/WalletContext";

export function Providers({ children }) {
    return (
        <ClientContextProvider>
            <EckoWalletContextProvider>
                <KoalaWalletContextProvider>
                    <AccountProvider>
                        <WalletProvider>{children}</WalletProvider>
                    </AccountProvider>
                </KoalaWalletContextProvider>
            </EckoWalletContextProvider>
        </ClientContextProvider>
    );
}

Providers.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Providers;
