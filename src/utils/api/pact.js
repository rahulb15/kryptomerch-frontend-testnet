/* eslint-disable */
import Pact from "pact-lang-api";
import {
    CHAIN_ID,
    creationTime,
    GAS_PRICE,
    NETWORK,
} from "../../constants/contextConstants";

export const getBalance = async (account) => {
    try {
        console.log(account);
        let data = await Pact.fetch.local(
            {
                pactCode: `(free.testy.get-balance ${JSON.stringify(account)})`,
                meta: Pact.lang.mkMeta(
                    "",
                    CHAIN_ID,
                    GAS_PRICE,
                    150000,
                    creationTime(),
                    600
                ),
            },
            NETWORK
        );
        console.log(data);
        if (data.result.status === "success") {
            return data.result.data;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
    }
};
