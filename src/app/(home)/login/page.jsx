"use client";
import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import TextInput from "@/components/ui/TextInput/TextInput";
import Button from '@/components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/authSlice';
import { useRouter } from 'next/navigation'; 
const page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter(); 
    const { loading, error, isAuthenticated , role } = useSelector((state) => state.auth);
    
  
   
useEffect(() => {
    if (isAuthenticated) {
        if (role === "admin") {
            router.push('/dashboard');
        } else if (role === "user") {
            router.push('/');
        }
    }
}, [isAuthenticated, role, router]);  
console.log("the role is " , role , isAuthenticated , loading);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };
    return (
        <div>
            <Card className="space-y-9 "
            title= "Welcome"
            subTitle="Login to your acoount"
            >
                    

                <div className="flex flex-col items-center space-y-4">
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
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default page;
