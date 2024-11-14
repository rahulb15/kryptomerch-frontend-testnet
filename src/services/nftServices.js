import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

//create nft
const createNFT = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}/nft/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// updateNFT
const updateNFT = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${url}/nft/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// updateNFT
const updateMyNFT = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${url}/nft/updatemynft`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// post updateRevealedNFTs
const updateRevealedNFTs = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}/nft/owned`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const onSale = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${url}/nft/onSale`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const getAllmarketPlaceNfts = async (filters, pageNo, limit) => {
    try {
        const token = localStorage.getItem("token");

        // Construct query parameters
        const params = new URLSearchParams({
            pageNo: pageNo.toString(),
            limit: limit.toString(),
        });

        // Add search parameter if it exists
        if (filters.search) {
            params.append("search", filters.search);
        }

        // Prepare the data object for the POST request
        const data = {};

        // Add onSale and onAuction properties based on the filter
        if (filters.filter === "Fixed Sale") {
            data.onSale = true;
        } else if (filters.filter === "Live Auction") {
            data.onAuction = true;
        }

        const response = await axios.post(
            `${url}nft/marketPlaceNfts?${params.toString()}`,
            data,
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
// //   getOwnSaleNfts: builder.query({
//     query: ({ pageNo, limit, search }) => ({
//         url: "/nft/ownSaleNfts",
//         body: { pageNo, limit, search },
//         method: "POST",
//     }),
// }),

const getOwnSaleNfts = async (data, pageNo, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${url}nft/ownSaleNfts?pageNo=${pageNo}&limit=${limit}&search=${search}`,
            data,
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

const getOwnAuctionNfts = async (data, pageNo, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${url}nft/ownAuctionNfts?pageNo=${pageNo}&limit=${limit}&search=${search}`,
            data,
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
}


const getOwnDutchAuctionNfts = async (data, pageNo, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${url}nft/ownDutchAuctionNfts?pageNo=${pageNo}&limit=${limit}&search=${search}`,
            data,
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
}

const getOwnedPriorityPassNfts = async (data, pageNo, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${url}nft/ownedPriorityPassNfts?pageNo=${pageNo}&limit=${limit}&search=${search}`,
            data,
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
}





// getNftsMyCollectionName paginating post
const getNftsMyCollectionName = async (data, pageNo, limit) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${url}nft/collectionNfts?pageNo=${pageNo}&limit=${limit}`,
            data,
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

const getNftsMyCollectionNameMarket = async (data, pageNo, limit) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${url}nft/collectionNftsMarket?pageNo=${pageNo}&limit=${limit}`,
            data,
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

const placeBid = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}nft/place-bid`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const buyNFT = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}nft/buy`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const getTopCreators = async (body) => {
    try {
        const response = await axios.post(`${url}single-nft/top-creators`, body);
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
};

const getNftByTokenId = async (tokenId) => {
    try {
        const response = await axios.get(`${url}nft/token/${tokenId}`);
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
}


export default {
    createNFT,
    updateNFT,
    updateMyNFT,
    updateRevealedNFTs,
    onSale,
    getAllmarketPlaceNfts,
    getNftsMyCollectionName,
    getNftsMyCollectionNameMarket,
    getOwnSaleNfts,
    getOwnAuctionNfts,
    getOwnDutchAuctionNfts,
    getOwnedPriorityPassNfts,
    placeBid,
    buyNFT,
    getTopCreators,
    getNftByTokenId,
};
