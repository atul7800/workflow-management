import axios from "axios";

const API_BASE = "https://dummy-json.mock.beeceptor.com/posts";

export const fetchWorkFlows = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.log(`Error with ${method.toUpperCase()} request:`, error);
    return null;
  }
};

export const executeWorkflow = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const executeWorkFlow = Math.round(Math.random());
      resolve(executeWorkFlow ? "Passed" : "Failed");
    }, 5000);
  });
};
