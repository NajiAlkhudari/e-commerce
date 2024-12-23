


"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { addItemToCart } from '@/app/services/cartService';
import { MdAddShoppingCart } from "react-icons/md";

const AddToCartButton = ({ productId }) => {
  const customerId = useSelector((state) => state.auth.user?.id); 

  const handleAddToCart = async () => {
    if (!customerId) {
      alert('يرجى تسجيل الدخول لإضافة المنتجات إلى عربة التسوق.');
      return;
    }

    try {
      const cartData = await addItemToCart({
        customerId,
        productId, 
        quantity: 1, 
      });
      console.log('Product added to cart:', cartData);
      alert('تمت إضافة المنتج إلى عربة التسوق!');
    } catch (error) {
      console.error('Failed to add product to cart:', error.message);
      alert('فشل في إضافة المنتج إلى عربة التسوق.');
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="px-6 py-4 text-3xl rounded hover:text-green-600 "
    >
<MdAddShoppingCart />
</button>
  );
};

export default AddToCartButton;

