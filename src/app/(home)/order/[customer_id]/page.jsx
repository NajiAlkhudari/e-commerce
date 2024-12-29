"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

const Page = ({ params }) => {
  // استخدم React.use لفك التفاف params
  const { customer_id } = use(params); // فك التفاف params باستخدام React.use()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تأكد من أن `customer_id` موجود قبل إجراء الطلب
  useEffect(() => {
    if (!customer_id) {
      setError("Customer ID is missing.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${customer_id}`);
        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        setError("An error occurred while fetching orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customer_id]); // إضافة customer_id كمفتاح للتفعيل عند تغييره

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-center text-xl font-bold">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border-b border-gray-300 py-4">
              <h3 className="text-lg font-semibold">Order #{order._id}</h3>
              <p className="text-sm text-gray-600">Date: {new Date(order.order_date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Total Price: ${order.total_price}</p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
              <p className="text-sm text-gray-600">Payment Status: {order.payment_status}</p>

              {/* عرض عناصر الطلب */}
              {order.order_items.length === 0 ? (
                <p>No items in this order.</p>
              ) : (
                <ul>
                  {order.order_items.map((item) => (
                    <li key={item._id} className="flex items-center space-x-4 py-2">
                      <img
                        src={item.product_id.image || "/default-image.jpg"}
                        alt={item.product_id.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{item.product_id.name}</p>
                        <p className="text-sm text-gray-600">Price: ${item.product_id.price}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Total: ${item.total_price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
