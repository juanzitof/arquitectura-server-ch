import { confirmOrder } from "../services/order.services.js";
import { logger } from "../utils/winston/index.js";

export const checkout = async (req, res) => {
	const user = req.user;

	try {
		confirmOrder(res, user);
	} catch (err) {
		logger.error(`Error al generar pedido. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const orderSuccess = async (req, res) => {
	res.render("order-success");
};