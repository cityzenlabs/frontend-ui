import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";

const ICarousel = ({ imageUrls }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: any) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1,
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const hasImages = Array.isArray(imageUrls) && imageUrls.length > 0;

  return (
    <div
      id="controls-carousel"
      className="relative w-full"
      data-carousel="static"
    >
      <div className="relative  overflow-hidden rounded-lg h-[50vh] ">
        {hasImages ? (
          imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out ${
                index === activeIndex ? "block" : "hidden"
              }`}
              data-carousel-item
            >
              <img
                src={imageUrl}
                className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={`Slide ${index}`}
              />
            </div>
          ))
        ) : (
          <div className="border flex justify-center items-center w-full h-full">
            <CameraIcon className="w-20 h-20 text-gray-500" />
          </div>
        )}
      </div>
      <div className="absolute z-30 flex space-x-3 rtl:space-x-reverse bottom-5 left-1/2 -translate-x-1/2">
        {hasImages &&
          imageUrls.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
      </div>
      {hasImages && (
        <>
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={goToPrevSlide}
            data-carousel-prev
          >
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={goToNextSlide}
            data-carousel-next
          >
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default ICarousel;
