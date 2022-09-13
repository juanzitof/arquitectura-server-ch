import { Router } from "express";
import { isAuth } from "../utils/auth.js";
import Products from "../schema/products.schema.js";
import { logger } from "../utils/winston/index.js";

export const webRouter = Router();

webRouter.get("/", isAuth, async (req, res) => {
	const user = req.user;
	try {
		const products = await Products.find({});
		res.render("index", { user, products });
	} catch (error) {
		logger.error(`Error al listar productos. ${error}`);
	}
});