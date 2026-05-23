import axios from "axios";

const API_BASE_URL ="https://ai-crm-backend-xjsq.onrender.com";

export async function extractAIData(message) {

  const response = await axios.post(
    `${API_BASE_URL}/api/ai/extract`,
    {
      message,
    }
  );

  return response.data;
}