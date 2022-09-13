import bcrypt from "bcrypt";
import { logger } from "../utils/winston/index.js";

export const encryptPassword = async (password) => {
	try {
		return await bcrypt.hash(password, 10);
	} catch (error) {
		logger.error("error", `Problema encriptando password: ${error}`);
	}
};