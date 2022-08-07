import passport from "passport";
import {Strategy as localStrategy} from "passport-local";
import User from "../models/User.model.js";

passport.use(
  new localStrategy(
    {
      usernameField: "username",
    },
    async (username, password, done) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Usuario no encontrado" });
      } else {
        const match = await user.passwordVerify(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "contraseña incorrecta" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});