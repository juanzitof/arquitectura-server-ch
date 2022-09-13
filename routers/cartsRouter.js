import { Router } from "express";
import { isAuth } from "../utils/auth.js";
import {
	deleteCartProduct,
	getCartProducts,
} from "../controllers/cart.controller.js";

export const cartRouter = Router();

// Endpoints Cart

cartRouter.get("/", isAuth, getCartProducts);

cartRouter.delete("/:id", isAuth, deleteCartProduct);