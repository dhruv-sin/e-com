import { Cart } from '../models/Cart.models.js';
import { Order } from '../models/Order.models.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { asyncHandler } from '../utils/asyncHandler.utils.js';

const placeOrder = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;
  if (!shippingAddress) {
    throw new ApiError(404, 'SHIPPING ADDRESS IS REQUIRED');
  }
  const cart = await Cart.findOne({ owner: req.user._id }).populate(
    'items.product',
    'price'
  );
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'YOU CANT CHECKOUT AN EMPTY CART');
  }
  const totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  const orderedItems = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const order = await Order.create({
    owner: req.user._id,
    orderedItems,
    totalPrice,
    shippingAddress,
  });
  if (!order) {
    throw new ApiError(500, 'ORDER UNSUCCESSFULL');
  }
  cart.items = [];
  await cart.save();
  res.status(201).json(new ApiResponse(201, order, 'ORDERED SUCCESSFULLY'));
});

const getOrderHistory = asyncHandler(async (req, res) => {
  const orderHistory = await Order.find({ owner: req.user._id })
    ?.populate('orderedItems.product', 'name image')
    .sort({ createdAt: -1 });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { orderHistory },
        'SUCCESS FULLY FETCHED  ORDER HISTORY'
      )
    );
});

export { placeOrder,getOrderHistory };
