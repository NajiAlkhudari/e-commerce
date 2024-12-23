'use server';

import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import { fetchProducts } from '../../services/productService';
import Link from 'next/link'; 

export default async function Page() {
  const products = await fetchProducts(); 

  return (
    <ul className='grid place-content-center text-center xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <li key={product._id}>
            <Card className="space-y-1 flex flex-col hover:shadow-2xl px-4 py-2 m-5 w-64">
              <Card.Image src={product.image} width={300} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price}</p>
              <Button className="flex justify-center  rounded-md text-gray-700 text-xl font-medium bg-green-400">
  <Link href={`/allproduct/${product._id}`} className="w-full ">
    View
  </Link>
</Button>

            </Card>
          </li>
        ))
      ) : (
        <p>No products found</p>
      )}
    </ul>
  );
}


