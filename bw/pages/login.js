import "../layouts";
import "../styles/pages/login.scss";

import { buildUserLoginForm } from "../components";
import { APP_CONTENT } from "../utils";

const onInit = () => {
  const loginForm = buildUserLoginForm();
  APP_CONTENT.appendChild(loginForm);
};

onInit();
