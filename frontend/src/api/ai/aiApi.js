import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function extractAIData(message) {

  const response = await axios.post(
    `${API_BASE_URL}/api/ai/extract`,
    {
      message,
    }
  );

  return response.data;
}