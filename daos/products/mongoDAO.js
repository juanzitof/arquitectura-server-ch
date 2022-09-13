import mongoose from "mongoose";
import { config } from "../../config";
import Products from "../../schema/products.schema";
import ProductDTO from "../../dto/productDTO";
import { logger } from "../../utils/winston";

mongoose.connect(`${config.mongodb.url}`);

export default class ProductMongoDAO {
	constructor() {}

	getAll = async () => {
		try {
			const docs = await Products.find({});
			return docs.length
				? docs.map((doc) => new ProductDTO(doc))
				: console.log("No hay nada cargado");
		} catch (err) {
			logger.error(`Error al obtener todo: ${err}`);
		}
	};

	getById = async (id) => {
		try {
			const doc = Products.findById(id);

			if (!doc) {
				logger.error(`id ${id} no encontrado`);
			}

			return new ProductDTO(doc);
		} catch (err) {
			logger.error(`Error al obtener por id: ${err}`);
		}
	};

	deleteById = async (id) => {
		try {
			const removedDoc = await Products.deleteOne({ _id: id });
			console.log(`El objeto con id: ${id} se ha eliminado`);
			return removedDoc;
		} catch (err) {
			logger.error(`Error al borrar id ${id}: ${err}`);
		}
	};

	deleteAll = async () => {
		try {
			const allDeleted = await Products.deleteMany({});
			return allDeleted;
		} catch (err) {
			logger.error(`Error al borrar: ${err}`);
		}
	};

	save = async (object) => {
		object.timestamp = new Date();
		try {
			const savedDoc = await Products.create(object);
			return ProductDTO(savedDoc);
		} catch (err) {
			throw new Error(`Error al guardar: ${err}`);
		}
	};

	updateById = async (id, object) => {
		object.timestamp = new Date();
		try {
			const updatedDoc = await Products.updateOne(
				{ _id: id },
				{
					$set: object,
				}
			);
			return new ProductDTO(updatedDoc);
		} catch {
			logger.error(`Error al actualizar: ${err}`);
		}
	};

	addProductToCart = async (productId, quantity, user) => {
		const productToAdd = {
			product: productId,
			quantity,
		};
		user.cart.push(productToAdd);
		user.save();
	};
}