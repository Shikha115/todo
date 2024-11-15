import axios from "axios";
import { url } from "./url";

export const getProtectedData = async (token) => {
    try {
      const response = await axios.get(url.protectedUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching protected data:', error);
    //   throw error;  // Re-throw error to handle it in the component
    }
  };