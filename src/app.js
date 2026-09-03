import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express()
app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"

//http://localhost:8000/api/v1/user
app.use("/api/v1/user",userRouter)


// http://localhost:8000/api/v1/product
import productRouter from "./routes/product.routes.js"
app.use("/api/v1/product",productRouter)


import orderRouter from "./routes/order.routes.js";

// http://localhost:8000/api/v1/order
app.use("/api/v1/order", orderRouter);

export {app}
