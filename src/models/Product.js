import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },

  stock: {
    type: Number,
    default: 0,
  },

  isVisibility :{
type : Boolean ,
default : 1 ,
  },
  image: { type: String, default: null }, 
},

 { timestamps: true });


const Product = mongoose.models.Product ||mongoose.model("Product", productSchema);
  export default Product