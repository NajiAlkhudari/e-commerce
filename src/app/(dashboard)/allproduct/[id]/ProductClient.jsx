'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { updateProduct, deleteProduct } from '@/app/services/productService';
import TextInput from '@/components/ui/TextInput/TextInput';

export default function ProductClient({ product, productId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const handleUpdate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!productId) {
        throw new Error('Product id is missing');
      }

      const updatedProduct = await updateProduct(editedProduct);
      router.push('/allproduct');

      console.log('Updated product:', updatedProduct);
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!productId) {
        throw new Error('Product id is missing');
      }

      await deleteProduct(productId);
      router.push('/allproduct');
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      {isEditing ? (
        <>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Product Name
            </label>
            <TextInput
              name="name"
              type="text"
              value={editedProduct.name}
              onChange={handleChange}
              className="w-full bg-gray-100 text-black mt-1 block py-2 px-3 border-b-2 border-black rounded-md focus:outline-none focus:border-sky-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">
              Price
            </label>
            <TextInput
              name="price"
              type="number"
              value={editedProduct.price}
              onChange={handleChange}
              className="w-full bg-gray-100 text-black mt-1 block py-2 px-3 border-b-2 border-black rounded-md focus:outline-none focus:border-sky-700"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700">
              Stock
            </label>
            <TextInput
              name="stock"
              type="number"
              value={editedProduct.stock}
              onChange={handleChange}
              className="w-full bg-gray-100 text-black mt-1 block py-2 px-3 border-b-2 border-black rounded-md focus:outline-none focus:border-sky-700"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="isVisibility"
              checked={editedProduct.isVisibility}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="isVisibility" className="text-gray-700">
              Visible to customers
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block"
            />
          </div>

          <Button
            onClick={handleUpdate}
            className="py-1 px-2 rounded-md text-white bg-sky-500"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Product'}
          </Button>
        </>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-md"
              />
            )}
          </div>

          <div className="w-full lg:w-2/3 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{editedProduct.name}</h1>
              <p className="text-lg font-medium text-gray-700">
                Stock: {editedProduct.stock}
              </p>
              <p className="text-xl font-bold text-sky-600">
                Price: ${editedProduct.price}
              </p>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => setIsEditing(true)}
                className="py-1 px-2 rounded-md text-white bg-sky-500 w-full sm:w-auto"
                disabled={isLoading}
              >
                Edit Product
              </Button>
              <Button
                onClick={handleDelete}
                className="py-1 px-2 rounded-md text-white bg-red-500 w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete Product'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
