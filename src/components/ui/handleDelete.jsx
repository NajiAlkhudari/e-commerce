export const handleDelete = async (customerId, productId) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cartItem`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_id: customerId, product_id: productId }),
    });

    if (!response.ok) {
      const text = await response.text();  
      console.error("Error response body:", text);
      return { success: false, message: "An error occurred on the server." };
    }

    const data = await response.json();
    return { success: true, message: data.message || 'Product removed successfully' };

  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "There was an issue deleting the product." };
  }
};
