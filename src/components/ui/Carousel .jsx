'use client';
import { useState, useEffect } from 'react';

const Carousel = ({ items, imageSize = "w-full h-[500px] md:h-[600px] lg:h-[600px]", interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle next item
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // Function to handle previous item
  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  // Effect to handle automatic sliding
  useEffect(() => {
    const autoSlide = setInterval(handleNext, interval);

    // Clear interval on component unmount
    return () => clearInterval(autoSlide);
  }, [interval]);

  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="min-w-full flex-shrink-0">
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={`Carousel item ${index}`}
                className={`${imageSize} object-cover`}
              />
            ) : (
              <video
                src={item.src}
                controls
                className={`${imageSize} object-cover`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md"
      >
        ❯
      </button>

      {/* Pagination */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
