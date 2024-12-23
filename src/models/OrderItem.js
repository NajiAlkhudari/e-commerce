import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
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
  },
  price: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "canceled"],
    default: "pending", 
  },
});

const OrderItem = mongoose.models.OrderItem || mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
