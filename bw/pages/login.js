import { api } from "./_common";
import "../styles/pages/login.scss";

import { LS_ACCESS_TOKEN } from "../constants";

const loginForm = document.querySelector("#bw-login-form");
const feedbackPlaceholder = document.querySelector("#feedback-placeholder");

/**
 *
 * @param {Event} e
 */
const submitLogin = async (e) => {
  e.preventDefault();

  const login = loginForm.login.value;
  const password = loginForm.password.value;
  feedbackPlaceholder.textContent = "Processing...";

  try {
    const resp = await api.users.login({ login, password });
    feedbackPlaceholder.textContent = "YEAH!";

    window.localStorage.setItem(LS_ACCESS_TOKEN, resp.accessToken);

    const bwApp = document.querySelector("bw-app");
    bwApp.setAttribute("access-token", resp.accessToken);
  } catch (err) {
    console.log("failed!", err);
    feedbackPlaceholder.textContent = "ROH T_T";
  }
};

loginForm.addEventListener("submit", submitLogin);
