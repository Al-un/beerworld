const API_ROOT_URL = process.env.VUE_APP_API_ROOT_URL || `http://localhost:3000`;

/**
 * Get the beers list from API
 */
export const getBeers = async () => {
  const resp = await fetch(`${API_ROOT_URL}`);
  const data = await resp.json();
  return data;
};
