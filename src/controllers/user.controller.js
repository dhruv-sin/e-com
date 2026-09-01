import {User} from '../models/User.models.js';
import { asyncHandler } from '../utils/asyncHandler.utils.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';

const generateTokens=async(_id)=>{
try {
    const user=await User.findById(_id)
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()
    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false}) 
    return {refreshToken,accessToken}
} catch (error) {
  console.log("ERROR OCCURED:", error)
}
}

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, phone, password, address } = req.body;
  if (
    [username, email, phone, password].some(
      (field) => !field || field.trim() === ''
    ) ||
    !address ||
    Object.values(address).some((field) => !field || field.trim() === '')
  ) {
    throw new ApiError(400, 'ALL FIELD ARE REQUIRED');
  }
  const userExist = await User.findOne({
    $or: [{ username }, { email }, { phone }],
  });
  if (userExist) {
    throw new ApiError(400, 'USER ALREADY EXIST');
  }
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    phone,
    address,
  });

  const CreatedUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );
  if (!CreatedUser) {
    throw new ApiError(500, 'Somethig went wrong while creatigng the user ');
  }
  return res
    .status(201)
    .json(new ApiResponse(200, CreatedUser, 'user Registered successfully'));
});

const userLogin=asyncHandler(async(req,res)=>{
  const{username,email,password}=req.body
  if(!username&&!email){throw new ApiError(400,"ATLEAST ONE FIELD IS REQUIRED")}
  const user=await User.findOne({
    $or:[{username},{email}]
  })
  if(!user){throw new ApiError(404,"USER DOESNOT EXIST")}
  const isValid=await user.isPasswordCorrect(password)
  if(!isValid){throw new ApiError(501,"INVALID PASSWORD")}
  const{refreshToken,accessToken}=await generateTokens(user?._id)
  const options={
    httpOnly:true,
    secure:true
  }
  const loggedInUser=await User.findById(user?._id).select("-password -refreshToken")
  res.status(200).cookie("accessToken", accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,{user:loggedInUser},"SUCCESSFULLY LOGGED IN "))

})

export { registerUser,userLogin};
