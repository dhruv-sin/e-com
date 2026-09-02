import mongoose, { Schema } from "mongoose";

const CartSchema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[
        {
            Product:{
                type:Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                min:[1,"QUANTITY CANT BE LESS THAN 1"]
            }
        }
    ]
},{
    timestamps:true
})

export const Cart=mongoose.model("Cart",CartSchema)