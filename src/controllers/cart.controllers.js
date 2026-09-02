import { Cart } from '../models/Cart.models.js';
import { asyncHandler } from '../utils/asyncHandler.utils.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';

const addToCart = asyncHandler(async (req, res) => {
  const { productID, quantity } = req.params;

  const parsedQuantity = parseInt(quantity, 10);
  if (!parsedQuantity || parsedQuantity < 1) {
    throw new ApiError(400, "INVALID QUANTITY");
  }

  let cart = await Cart.findOne({ owner: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      owner: req.user._id,
      items: [{
        product: productID, 
        quantity: parsedQuantity
      }]
    });
    return res.status(201).json(new ApiResponse(201, cart, "CART CREATED SUCCESSFULLY"));
  }

  
  const index = cart.items.findIndex((item) => item.product.toString() === productID);

  if (index > -1) {
    
    cart.items[index].quantity += parsedQuantity;
  } else {
  
    cart.items.push({
      product: productID,
      quantity: parsedQuantity
    });
  }

  await cart.save();
  return res.status(200).json(new ApiResponse(200, cart, "ITEM ADDED SUCCESSFULLY"));
});

const getUserCart=asyncHandler(async(req,res)=>{
    const cart=await Cart.findOne({owner:req.user?._id}).populate('items.product','name price image')
    res.status(200).json(new ApiResponse(200,cart,"CART SUCCESSFULLY FETCHED"))
})
const removeItem=asyncHandler(async(req,res)=>{
  const {productID}=req.params;
  const cart=await Cart.findOne({owner:req.user._id})
  if(!cart){
    throw new ApiError(404,"CART NOT FOUND")
  }
  cart.items=cart.items.filter((item)=>item.product.toString()!==productID)
  await cart.save()
  const updatedCart=await Cart.findById(cart._id).populate('items.product','name price image')
  res.status(200).json(new ApiResponse(200,updatedCart,"CART SUCCESSFULLY UPDATED "))

})

export{addToCart,getUserCart}