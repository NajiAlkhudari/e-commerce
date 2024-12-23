
export const dynamic = 'force-dynamic';


import { fetchProductById } from '@/app/services/productService'; 
import ProductClient from './ProductClient';

export default async function Page({ params }) {
  const { id } = params;  
  const product = await fetchProductById(id);

  console.log("Product from server:", product);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProductClient product={product} productId={product._id} />  
    </div>
  );
}
