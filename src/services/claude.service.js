/* eslint-disable */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const clauderequest = async (body) => {
    try {
        const response = await axios.post(API_URL + "claude", body);
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

const chat = async (body) => {
    try {
        const response = await axios.post(API_URL + "claude/chat", body);
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};


export default {
    clauderequest,
    chat,
};
