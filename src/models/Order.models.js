import mongoose, { Schema } from "mongoose";

const OrderSchema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },orderedItems:[{
        product:{
            type:Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        quantity:{
            type:Number,
            default:1,
            min:[1,"Quantity cant be less than 1"]
        },
        price:{
            type:Number,
            required:true
        }
    }],
    totalPrice:{
        type:Number,
        required:true
    },status:{
        type:String,
        enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
        default:"PENDING"
    },shippingAddress:{
        type:String,
        required:true
    }
},{
    timestamps:true})

export const Order=mongoose.model("Order",OrderSchema)