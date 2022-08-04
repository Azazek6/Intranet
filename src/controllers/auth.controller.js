const User = require("../models/User.model");
const passport = require("passport");
const authController = {};

authController.signInPage = (req, res) => {
  res.render("auth/signin");
};

//Procesos
authController.logOut = async (req, res, next) => {
  await req.logout((err) => {
    if(err) return next(error);
    res.redirect('/auth/signin');
  });
};

module.exports = authController;
