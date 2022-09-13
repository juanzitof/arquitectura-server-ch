import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;
import User from "../schema/user.schema.js";
import { logger } from "../utils/winston/index.js";

const customFields = {
	usernameField: "email",
	passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
	try {
		const user = await User.findOne({ email });
		if (!user) {
			logger.log("error", "Usuario no encontrado");
			return done(null, false);
		}

		const isValid = await bcrypt.compare(password, user.password);

		if (isValid) {
			logger.log("info", "password validado");
			return done(null, user);
		} else {
			logger.log("error", "password invalido");
			return done(null, false);
		}
	} catch (err) {
		done(err);
	}
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use("login", strategy);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((userId, done) => {
	User.findById(userId)
		.then((user) => {
			done(null, user);
		})
		.catch((err) => done(err));
});