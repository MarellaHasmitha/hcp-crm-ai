import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function extractAIData(message) {

  const response = await axios.post(
    `${API_BASE_URL}/api/ai/extract`,
    {
      message,
    }
  );

  return response.data;
}