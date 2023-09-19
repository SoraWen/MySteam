"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
interface SecondSliderProps {
  images: {
    src: string;
    alt: string;
    //author?: string;
    itemNumber: string;
    itemPrice: number;
    itemUrl?: string;
  }[];
  maxPages?: number;
}

function SecondSlider({ images, maxPages = Infinity }: SecondSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const groupedImage = useMemo(() => {
    return Array(Math.ceil(images.length / 4))
      .fill([])
      .map((_, index) => images.slice(index * 4, (index + 1) * 4));
  }, [images]);

  console.log(groupedImage);

  const totalPages = Math.ceil(images.length / 4);
  //Math.ceil() 是 JavaScript 中的一個數學函數，用於將給定的數字向上取整到最接近的整數

  // useEffect(() => {
  //   setOpacity(0.4);
  //   const timer = setTimeout(() => {
  //     setOpacity(1);
  //   }, 400);
  //   return () => clearTimeout(timer);
  // }, [currentIndex]);

  const nextSlide = () => {
    const nextPage = currentIndex + 1;
    if (nextPage < Math.min(totalPages, maxPages)) {
      setCurrentIndex(nextPage);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    const prevPage = currentIndex - 1;
    if (prevPage >= 0) {
      setCurrentIndex(prevPage);
    } else {
      setCurrentIndex(Math.min(totalPages, maxPages) - 1);
      //目的是為了確保當前頁面的索引不會超過設定的最大頁面數量 maxPages
    }
  };

  const selectPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex);
  };

  const displayImages = groupedImage[currentIndex] || [];
  //起始索引和終止索引。起始索引包含在新陣列中，而終止索引則不包含

  //console.log({ displayImages, images });

  return (
    // <div className=""></div>
    <div className="relative w-full m-auto h-full">
      <div className="flex w-[700px] h-96 overflow-hidden transition-opacity duration-300 ease-linear">
        <div className="grow-[3] shrink basis-0 min-w-0 flex justify-between">
          {displayImages.slice(0, 2).map((image) => (
            <a
              key={image.itemNumber + "-link"}
              href={image.itemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 h-full block mr-2 animate-[fadeIn_0.7s]"
            >
              <img
                key={image.itemNumber}
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover "
              />
            </a>
          ))}
        </div>
        <div className="grow shrink basis-0 min-w-0 flex flex-col justify-between">
          {displayImages.slice(2).map((image) => (
            <a
              key={image.itemNumber + "-link"}
              href={image.itemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-1/2 block mb-2 animate-[fadeIn_0.7s]"
            >
              <img
                key={image.itemNumber}
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover "
              />
            </a>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -left-10 transform -translate-y-1/2 text-white p-3 bg-gradient-to-r from-gray-950 to-transparent  hover:from-slate-500 to-transparent"
      >
        <FaChevronLeft className=" w-4 h-16" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -right-10 transform -translate-y-1/2 text-white p-3 bg-gradient-to-l from-gray-950 to-transparent hover:from-slate-500 to-transparent"
      >
        <FaChevronRight className=" w-4 h-16" />
      </button>
      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {Array.from({ length: Math.min(totalPages, maxPages) }).map(
          (_, index) => (
            <span
              key={index}
              onClick={() => selectPage(index)}
              className={`cursor-pointer w-4 h-2 rounded-sm ${
                currentIndex === index ? "bg-slate-200" : "bg-gray-600"
              }`}
            ></span>
          )
        )}
      </div>
    </div>
  );
}

export default SecondSlider;
