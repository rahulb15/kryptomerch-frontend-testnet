import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import {
    MarmaladeNGClient,
    m_client,
    set_client,
} from "@utils/api/chainweb_marmalade_ng";
import { INSTANCES, DEFAULT_INSTANCE } from "@utils/api/OnChainRefs";
import { clear as idb_clear } from "idb-keyval";

// Initialize default data
const initializeData = () => {
    return { ...DEFAULT_INSTANCE };
};

const useSettings = () => {
    const [data, setData] = useState(initializeData);
    const [isLoading, setIsLoading] = useState(false);
    const [pactError, setPactError] = useState(false);
    const [, setStoredInstance] = useLocalStorage("instance");
    console.log("Stored instance: ", data);

    const setInstance = (key) => {
        console.log("Setting instance to: ", key);
        setData(INSTANCES[key] || { name: "Custom" });
    };

    const updateClient = (newClient) => {
        set_client(newClient);
        console.log("Data updated",data);
        setStoredInstance(data);
        // Place where you might want to trigger revalidation of data
        // e.g., mutate functions from SWR if used elsewhere
    };

    const validate = () => {
        setIsLoading(true);
        const newClient = new MarmaladeNGClient(
            data.name,
            data.node,
            data.network,
            data.chain,
            data.ns,
            data.bridge_ns
        );
        newClient
            .get_modules_hashes()
            .then(() => updateClient(newClient))
            .catch(() => setPactError(true))
            .finally(() => setIsLoading(false));
    };

    const cleanImageCache = () => {
        idb_clear().then(() => {
            // Place where you might want to trigger revalidation of data
            // e.g., mutate functions from SWR if used elsewhere
        });
    };

    useEffect(() => {
        if (m_client) {
            setData(m_client.settings);
            setPactError(false);
            setIsLoading(false);
        }
    }, []);

    return {
        data,
        isLoading,
        pactError,
        setInstance,
        validate,
        cleanImageCache,
    };
};

export default useSettings;
