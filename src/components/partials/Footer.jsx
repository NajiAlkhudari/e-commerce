"use client";
import React from 'react'
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-gray-800'>
  
  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full h-auto pt-12 px-5 md:px-20">
  <div>
    <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-white">ECommerce</h1>

    <h4 className="text-gray-300 pt-6 sm:pt-10">Social Media</h4>
    <div className="flex space-x-4 text-2xl pt-2">
      <a href="#" className="text-gray-300">
        <FaInstagram />
      </a>
      <a href="#" className="text-gray-300">
        <AiOutlineFacebook />
      </a>
    </div>
  </div>
  
  <div>
    <p className="text-white">Customer Services</p>
    <p className="text-gray-300">Contact us</p>
    <p className="text-gray-300">FAQ</p>
  </div>
</div>
    <div className="border-t border-gray-300 h-4 "></div>

    <div className='flex justify-between  pl-28  '>
<div className='mb-3'>
    <p className='text-xs text-gray-300 '>All rights reserved ®-2024 E-Commerce - V 4.3.10
    </p>
    <p className='text-xs text-gray-300'>ECommerce - E-Commerece Inc.
    </p>
</div>
<div className='flex text-gray-300'>
        <p className='text-xs'>
Terms & conditions
</p>

    </div>
    <div className='flex   pr-28  text-gray-300 '>
    <p className='text-xs'>Privacy policy</p>

    </div>
    </div>



</div>
  )
}

export default Footer
