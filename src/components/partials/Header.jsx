'use client';
import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import Modal from "../ui/modal/Modal";
import Login from "../ui/Login";
import ShoppingCartModal from "../ui/ShoppingCart"; 
import { useSelector } from 'react-redux';
import Notification from "../ui/Notification";


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false); 
  const [showLoginMessage, setShowLoginMessage] = useState(false); 
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      setLoginOpen(false);  
      setShowLoginMessage(false); 
    }
  }, [isAuthenticated]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      setCartOpen(true); 
    } else {
      setShowLoginMessage(true); 
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-rose-red px-4 py-4 sm:py-4 sm:px-6 lg:py-0 lg:px-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 text-2xl text-gray-800">
          <a href="#" className="">
            <FaInstagram />
          </a>
          <div className="border-l border-gray-600 h-6"></div>
          <a href="#" className="text-gray-800">
            <AiOutlineFacebook />
          </a>
        </div>

        <div className="flex justify-center items-center space-x-4 text-lg sm:text-xl lg:text-2xl">
          <p className="text-3xl font-bold text-gray-800 ">E-Commerce.ae</p>
        </div>

        <nav className="hidden sm:flex items-center space-x-4 text-sm sm:text-base lg:text-lg text-black">
          <div className="border-l border-gray-600 h-6"></div>
          <div className="flex space-x-2">
            <button className="text-gray-800" onClick={() => setLoginOpen(true)}>
              <MdAccountCircle />
              Login
            </button>
            <Modal
              className="divide-y divide-blue-200"
              isOpen={isLoginOpen}
              onClose={() => setLoginOpen(false)}
            >
              <Login />
            </Modal>
          </div>
          <div className="border-l border-gray-600 h-6"></div>
          <a
            href="#"
            className="text-gray-800"
            onClick={handleCartClick} 
          >
            <FaCartShopping />
            cart
          </a>
        </nav>

        <button className="sm:hidden" onClick={toggleMobileMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="sm:hidden mt-4">
          <div className="flex space-x-2">
            <button className="text-black" onClick={() => setLoginOpen(true)}>
              <MdAccountCircle />
              Login
            </button>
            <Modal
              className="divide-y divide-blue-200"
              isOpen={isLoginOpen}
              onClose={() => setLoginOpen(false)}
            >
              <Login />
            </Modal>
          </div>
          <a
            href="#"
            className="hover:text-ivory text-black"
            onClick={handleCartClick} 
          >
            <FaCartShopping />
            cart
          </a>
        </nav>
      )}

      {showLoginMessage && (
      <Notification title="Please log in to access your cart" />
    
      )}

      <Modal
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
      >
        <ShoppingCartModal /> 
      </Modal>
    </header>
  );
};

export default Header;



