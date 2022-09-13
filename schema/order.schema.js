import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
	userName: { type: String, require: true, trim: true, min: 4 },
	products: [],
	userEmail: {
		type: String,
		required: true,
		min: 4,
		trim: true,
		lowercase: true,
	},
	date: { type: String, require: true, trim: true },
	state: { type: String, require: true, trim: true },
});

const Orders = mongoose.model("orders", OrderSchema);

export default Orders;