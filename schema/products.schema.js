import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
	timestamp: { type: String, max: 1000 },
	name: { type: String, required: true, max: 100 },
	description: { type: String, required: true, max: 100 },
	code: { type: String, required: true },
	photo: { type: String, required: true, max: 100 },
	price: { type: Number, required: true },
	stock: { type: Number, required: true },
});

const Products = mongoose.model("products", productSchema);

export default Products;