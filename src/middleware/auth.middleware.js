import { asyncHandler } from '../utils/asyncHandler.utils.js';
import { User } from '../models/User.models.js';
import { ApiError } from '../utils/ApiError.utils.js';
import jwt from 'jsonwebtoken';
const veritfyToken = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }
    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken._id).select(
      '-password -refreshToken'
    );
    if (!user) {
      throw new ApiError(404, 'USER NOT FOUND INVALID TOKEN');
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('ERROR', error);
    throw new ApiError(401, 'INVALID OR EXPIRED ACCESS TOKEN ');
  }
});
export { veritfyToken };
