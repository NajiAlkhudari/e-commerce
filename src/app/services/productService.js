import axios from 'axios';

export async function fetchProducts() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/myproduct`, { cache: 'no-store' });
    return response.data.products;  
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error('Failed to fetch products');
  }
}



export async function fetchProductsAppear() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, { cache: 'no-store' });
    return response.data.products;  
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error('Failed to fetch products');
  }
}



export const deleteProduct = async (productId) => {
  if (!productId) {
    throw new Error('Product ID is required');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${productId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }

  return await response.json();
};

export const updateProduct = async (product) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${product._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return await response.json(); 
};




export async function fetchProductById(productId) {
  if (!productId) {
    throw new Error('Product ID is required');
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${productId}`);

    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    return res.json(); 
  } catch (error) {
    console.error('Error fetching product from server:', error);
    throw new Error('An error occurred while fetching product');
  }
}






