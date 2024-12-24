export const dynamic = 'force-dynamic';


import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Link from 'next/link';

async function fetchProducts() {
  try {
    const response = await fetch(`${process.env.MONGODB_URI}/api/myproduct`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Page() {
  const products = await fetchProducts();

  return (
    <ul className="grid place-content-center text-center xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <li key={product._id}>
            <Card className="space-y-1 flex flex-col hover:shadow-2xl px-4 py-2 m-5 w-64">
              <Card.Image src={product.image} width={300} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price}</p>
              <Button className="flex justify-center rounded-md text-gray-700 text-xl font-medium bg-green-400">
                <Link href={`/allproduct/${product._id}`} className="w-full">
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
