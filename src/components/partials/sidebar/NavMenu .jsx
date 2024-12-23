"use client";
import React from "react";

const NavMenu = ({ title, children }) => {
  return (
    <div className="p-4 border-b border-gray-600">
      <div className="text-lg font-semibold  ">{title}</div>
      <div className="mt-2 space-y-2 ">{children}</div>
    </div>
  );
};

export default NavMenu;
