export const dynamic = 'force-dynamic';

import Card from '../../../components/ui/Card';
import axios from 'axios';



export async function fetchProductsAppear() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, { cache: 'no-store' });
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
              <Card.Image src={product.image} width={300} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price}</p>

            </Card>
          </li>
        ))
      ) : (
        <p>No products found</p>
      )}
    </ul>
  );
}


