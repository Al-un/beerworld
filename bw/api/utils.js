/**
 * Check if current build/run is running against a real API
 */
export const isMockApi = () => !window.BW_ENV.API_BASE_URL;

/**
 * Generate the response delay for mock API.
 */
export const generateDelay = () => 1500;
