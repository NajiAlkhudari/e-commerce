import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  payment_status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending", 
  },
  status: {
    type: String,
    enum: ["processing", "shipped", "delivered", "canceled"],
    default: "processing", 
  },
  order_items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem", 
    },
  ],
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
