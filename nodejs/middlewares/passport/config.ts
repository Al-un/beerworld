import passport from "passport";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
  JwtFromRequestFunction,
  VerifiedCallback,
  VerifyCallbackWithRequest,
} from "passport-jwt";

const jwtPublicSecret = "my-super-public-secret";

const cookieExtractor: JwtFromRequestFunction = (req) => {
  let token = null;
  if (req && (req as any).cookies.jwt) {
    token = (req as any).cookies.jwt;
  }

  return token;
};

const options: StrategyOptions = {
  secretOrKey: jwtPublicSecret,
  algorithms: ["RS256"],
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor,
  ]),
};

const strategyCb: VerifyCallbackWithRequest = (req, payload, done) => {
  if ((payload.id = "plop")) {
    done(null, { username: "plop" });
  } else {
    done(null, false);
  }
};

passport.use(new JwtStrategy(options, strategyCb));

export default passport;
