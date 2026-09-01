import { Product } from '../models/Product.models.js';
import { asyncHandler } from '../utils/asyncHandler.utils.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { uploadToCloudinary } from '../utils/cloudinary.utils.js';
import fs from "fs"

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock = 0, category } = req.body;
  if (
    [name, description, category].some((field) => {
      return !field || field.trim() == '';
    })
  ) {
    throw new ApiError(404, 'ALL FILEDS ARE REQUIRED');
  }
  if (req.files?.length <= 0) {
    throw new ApiError(404, 'NO IMAGE FOUND');
  }
  const imageUrls = [];
  for (const file of req.files) {
    const response = await uploadToCloudinary(file.path);
    if (!response||!response.url) {
        for(const remaining of req.files){
            if(fs.existsSync(remaining.path)){ 
                 fs.unlinkSync(remaining.path)
            }
        }
      throw new ApiError(500, 'IMAGE UPLOAD FAILED');
    }
    imageUrls.push(response.url);
  }
  const product = await Product.create({
    name: name,
    description,
    price,
    stock,
    category,
    image: imageUrls,
    seller: req.user._id,
  });
  if (!product) {
    throw new ApiError(500, 'PRODUCT CREATRION FAILED');
  }
  const finalProduct = await Product.findById(product._id).populate(
    'seller',
    'username email'
  );
  res
    .status(201)
    .json(new ApiResponse(201, finalProduct, 'PRODUCT CREATED SUCCESSFULLY'));
});

export{createProduct}