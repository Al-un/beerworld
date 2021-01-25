import { Strategy as LocalStrategy, IStrategyOptionsWithRequest } from "passport-local";
import passport from "passport";

const options: IStrategyOptionsWithRequest = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

passport.use(
  "login",
  new LocalStrategy(options, async (req, username, password, cb) => {
    if (username === "plop" && password === "plop") {
      cb(null, {}, { message: "Logged In Successfully" });
    } else {
      cb(null, false, { message: "Wrong credentials" });
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(options, async (req, username, password, cb) => {
    if (username === "pouet" && password === "pouet") {
      cb(null, {}, { message: "Signed up Successfully" });
    } else {
      cb(null, false, { message: "Wrong credentials" });
    }
  })
);
