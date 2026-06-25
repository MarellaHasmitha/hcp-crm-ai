import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export async function deleteInteractionById(id) {
  const response = await axios.delete(
    `${API_BASE_URL}/api/interactions/${id}`
  );

  return response.data;
}