import User from "../models/User.model.js";
import passport from "passport";

export const signInPage = (req, res) => res.render("auth/signin");

//Procesos
export const logOut = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(error);
    res.redirect("/auth/signin");
  });
};
