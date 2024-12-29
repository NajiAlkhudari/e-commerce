

"use client";
import React from "react";
import { useSelector } from "react-redux";
import { addItemToCart } from "@/app/services/cartService";
import { MdAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCartButton = ({ productId }) => {
  const customerId = useSelector((state) => state.auth.user?.id);

  const notifyLogin = () => {
    toast.info('Please login before add product to cart' ,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };



  const notifySuccess = () => {
    toast.success('Success added to your cart!' ,{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const notifyFailure = () => {
    toast.error("فشل في إضافة المنتج إلى عربة التسوق.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  

  const handleAddToCart = async () => {
    if (!customerId) {
      notifyLogin();
      return;
    }

    try {
      const cartData = await addItemToCart({
        customerId,
        productId,
        quantity: 1,
      });
      console.log("Product added to cart:", cartData);
      notifySuccess();
    } catch (error) {
      console.error("Failed to add product to cart:", error.message);
      notifyFailure();
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="px-6 py-4 text-3xl rounded hover:text-green-600"
      >
        <MdAddShoppingCart />
      </button>
      <ToastContainer />
    </div>
  );
};

export default AddToCartButton;
