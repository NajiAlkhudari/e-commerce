import axios from 'axios';




export const fetchCartData = async (customerId) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shoppingcart?customer_id=${customerId}`, {
        cache: "no-store",
      });
      return response.data.carts; 
    } catch (error) {
      if (error.response?.status === 404) {
        return [];
      }
      console.error("Error fetching cart data:", error);
      throw new Error("Failed to fetch cart data");
    }
  };
  
  

  export const addItemToCart = async ({ customerId, productId, quantity }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cartItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          productId,
          quantity,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item to cart');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in addItemToCart service:', error);
      throw error;
    }
  };
  
  
  
  
  export const removeItemFromCart = async (customerId, productId) => {
    if (!customerId || !productId) {
      throw new Error('Customer ID and Product ID are required');
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cartItem`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer_id: customerId, product_id: productId }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete product from cart');
    }
  
    return await response.json();
  };
  