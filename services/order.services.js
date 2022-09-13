import Orders from "../schema/order.schema.js";
import Products from "../schema/products.schema.js";
import moment from "moment";
import { checkOutSms, checkOutWhatsapp } from "../utils/sms_wsp.js";
import { checkOutEmail } from "../utils/mail.js";

export const confirmOrder = async (res, user) => {
	const productsInCart = await Promise.all(
		user.cart.map(async (elem) => {
			const product = await Products.findById(elem.product);
			return {
				product: product.name,
				quantity: elem.quantity,
			};
		})
	);

	const order = new Orders({
		userName: user.name,
		products: productsInCart,
		userEmail: user.email,
		date: moment(new Date()).format("DD/MM/YY HH:mm"),
	});
	user.cart = [];
	checkOutEmail(order);
	checkOutSms(user.phone);
	checkOutWhatsapp(order, user.phone);
	await user.save();
	await order.save();
	res.redirect("/api/order/orderSuccess");
};