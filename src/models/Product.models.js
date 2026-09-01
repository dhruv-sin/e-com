import mongoose,{ Schema } from "mongoose";

const productSchema= new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },description:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },price:{
        type:Number,
        required:true,
    },stock:{
        type:Number,
        default:0,
        required:true,
    },category:{
        type:String,
        required:true,
        lowercase:true
    },image: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        // Checks that the array is not empty and every item is a valid URL structure
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        return v && v.length > 0 && v.every(url => urlRegex.test(url));
      },
      message: 'The image field must contain at least one valid URL link.'
    }
  },seller:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

export const Product=mongoose.model("Product",productSchema)