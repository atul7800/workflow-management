import axios from "axios";

const API_BASE = "https://dummy-json.mock.beeceptor.com/posts";

export const fetchWorkFlows = async() => {
    try{
        const response = await axios.get(API_BASE);
        return response.data;
    } catch (error){
        console.log(`Error with ${method.toUpperCase()} request:`, error)
        return null;
    }
}