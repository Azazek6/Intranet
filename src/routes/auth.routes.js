import passport from "passport";
import { Router } from "express";
import { signInPage, logOut } from "../controllers/auth.controller.js";
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

export default router;
