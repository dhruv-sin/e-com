import { addToCart,getUserCart } from "../controllers/cart.controllers.js";
import { veritfyToken } from "../middleware/auth.middleware.js";
import { Router } from "express";

const router=Router()

router.route("/addToCart/:productID/:quantity").post(veritfyToken,addToCart)
router.route("/getCart").get(veritfyToken,getUserCart)
