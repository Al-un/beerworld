import { LS_ACCESS_TOKEN } from "../constants";

export const logoutUser = () => {
  window.localStorage.removeItem(LS_ACCESS_TOKEN);
};
