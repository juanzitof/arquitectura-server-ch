import { Router } from "express";
import passport from "passport";
import isRegistered from "../utils/isRegistered.js";
import multer from "../utils/multer.js";
import { isAuth, isNotAuth } from "../utils/auth.js";
import {
	login,
	loginError,
	logout,
	profile,
	signUp,
	signupGet,
} from "../controllers/user.controller.js";

const userRouter = Router();

// ------ Register ------

userRouter.post("/signup", multer.single("photo"), isRegistered, signUp);
userRouter.post(
	"/login",
	passport.authenticate("login", {
		failureRedirect: "/login-error",
		successRedirect: "/",
	})
);

// ------ Login ------

userRouter.get("/signup", isNotAuth, signupGet);

userRouter.get("/login", isNotAuth, login);

userRouter.get("/profile", isAuth, profile);

userRouter.get("/login-error", isNotAuth, loginError);

userRouter.get("/logout", logout);

export default userRouter;