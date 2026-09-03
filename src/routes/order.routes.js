import { Router } from 'express';
import {
  placeOrder,
  getOrderHistory,
} from '../controllers/order.controller.js';
import { veritfyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.use(veritfyToken);

router.route('/place').post(placeOrder);

router.route('/history').get(getOrderHistory);

export default router;
