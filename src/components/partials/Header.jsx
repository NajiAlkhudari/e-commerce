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
import { BsChevronDown } from 'react-icons/bs'; // أيقونة السهم المنسدل

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false); 
  const [showLoginMessage, setShowLoginMessage] = useState(false); 
  const [isDropdownOpen, setDropdownOpen] = useState(false); // حالة لفتح القائمة المنسدلة
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

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

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // التبديل بين فتح وغلق القائمة المنسدلة
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
            {isAuthenticated ? (
              <p className="text-gray-800 flex justify-center text-center ">
                Welcome {user.name}</p>  
            ) : (
              <div className="relative">
                <button className="text-gray-800 flex items-center" onClick={toggleDropdown}>
                  <MdAccountCircle />
                  Account
                  <BsChevronDown className="ml-2" /> {/* أيقونة السهم المنسدل */}
                </button>
                {isDropdownOpen && (
                  <div className="absolute bg-white   shadow-lg rounded-md mt-2 w-32">
                    <button
                      className="block w-full text-wh  text-center  px-4 py-2 text-sm  text-gray-950"
                      onClick={() => setLoginOpen(true)}
                    >
                      Log In
                    </button>
                    <a
                      href="/register"
                      className="block w-full text-center text-gray-950 px-4 py-2 text-sm"
                    >
                      Sign Up
                    </a>
                  </div>
                )}
              </div>
            )}
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
            {isAuthenticated ? (
              <p className="text-black flex text-center justify-center">  Welcome {user.name}</p> 
            ) : (
              <div className="relative">
                <button className="text-black flex items-center" onClick={toggleDropdown}>
                  <MdAccountCircle />
                  Account
                  <BsChevronDown className="ml-2" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2 w-32">
                    <button
                      className="block w-full text-left text-black px-4 py-2 text-sm"
                      onClick={() => setLoginOpen(true)}
                    >
                      Log In
                    </button>
                    <a
                      href="/register"
                      className="block w-full text-left text-black px-4 py-2 text-sm"
                    >
                      Sign Up
                    </a>
                  </div>
                )}
              </div>
            )}
            <Modal
              className="divide-y divide-blue-200"
              isOpen={isLoginOpen}
              onClose={() => setLoginOpen(false)}
            >
              <Login className="top-0"/>
            </Modal>
          </div>
          <a
            href="#"
            className="text-black"
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
