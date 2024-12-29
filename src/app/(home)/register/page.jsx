"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import TextInput from "@/components/ui/TextInput/TextInput";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { registerUser } from "@/store/registerSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.register
  );

  const notifyLogin = () => {
    toast.info("SignUp is success! Now you can login.", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      notifyLogin();
      setTimeout(() => {
        router.push("/login"); 
      }, 1000); 
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div>
      <Card className="space-y-9" title="Create new account">
        <div className="flex flex-col items-center space-y-4">
          <TextInput
            className="bg-gray-100 text-black mt-1 block w-full py-2 px-14 border-b-2 border-black rounded-md focus:outline-none focus:border-rose-red"
            placeholder="Name"
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
            className="bg-gray-100 text-black mt-1 block w-full py-2 px-14 border-b-2 border-black rounded-md focus:outline-none focus:border-rose-red"
            placeholder="Password"
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
              className="w-full py-3 px-32 rounded-md text-white text-lg font-medium bg-rose-red"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Page;
