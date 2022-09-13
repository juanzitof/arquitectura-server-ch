import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
	product: { type: mongoose.Schema.ObjectId, ref: "products" },
	quantity: { type: Number, require: true, trim: true },
});

export default cartSchema;