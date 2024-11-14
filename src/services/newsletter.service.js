// services/newsletter.service.js
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const newsletterService = {
  subscribe: async (email) => {
    try {
      const response = await axios.post(`${API_URL}newsletter/subscribe`, { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.description || 'Subscription failed');
    }
  },

  unsubscribe: async (email) => {
    try {
      const response = await axios.post(`${API_URL}newsletter/unsubscribe`, { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.description || 'Unsubscribe failed');
    }
  },

  updatePreferences: async (email, preferences) => {
    try {
      const response = await axios.put(`${API_URL}newsletter/preferences`, { 
        email, 
        preferences 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.description || 'Update failed');
    }
  }
};

export default newsletterService;
