import mongoose from "mongoose";
import CartItem from "./CartItem";

const shoppingCartSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
 
  cart_items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem", 
      required: true,
    },
  ],
});

const ShoppingCart = mongoose.models.ShoppingCart || mongoose.model("ShoppingCart", shoppingCartSchema);

export default ShoppingCart;


