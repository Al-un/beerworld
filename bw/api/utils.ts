interface WindowWithEnv extends Window {
  BW_ENV: { API_BASE_URL: string };
}
/**
 * Check if current build/run is running against a real API
 */
export const isMockApi = (): boolean =>
  !((window as unknown) as WindowWithEnv).BW_ENV.API_BASE_URL;

/**
 * Generate the response delay for mock API.
 */
export const generateDelay = (): number => 1500;
