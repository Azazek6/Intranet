const passport = require("passport");
const { Router } = require("express");
const { signInPage, logOut } = require("../controllers/auth.controller");
const router = Router();

router.get("/signin", signInPage);

//Procesos
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/signin",
    failureFlash: true,
  })
);

router.get("/logout", logOut);

module.exports = router;
