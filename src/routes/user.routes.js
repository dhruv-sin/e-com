import { registerUser,userLogin } from "../controllers/user.controller.js";
import { Router } from "express";

const router=Router()

//http://localhost:8000/api/v1/user/register
router.route("/register").post(registerUser)
//http://localhost:8000/api/v1/user/login
router.route("/login").post(userLogin)


export default router