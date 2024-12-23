"use client";
import React from 'react'
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-rose-red'>
  
    <div className='grid sm:grid-cols-1  md:grid-cols-2   w-full h-72 pt-12 pl-20 '>
        <div>
        <h1 className='font-serif text-5xl text-white  '>Rossitaa</h1>

        <h4 className='text-gray-300 pt-10'>Social Media</h4>
        <div className="flex space-x-4 text-2xl pt-2">
          <a
            href="https://www.instagram.com/rossitaaflowers/?igsh=NGV6bDZ0eGUwejc1"
            className="text-gray-300"
          >
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-300">
            <AiOutlineFacebook />
          </a>
        </div>

        </div>
        <div className='pr-96'>
            <p className='text-white'>Customer Services</p>
            <p className='text-gray-300'>Contact us</p>
            <p className='text-gray-300'>FAQ</p>
        </div>
        
    
    </div>
    <div className="border-t border-gray-300 h-4 "></div>

    <div className='flex justify-between  pl-28  '>
<div className='mb-3'>
    <p className='text-xs text-gray-300 '>All rights reserved ®-2024 Rossitta Flower - V 4.3.10
    </p>
    <p className='text-xs text-gray-300'>Rossitta - Rossitta Flower Inc.
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
