import {
	deleteProductInCart,
	renderCartProducts,
} from "../services/cart.services.js";
import { logger } from "../utils/winston/index.js";

export const getCartProducts = async (req, res) => {
	try {
		const user = req.user;
		renderCartProducts(res, user);
	} catch (err) {
		logger.error(`Error al obtener carrito. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const deleteCartProduct = async (req, res) => {
	const user = req.user;
	const itemInCart = req.params.id;
	try {
		deleteProductInCart(res, user, itemInCart);
	} catch (error) {
		logger.error(`Error al borrar producto del carrito. ${error}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};