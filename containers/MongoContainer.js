import mongoose from "mongoose";
import { logger } from "../utils/winston/index.js";
import { config } from "../config/index.js";

const { model } = mongoose;
mongoose.connect(`${config.mongodb.url}`);

export default class MongoContainer {
	constructor(collection, schema) {
		this.collection = model(collection, schema);
	}

	getAll = async () => {
		try {
			const docs = await this.collection.find({});
			return docs.length ? docs : console.log("No hay nada cargado");
		} catch (err) {
			logger.error(`Error al obtener todo: ${err}`);
		}
	};

	getById = async (id) => {
		try {
			const doc = this.collection.findById(id);

			if (!doc) {
				logger.error(`id ${id} no encontrado`);
			}

			return doc;
		} catch (err) {
			logger.error(`Error al obtener por id: ${err}`);
		}
	};

	deleteById = async (id) => {
		try {
			const removedDoc = await this.collection.deleteOne({ _id: id });
			console.log(`El objeto con id: ${id} se ha eliminado`);
			return removedDoc;
		} catch (err) {
			logger.error(`Error al borrar id ${id}: ${err}`);
		}
	};

	deleteAll = async () => {
		try {
			const allDeleted = await this.collection.deleteMany({});
			return allDeleted;
		} catch (err) {
			logger.error(`Error al borrar: ${err}`);
		}
	};

	save = async (object) => {
		object.timestamp = new Date();
		try {
			const savedDoc = await this.collection.create(object);
			return savedDoc;
		} catch (err) {
			throw new Error(`Error al guardar: ${err}`);
		}
	};

	updateById = async (id, object) => {
		object.timestamp = new Date();
		try {
			const updatedDoc = await this.collection.updateOne(
				{ _id: id },
				{
					$set: object,
				}
			);
			return updatedDoc;
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