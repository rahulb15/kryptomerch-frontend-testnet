/* eslint-disable */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getMusics = async () => {
    try {
        const response = await axios.get(API_URL + `music/getMusics`);
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default {
    getMusics,
};
