import "dotenv/config";
import {connectDB} from "./config/db.js";
import { app } from "./app.js";

connectDB().then(()=>{
    app.on("error",(error)=>{
        console.log(`COULD NOT CONNECT TO APP ERROR: ${error}`)
    })
    app.listen(process.env.PORT ||8000,()=>{
        console.log(`APP IS RUNNIG CONNECTION SUCCESSFULL`)
    })
}).catch((err)=>{
    console.log(`DATABASE CONNECTION FAILED ERROR:->${err}`)
})
