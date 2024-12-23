'use client';
import React, { useState } from "react";
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";

const SubMenu = ({ label, icon: Icon, subItems, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={toggleSubMenu}
        className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-800 rounded"
      >
        {Icon && <Icon className="mr-3 text-xl" />}
        <span>{label}</span>
        {subItems && (
          <span className="ml-auto">
            {isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}
          </span>
        )}
      </div>

      {isOpen && subItems && (
        <div className="ml-6 mt-2 space-y-2">
          {subItems.map((subItem, index) => (
            <div
              key={index}
              onClick={() => onClick(subItem.path)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-800 rounded"
            >
              {subItem.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubMenu;
