import { generateDelay, isMockApi } from "./utils";

const mockUser = {
  id: "123456",
  name: "Plop",
};

const mockUsersApi = {
  login: async ({ email, password }) => {
    if (email === "plop@plop.com" && password === "plop") {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockUser), generateDelay());
      });
    }
  },

  logout: async (userId) => {
    console.log(`[API] User ${userId} has logged out`);
  },
};

const realUsersApi = {
  login: async ({ email, password }) => {
    throw new Error("Not implemented");
  },

  logout: async (userId) => {
    throw new Error("Not implemented");
  },
};

let usersApi = mockUsersApi;
if (!isMockApi()) {
  usersApi = realUsersApi;
}

export default usersApi;
