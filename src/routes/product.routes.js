import { createProduct } from "../controllers/product.controller.js";
import {upload} from "../middleware/multer.middleware.js"
import { Router } from "express";
import {veritfyToken } from "../middleware/auth.middleware.js";

const router=Router()

router.route("/add-New-Product").post(veritfyToken,upload.array("images", 5),createProduct)

export default router