import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { config } from "../config/index.js";
import cartSchema from "./carts.schema.js";
import { logger } from "../utils/winston/index.js";
import { encryptPassword } from "../services/user.services.js";

const { model } = mongoose;
mongoose.connect(`${config.mongodb.url}`);

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, min: 4, trim: true, lowercase: true },
	password: { type: String, required: true, max: 100, min: 6, trim: true },
	name: { type: String, require: true, trim: true },
	phone: { type: String, require: true, min: 11, max: 15, trim: true },
	birthDate: { type: Date, require: true },
	address: { type: String, require: true, min: 3, trim: true },
	photo: { type: String, require: true, trim: true },
	cart: [cartSchema],
});

// encriptar password antes de guardar
userSchema.pre("save", async function () {
	const user = this;
	logger.log("info", `User: ${user}`);
	if (user.isModified("password")) {
		user.password = encryptPassword(user.password);
	}
});

const User = model("users", userSchema);

export default User;