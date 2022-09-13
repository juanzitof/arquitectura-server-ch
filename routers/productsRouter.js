import { Router } from "express";
import {
	addProductToCart,
	createProduct,
	deleteAll,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from "../controllers/product.controller.js";

const productsRouter = Router();

// Endpoints products
productsRouter.get("/", getProducts);

productsRouter.get("/:id", getProduct);

productsRouter.post("/create", createProduct);

productsRouter.post("/:id", addProductToCart);

productsRouter.put("/:id", updateProduct);

productsRouter.delete("/:id", deleteProduct);

productsRouter.delete("/", deleteAll);

export default productsRouter;