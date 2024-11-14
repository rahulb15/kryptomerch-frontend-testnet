/* eslint-disable */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getAllCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}support/categories`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

const getCategoryBySlug = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}support/category/${slug}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

const getArticleDetail = async (categorySlug, articleSlug) => {
    try {
        const response = await axios.get(
            `${API_URL}support/category/${categorySlug}/${articleSlug}`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

// Admin endpoints that require authentication
const createCategory = async (formData) => {
    try {
        const response = await axios.post(
            `${API_URL}support/category`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

const createArticle = async (articleData) => {
    try {
        const response = await axios.post(
            `${API_URL}support/article`,
            articleData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

const updateArticle = async (articleData) => {
    try {
        const response = await axios.put(
            `${API_URL}support/article`,
            articleData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

const getArticleFeedback = async (categorySlug, articleSlug, feedback) => {
    try {
        const response = await axios.post(
            `${API_URL}support/feedback`,
            {
                categorySlug,
                articleSlug,
                isHelpful: feedback
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default {
    getAllCategories,
    getCategoryBySlug,
    getArticleDetail,
    createCategory,
    createArticle,
    updateArticle,
    getArticleFeedback,
};