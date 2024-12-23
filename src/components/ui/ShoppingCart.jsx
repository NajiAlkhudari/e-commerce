import { useEffect, useState } from "react";
import { fetchCartData } from "@/app/services/cartService";
import { useSelector } from 'react-redux';

const ShoppingCartModal = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const customerId = useSelector(state => state.auth.user?.id); 

  const handleIncrease = (id) => {
    console.log("Increase product:", id);
  };
  
  const handleDecrease = (id) => {
    console.log("Decrease product:", id);
  };
  
  const handleDelete = (id) => {
    console.log("Delete product:", id);
  };
  

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const carts = await fetchCartData(customerId);
        setCartItems(carts[0]?.cart_items || []);
      } catch (err) {
        setError("Failed load .");
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
             
              <li key={item._id} className="flex items-center p-4 border-b border-gray-300">
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
      onClick={() => handleDecrease(item._id)} 
      className="px-3 py-1 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-lg"
    >
      -
    </button>
    <button 
      onClick={() => handleIncrease(item._id)} 
      className="px-3 py-1 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-lg"
    >
      +
    </button>
    <button 
      onClick={() => handleDelete(item._id)} 
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
    </div>
  );
};

export default ShoppingCartModal;
