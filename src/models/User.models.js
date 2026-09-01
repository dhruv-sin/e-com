import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import Jwt  from 'jsonwebtoken';

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    address: {
      street: { type: String, required: true, lowercase: true },
      city: { type: String, required: true, lowercase: true },
      state: { type: String, required: true, lowercase: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: 'India' },
    },
    role: {
      type: String,
      enum: ['customer', 'seller', 'admin'],
      default: 'customer',
    },
    refreshToken:{
      type:String
    }
  },
  { timestamps: true }
);

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return
    this.password=await bcrypt.hash(this.password,10)
   
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function () {
    return  Jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        phone:this.phone
    },
    process.env.ACCESS_TOKEN_SECRET,
        {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
)
    
}

userSchema.methods.generateRefreshToken=function () {
    return  Jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
        {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
)
    
}


export const User = mongoose.model('User', userSchema);
