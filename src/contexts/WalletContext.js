import React, { createContext, useContext, useState } from 'react';
import userService from "src/services/user.service";
import { toast } from "react-toastify";
import { useAccountContext } from "src/contexts";
import { useEckoWallletClient } from "src/contexts/EckoWalletContext";
import { useKoalaWallletClient } from "src/contexts/KoalaWalletContext";
import { useWalletConnectClient } from "src/contexts/WalletConnectContext";
const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [walletName, setWalletName] = useState('');
  const [loading, setLoading] = useState(false);
  const { connect, accounts } = useWalletConnectClient();
  const { eckoWalletConnect } = useEckoWallletClient();
  const { koalaWalletConnect } = useKoalaWallletClient();
  const account = useAccountContext();

  const checkUser = async (kaddress) => {
    const user = await userService.getUser(kaddress.length > 0 ? kaddress : "null");
    console.log(user);
    
    if (user?.data?.status === "success") {
      setWalletAddress(kaddress);
      
      if (user?.data?.data === null) {
        return { status: 'register' };
      }

      if (user?.data?.data?.is2FAEnabled) {
        return { status: '2FA' };
      }

      localStorage.setItem("token", user.data.token);
      return { status: 'success', data: user.data.data };
    } else {
      toast.error("Something went wrong");
      return { status: 'error' };
    }
  };

  const connectEckoWallet = async () => {
    setWalletName("Ecko Wallet");
    setLoading(true);
    try {
      const response = await eckoWalletConnect(); // You'll need to import this function
      console.log(response);
      if (response?.status === "success") {
        toast.success("Ecko Wallet Connected Successfully");
        const result = await checkUser(response.account.account);
        setLoading(false);
        return result;
      } else {
        toast.error(response.message);
        setLoading(false);
        return { status: 'error' };
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      return { status: 'error' };
    }
  };

  const connectChainweaver = async (address) => {
    setWalletName("Chainweaver");
    if (address.length > 0 && address.includes("k:")) {
      const response = await account.setVerifiedAccount(address); // You'll need to import this function
      if (response?.status === "success") {
        toast.success("Chainweaver Connected Successfully");
        return await checkUser(response.data.account);
      }
    } else {
      toast.error("Please enter a valid wallet address");
      return { status: 'error' };
    }
  };

  // Add more wallet connection methods here...

  return (
    <WalletContext.Provider value={{
      walletAddress,
      walletName,
      loading,
      connectEckoWallet,
      connectChainweaver,
      // Add more methods here...
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);