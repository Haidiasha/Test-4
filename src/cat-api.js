import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Hfe0dJ9fDYFVu4Rdhg6F5aqabnUWghAFORAvuiJs9JFYGDMTxQ2PmwO8mz1SVyq7';

const BASE_URL = 'https://api.thecatapi.com/v1';

export async function fetchBreeds() {
  const response = await axios.get(`${BASE_URL}/breeds`);
  return response.data;
}

export async function fetchCatByBreed(breedId) {
  const response = await axios.get(
    `${BASE_URL}/images/search?breed_ids=${breedId}`
  );
  return response.data;
}
