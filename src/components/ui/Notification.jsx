import React, { useState } from 'react';

const Notification = ({title}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed inset-0 flex items-center justify-center  text-white text-center p-4">
        <div className="bg-blue-600 rounded-lg shadow-lg p-6 max-w-sm w-full relative">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2  text-white font-bold"
          >
            ✖
          </button>
          <p className="text-white">{title}</p>
        
        </div>
      </div>
    )
  );
};

export default Notification;
