// ScrollableList.js
"use client";
import React from 'react';
import Image from 'next/image';

const ScrollableList = ({ items, height = '300px' }) => {
  return (
    <div
      className={`overflow-y-auto border border-gray-300 rounded-lg`}
      style={{ height }}
    >
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="p-4 hover:bg-gray-100">
            <h2 className="font-bold">{item.name}</h2>
            <p>{item.description}</p>
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={200}
              height={200}
              unoptimized
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollableList;
