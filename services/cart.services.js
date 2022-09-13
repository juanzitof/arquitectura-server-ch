import Products from "../schema/products.schema.js";

export const renderCartProducts = async (res, user) => {
	const userCart = await user.cart;
	const cartArray = await Promise.all(
		userCart.map(async (elem) => {
			return {
				product: await Products.findById(elem.product),
				quantity: elem.quantity,
				id: elem._id,
			};
		})
	);
	res.render("cart", { cartArray });
};

export const deleteProductInCart = async (res, user, item) => {
	const userCart = await user.cart;

	for (let index = 0; index < userCart.length; index++) {
		let id = userCart[index]._id;
		id = JSON.stringify(id);
		id = id.slice(1);
		id = id.slice(0, id.length - 1);
		if (id === item) {
			userCart.splice(index, 1);
		}
	}
	await user.save();
	res.redirect("/api/carrito");
};