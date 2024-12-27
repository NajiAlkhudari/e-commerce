'use client';
import { useState } from 'react';
import axios from "axios";
import TextInput from '@/components/ui/TextInput/TextInput';
import Button from '@/components/ui/Button';

const page = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [isVisibility, setIsVisibility] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !price || !stock || !image || !description) {
      setError('All fields are required.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description' , description)
    formData.append('stock', stock);
    formData.append('isVisibility', isVisibility);
    formData.append('image', image);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess('Product added successfully!');
        setName('');
        setPrice('');
        setStock('');
        setDescription('');
        setImage(null);
      } else {
        setError(response.data.error || 'Failed to add product');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold  mb-4">Create New Product</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Product Name</label>
          <TextInput
          
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-100 text-black mt-1 block py-2 px-3 border-b-2 border-black rounded-md focus:outline-none focus:border-sky-700"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <TextInput
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-gray-100 text-black mt-1 block py-2 px-3 border-b-2 border-black rounded-md focus:outline-none focus:border-sky-700"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-700">Stock</label>
          <TextInput
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full bg-gray-100 text-black mt-1 block py-2 px-3 border-b-2 border-black rounded-md focus:outline-none focus:border-sky-700"
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="stock" className="block text-gray-700">Description</label>
          <TextInput
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-100 text-black mt-1 block py-2 px-3 border-b-2 border-black rounded-md focus:outline-none focus:border-sky-700"
            required
          />
        </div>


        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Product Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full bg-gray-100 text-black mt-1 block py-2 px-3 border-b-2 border-black rounded-md focus:outline-none focus:border-sky-700"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isVisibility"
            checked={isVisibility}
            onChange={() => setIsVisibility(!isVisibility)}
            className="mr-2"
          />
          <label htmlFor="isVisibility" className="text-gray-700">Visible to customers</label>
        </div>

        <div className="mb-4 text-center">
          <Button
            type="submit"
            className={` px-3 py-2 text-white bg-blue-600 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'loading...' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default page;
