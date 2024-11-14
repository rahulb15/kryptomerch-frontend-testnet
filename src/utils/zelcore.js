import { mkReq, parseRes } from "./api/utils";

const cmd = {
    asset: "kadena",
};

const getAccounts = async () => {
    try {
        const res = await fetch(
            process.env.NEXT_PUBLIC_ZELCORE_URL,
            mkReq(cmd)
        );
        const pRes = await parseRes(res);
        return pRes;
    } catch (e) {
        return -1;
    }
};

const openZelcore = () => window.open("zel:", "_self");

export { getAccounts, openZelcore };
