/* eslint-disable */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;


// launch-collection
const launchCollection = async (body) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + "launch-collection/create",
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

//update collection
const updateCollection = async (body,name) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
            API_URL + "launch-collection/update/"+name,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};



const getCollection = async (walletAddress) => {
    try {
        const response = await axios.get(
            API_URL + `collection/check-collection/${walletAddress}`
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};


// createCheckoutSession
const createCheckoutSession = async (body) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + "transaction",
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

// checkTransaction
const checkTransaction = async (session_id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            API_URL + "transaction/checkTransaction/" + session_id,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};


//uploadImage
const uploadImage = async (formData,name) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + "launch-collection/upload-image/"+name,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

//uploadImage
const uploadImageById = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + "launch-collection/upload-image-data-ipfs",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};


//get all collections
const getAllCollections = async () => {
    try {
        const response = await axios.get(
            API_URL + "collection"
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

// getAllLaunched      const { page, limit, search } = req.query;

const getAllLaunched = async (page, limit, search) => {
    console.log(page, limit, search);
    try {
        // const response = await axios.get(
        //     API_URL + `launch-collection/getAllLaunched?page=${page}&limit=${limit}&search=${search}`
        // );
        // console.log(response, "response");
        // return response;

        // post request
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + `launch-collection/getAllLaunched`,
            { page, limit, search },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");

        return response;



    } catch (error) {
        console.error(error);
    }
}

const getLiveCollections = async (page, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + `launch-collection/getLiveCollections`,
            { page, limit, search },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
}

const getUpcomingCollections = async (page, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + `launch-collection/getUpcomingCollections`,
            { page, limit, search },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
}

const getEndedCollections = async (page, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + `launch-collection/getEndedCollections`,
            { page, limit, search },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
}





const getAllMarketplaceCollections = async (page, limit, search, timeRange) => {
    console.log(page, limit, search);
    try {
        // const response = await axios.get(
        //     API_URL + `launch-collection/getAllLaunched?page=${page}&limit=${limit}&search=${search}`
        // );
        // console.log(response, "response");
        // return response;

        // post request
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + `collection/getAll`,
            { page, limit, search,timeRange },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");

        return response;



    } catch (error) {
        console.error(error);
    }
}

const getAllCollectionMarketplace = async (page, limit, search) => {
    console.log(page, limit, search);
    try {
        // const response = await axios.get(
        //     API_URL + `launch-collection/getAllLaunched?page=${page}&limit=${limit}&search=${search}`
        // );
        // console.log(response, "response");
        // return response;

        // post request
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + `collection/getAllCollection`,
            { page, limit, search },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");

        return response;



    } catch (error) {
        console.error(error);
    }
}

//get collection by name
const getCollectionByName = async (name) => {
    console.log(name)
    try {
        const response = await axios.get(
            API_URL + "collection/"+name
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

//get collection by name
const getLaunchCollectionByName = async (name) => {
    console.log(name)
    try {
        const response = await axios.get(
            API_URL + "launch-collection/"+name
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

//getAllDeposits
const getAllDeposits = async (page, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + `transaction/getAllDeposits`,
            { page, limit, search },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
}

// getCreatedCollections                     const response = await collectionService.getCreatedCollections(account.user.walletAddress, pageNo, limit, search);

const getCreatedCollections = async ( page, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + `launch-collection/getCreatedCollections`,
            { page, limit, search },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
}

const getCreatedCollectionsMarketPlace = async ( page, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + `launch-collection/getCreatedCollectionsMarketPlace`,
            { page, limit, search },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
}


// getCollectionsAllCategory
// http://localhost:5000/api/v1/launch-collection/category-wise  POST
const getCollectionsAllCategory = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + `launch-collection/category-wise`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
}


// getPrioritizedCollections
const getPrioritizedCollections = async (limit = 5) => {
    try {
        const token = localStorage.getItem("token");
        // const response = await axios.get(
        //     `${API_URL}launch-collection/prioritized?limit=${limit}`,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     }
        // );

        //post api
        const response = await axios.post(
            `${API_URL}launch-collection/prioritized`,
            { limit },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        console.log("Prioritized collections response:", response);
        return response;
    } catch (error) {
        console.error("Error fetching prioritized collections:", error);
        throw error;
    }
}


const applyForStage = async (collectionName, stage) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${API_URL}stage-application/apply`,
            {
                collectionName,
                stage
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error(`Error applying for ${stage}:`, error);
        throw error;
    }
};

const getApplicationStatus = async (collectionName, stage) => {
    try {
        const token = localStorage.getItem("token");
        // const response = await axios.get(
        //     `${API_URL}stage-application/status`,
        //     {
        //         params: {
        //             collectionName,
        //             stage
        //         },
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     }
        const response = await axios.post(
            `${API_URL}stage-application/status`,
            {
                collectionName,
                stage
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }



        );
        return response;
    } catch (error) {
        console.error(`Error getting application status for ${stage}:`, error);
        throw error;
    }
};





export default {
    launchCollection,
    updateCollection,
    getCollection,
    createCheckoutSession,
    checkTransaction,
    uploadImage,
    uploadImageById,
    getAllCollections,
    getCollectionByName,
    getLaunchCollectionByName,
    getAllLaunched,
    getAllDeposits,
    getAllMarketplaceCollections,
    getCreatedCollections,
    getAllCollectionMarketplace,
    getCollectionsAllCategory,
    getCreatedCollectionsMarketPlace,
    getPrioritizedCollections,
    getLiveCollections,
    getUpcomingCollections,
    getEndedCollections,
    applyForStage,
    getApplicationStatus,
};
