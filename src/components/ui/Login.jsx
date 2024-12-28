"use client";
import React, { useState, useEffect } from 'react';
import Card from './Card';
import TextInput from "./TextInput/TextInput";
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/authSlice';
import { useRouter } from 'next/navigation'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter(); 
    const { loading, error, isAuthenticated , role } = useSelector((state) => state.auth);
    
  
    const notifyError = (message) => {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      };
     
   
      
    
useEffect(() => {
    if (isAuthenticated) {
        if (role === "admin") {
            router.push('/dashboard');
        } else if (role === "user") {
            router.push('/');
        }
        
    }
}, [isAuthenticated]);  
console.log("the role is " , role , isAuthenticated , loading);


useEffect(() => {
    if (error) {
      notifyError(error); 
    }

  }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            notifyError("Email and password are required.");
            return;
          }
          
        dispatch(login({ email, password }));
   

    };
    return (
        <div>
            <Card className="space-y-9 "
            title= "My Account"
            subTitle="Don't have an account? Sign up"
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
                
                    <div className="p-4">
                        <Button
                            className=" w-full  py-3 px-32 rounded-md text-white text-lg font-medium bg-rose-red"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading} 
                        >
                            
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                              <ToastContainer />
                        
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Login;
