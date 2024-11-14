import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

//create nft
const createSingleNFT = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}/single-nft`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// getCreatedSingleNfts(pageNo, limit, search);
const getCreatedSingleNfts = async (pageNo, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${url}single-nft/getAll`,
            {
                page: pageNo,
                limit: limit,
                search: search,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// getCreatedSingleNfts(pageNo, limit, search);
const getCreatedSingleNftsMarketPlace = async (pageNo, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${url}single-nft/getAllMarketPlace`,
            {
                page: pageNo,
                limit: limit,
                search: search,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


// update
const updateSingleNFT = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${url}single-nft`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};



export default {
    createSingleNFT,
    getCreatedSingleNfts,
    getCreatedSingleNftsMarketPlace,
    updateSingleNFT,
};
