

import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShoppingCart",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  total_price: {
    type: Number,
    required: true,
  },
});

const CartItem =
  mongoose.models.CartItem || mongoose.model("CartItem", cartItemSchema);

export default CartItem;
