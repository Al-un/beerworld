import { LS_ACCESS_TOKEN } from '@bw/constants/';
import { UserInfo } from '@bw/types';

export const logoutUser = () => {
  window.localStorage.removeItem(LS_ACCESS_TOKEN);
};

export const decodeAccessToken = (token: string): UserInfo => {
  const match = token.match(/\.(.*)\./);
  if (match !== null) {
    const userInfo = JSON.parse(window.atob(match[1]));
    return userInfo;
  }
  throw new Error(`Token ${token} is invalid!`);
};
