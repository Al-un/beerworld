import { generateDelay, isMockApi } from "./utils";

const mockUser = {
  id: "123456",
  name: "Plop",
};

/**
 * Converted from mockUser on https://jwt.io/
 */
const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiUGxvcCIsImlhdCI6MTUxNjIzOTAyMn0.7UAcUx1XZG_dkJIvfZEqCslRhw_Y_9y_Orf8NL5C-p4";

const mockUsersApi = {
  login: async ({ login, password }) => {
    if (login === "plop@plop.com" && password === "plop") {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ accessToken: mockToken }), generateDelay());
      });
    } else {
      return new Promise((_, reject) => {
        setTimeout(() => reject(), generateDelay());
      });
    }
  },

  logout: async (userId) => {
    console.log(`[API] User ${userId} has logged out`);
  },
};

const realUsersApi = {
  login: async ({ login, password }) => {
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
