import { PrimaryKey } from './aliases';

export interface UserInfo {
  id: PrimaryKey;
  name: string;
}

export interface UserAccessToken {
  accessToken: string;
}

export interface UserCredentials {
  login: string;
  password: string;
}