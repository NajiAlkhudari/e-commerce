"use client";
import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import TextInput from "@/components/ui/TextInput/TextInput";
import Button from '@/components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; 
import { registerUser } from '@/store/registerSlice';
const page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[name , setName]=useState('');
    const dispatch = useDispatch();
    const router = useRouter(); 
    const { loading, error , isAuthenticated} = useSelector((state) => state.register);
    
  
   
useEffect(() => {
    if (isAuthenticated) {
            router.push('/');
        }
    }
, [isAuthenticated, router]);  
console.log("the role is "  , isAuthenticated , loading);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({name, email, password }));
    };
    return (
        <div>
            <Card className="space-y-9 "
            title= "Register new account"
            
            >
                    

                <div className="flex flex-col items-center space-y-4">
                    <TextInput
                        className="bg-gray-100 text-black mt-1 block w-full py-2 px-14 border-b-2 border-black rounded-md focus:outline-none focus:border-rose-red"
                        placeholder="name"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextInput
                        className="bg-gray-100 text-black mt-1 block w-full py-2 px-14 border-b-2 border-black rounded-md focus:outline-none focus:border-rose-red"
                        placeholder="example@mail.com"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextInput
                        className="bg-gray-100 text-black mt-1 block  w-full  py-2 px-14 border-b-2 border-black rounded-md focus:outline-none focus:border-rose-red"
                        placeholder="........"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                    <div className="p-4">
                        <Button
                            className=" w-full  py-3 px-32 rounded-md text-white text-lg font-medium bg-rose-red"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading} 
                        >
                            {loading ? 'Regsister in...' : 'Register'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default page;
