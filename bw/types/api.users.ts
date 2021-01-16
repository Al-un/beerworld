import { PrimaryKey } from './aliases';
import { UserAccessToken, UserCredentials } from './data.users';

export interface UserAPI {
  login: (userCredentials: UserCredentials) => Promise<UserAccessToken>;
  logout: (userId: PrimaryKey) => Promise<void>;
}
