"use client";
import React from "react";
import { FaRegCircleDot } from "react-icons/fa6";

const Sidebar = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-700 text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 shadow-lg z-50`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4  text-white hover:text-gray-400"
      >
        <FaRegCircleDot />
      </button>
      {children}
    </div>
  );
};

export default Sidebar;
