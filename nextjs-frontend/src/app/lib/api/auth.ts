import axios from "axios";
import { BASE_URL } from "../constants/constant";

export const login = async (email: string, password: string) => {
    const requestBody = {
        email, password
    }
    try {
        const response = await axios.post(`${BASE_URL}/login`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response.data);
        return response.data

    } catch (error: any) {
        console.error('Error signing up:', error.message);
    }
}

export const signup = async (email: string, password: string) => {
    try {
        // Example API endpoint for signup
        const requestBody = {
            email, password
        }
        const response = await axios.post(`${BASE_URL}/signup`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response
    } catch (error: any) {
        console.error('Error signing up:', error.message);
    }
}

export const searchApi = async (searchTerm:string) =>{
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
          params: {
            job_name: searchTerm,
          },
        });
        const data = response.data;
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
}