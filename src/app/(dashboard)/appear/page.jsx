'use server';

import Card from '../../../components/ui/Card';
import { fetchProductsAppear } from '../../services/productService';

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


