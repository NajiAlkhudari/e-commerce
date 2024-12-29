
"use client"
import { useState } from 'react';

function CheckoutButton({ customerId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const checkout = async () => {
    setIsLoading(true); 
    setMessage("");  
    setError("");  

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(`Checkout successful! Order ID: ${data.order_id}`);
      } else {
        setError(`Error during checkout: ${data.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError("Network error, please try again.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <button
        onClick={checkout}
        disabled={isLoading}  
        className="bg-green-700"
      >
        {isLoading ? "Processing..." : "Checkout"}
      </button>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {isLoading && <div className="spinner">Loading...</div>}
    </div>
  );
}

export default CheckoutButton;
