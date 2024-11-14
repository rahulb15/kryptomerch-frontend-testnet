/* eslint-disable */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getBlogList = async (source) => {
    try {
        const response = await axios.get(`${API_URL}blog/getAll/` + source, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const getBlogDetail = async (slug) => {
    console.log("🚀 ~ getBlogDetail ~ slug", slug);
        try {
            const response = await axios.get(
                API_URL + `blog/${slug}`,
            );
            console.log(response, "response");
            return response;
        } catch (error) {
            console.error(error);
        }
    
};



export default {
    getBlogList,
    getBlogDetail,
};
