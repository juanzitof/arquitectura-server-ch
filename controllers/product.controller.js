import DAOFactory from "../daos/factory.js";
import { logger } from "../utils/winston/index.js";

const productsContainer = new DAOFactory();

let administrador = true;

const authError = (req) => ({
	error: -1,
	description: `Ruta ${req.baseUrl} método ${req.method} no autorizada`,
});

export const getProducts = async (req, res) => {
	try {
		res.json(await productsContainer.getAll());
	} catch (err) {
		logger.error(`Error al listar productos. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const getProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await productsContainer.getById(productId);

		if (!product) {
			return res.status(400).json({ error: "producto no encontrado" });
		}
		res.cookie("id", product.id);
		res.render("product", { product });
	} catch (err) {
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const updateProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		if (!administrador) {
			return res.send(authError(req));
		}

		if (
			await productsContainer.updateById(productId, {
				...req.body,
			})
		) {
			return res.status(201).send(productsContainer.getById(productId));
		}

		return res
			.status(400)
			.send({ error_description: "Producto no encontrado." });
	} catch (err) {
		logger.error(`Error al actualizar producto. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const createProduct = async (req, res) => {
	try {
		const product = req.body;
		const newProduct = await productsContainer.create(product);

		return res.status(201).json({ product: newProduct });
	} catch (err) {
		logger.error(`Error al crear producto. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const addProductToCart = async (req, res) => {
	try {
		const productId = req.cookies.id;

		const { quantity } = req.body;
		const user = req.user;
		productsContainer.addProductToCart(productId, quantity, user);
		res.redirect("/");
	} catch (err) {
		logger.error(`Error al agregar producto carrito. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await productsContainer.deleteById(req.params.id);
		if (!product) {
			return res
				.status(400)
				.json({ error_description: "Producto no encontrado." });
		}
		res.status(200).json({ product });
	} catch (err) {
		logger.error(`Error al borrar producto. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const deleteAll = async (req, res) => {
	try {
		if (!administrador) {
			res.send(authError(req));
		}
		res.status(200).send(await productsContainer.deleteAll());
	} catch (err) {
		logger.error(`Error al borrar los productos. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};