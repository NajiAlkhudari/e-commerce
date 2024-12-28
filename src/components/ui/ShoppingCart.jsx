


import { useEffect, useState } from "react";
import { fetchCartData } from "@/app/services/cartService";
import { useSelector } from 'react-redux';
import { handleDelete } from './handleDelete';

const ShoppingCartModal = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const customerId = useSelector(state => state.auth.user?.id);

  const handleIncrease = async (productId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cartItem`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          product_id: productId,
          action: 'increase',
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id._id === productId
              ? { ...item, quantity: item.quantity + 1, total_price: (item.quantity + 1) * item.product_id.price }
              : item
          )
        );
        setSuccessMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error increasing quantity:", err);
      setError("There was an issue increasing the quantity.");
    }
  };

  const handleDecrease = async (productId) => {
    try {
      const response = await fetch(`/api/cartItem`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          product_id: productId,
          action: 'decrease',
        }),
      });
      const data = await response.json();
  
      if (response.ok) {
        if (data.message === "Product removed from cart") {
          setCartItems((prevItems) => prevItems.filter(item => item.product_id._id !== productId));
          setSuccessMessage("Product removed from cart.");
        } else {
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item.product_id._id === productId
                ? { ...item, quantity: item.quantity - 1, total_price: (item.quantity - 1) * item.product_id.price }
                : item
            )
          );
          setSuccessMessage(data.message);
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error decreasing quantity:", err);
      setError("There was an issue decreasing the quantity.");
    }
  };
  

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await handleDelete(customerId, productId);

      if (result.success) {
        setCartItems((prevItems) => prevItems.filter(item => item.product_id._id !== productId));
        setSuccessMessage(result.message);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("There was an issue deleting the product.");
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const carts = await fetchCartData(customerId);
        setCartItems(carts[0]?.cart_items || []);
      } catch (err) {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchCart();
    }
  }, [customerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => {
            const product = item.product_id;
            if (!product) return null;

            return (
              <li key={item._id || product._id} className="flex items-center p-4 border-b border-gray-300">
                <img 
                  src={product.image || "/default-image.jpg"} 
                  alt={product.name || "Product"} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow px-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">Price: <span className="text-green-600">{product.price} $</span></p>
                  <p className="text-sm text-gray-600">Quantity: <span className="font-medium">{item.quantity}</span></p>
                  <p className="text-sm text-gray-600">Total: <span className="text-green-600 font-semibold">{item.total_price} $</span></p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleDecrease(product._id)} 
                    className="px-3 py-1 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-lg"
                  >
                    -
                  </button>
                  <button 
                    onClick={() => handleIncrease(product._id)} 
                    className="px-3 py-1 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-lg"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product._id)} 
                    className="px-4 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default ShoppingCartModal;
