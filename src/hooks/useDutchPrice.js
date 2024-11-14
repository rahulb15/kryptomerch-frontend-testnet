import { useState, useEffect, useCallback } from 'react';
import { createClient, Pact } from "@kadena/client";
import { NETWORKID, CHAIN_ID, NETWORK } from 'src/constants/contextConstants';
import marketplacePactFunctions from '@utils/pactMarketplaceFunctions';

console.log("NETWORKID", NETWORKID);
console.log("CHAIN_ID", CHAIN_ID);
console.log("NETWORK", NETWORK);

const client = createClient(NETWORK);

export const useDutchPrice = (saleId, saleType) => {
  console.log("useDutchPrice hook called with:", { saleId, saleType });
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrice = useCallback(async () => {
    console.log("fetchPrice function called");
    console.log("Current saleId:", saleId);
    console.log("Current saleType:", saleType);
    
    if (saleType !== "d" || !saleId) {
      console.log("Skipping price fetch. Reason:", saleType !== "d" ? "Not a Dutch auction" : "No saleId");
      return;
    }

    console.log("Fetching Dutch auction price for saleId:", saleId);

    setIsLoading(true);
    setError(null);

    try {
      // const pactCode = `(n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-dutch-auction-sale.compute-price "${saleId}")`;
      const pactCode = `${marketplacePactFunctions.marmaladePolicyDutchAuctionSaleComputePrice} "${saleId}"`;
      
      const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

      console.log("Sending transaction:", transaction);

      const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
      });

      console.log("Dutch auction price response:", response);

      if (response.result.status === "success") {
        console.log("Setting price to:", response.result.data);
        setPrice(response.result.data);
      } else {
        throw new Error(response.result.error.message || "Failed to fetch price");
      }
    } catch (err) {
      console.error("Error fetching Dutch auction price:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [saleId, saleType]);

  useEffect(() => {
    console.log("useEffect running in useDutchPrice");
    fetchPrice();
  }, [fetchPrice]);

  return { price, error, isLoading, refetch: fetchPrice };
};