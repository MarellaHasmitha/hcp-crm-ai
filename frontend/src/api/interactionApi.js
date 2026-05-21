import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function saveInteraction(interactionData) {
  const response = await axios.post(
    `${API_BASE_URL}/api/interactions/log`,
    interactionData
  );

  return response.data;
}

export async function getInteractions() {
  const response = await axios.get(
    `${API_BASE_URL}/api/interactions`
  );

  return response.data;
}