export const dynamic = 'force-dynamic';


import Card from '@/components/ui/Card';
import Image from 'next/image';
import AddToCartButton from '@/components/ui/AddToCartButton'; 
import axios from 'axios';

export async function fetchProductsAppear() {
  try {
    const response = await axios.get(`${API_URL}/api/product`, { cache: 'no-store' });
    return response.data.products;  
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error('Failed to fetch products');
  }
}

export default async function Page() {
  const products = await fetchProductsAppear();

  return (
    <ul className='grid place-content-center text-center xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <li key={product._id}>
            <Card className="space-y-1 flex flex-col hover:shadow-2xl px-4 py-2 m-5 w-64">
              <Image className='h-56' src={product.image} alt={product.name} width={300} height={500} />
              <div className='flex justify-between items-center'>
                <div>
                  <p className="font-medium text-lg">{product.name}</p>
                  <p className="text-gray-500">${product.price}</p>
                </div>
                <div>
                  <AddToCartButton productId={product._id} /> 
                </div>
              </div>
            </Card>
          </li>
        ))
      ) : (
        <p>No products found</p>
      )}
    </ul>
  );
}
