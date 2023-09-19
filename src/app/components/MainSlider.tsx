/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaRegCaretSquareDown,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import {
  useAddToWishlistMutation,
  useGetUserByEmailQuery,
} from "@/store/api/bookApi";

interface MainSliderProps {
  images: {
    src: string;
    alt: string;
    author?: string;
    title?: string;
    itemNumber: string;
    itemPrice: number;
    itemUrl?: string;
  }[];
  autoplaySpeed?: number;
  maxImages?: number;
}

function MainSlider(props: MainSliderProps) {
  const { images, autoplaySpeed = 5000, maxImages = Infinity } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  //const sliderRef = useRef<HTMLDivElement>(null);
  //這個 ref 預期會指向一個 HTMLDivElement（即一個 <div> 元素）。但在一開始，它的初始值設為 null
  //HTMLDivElement（即一個 <div> 元素）這是TypeScript的類型
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { data: session } = useSession();

  const [addToWishlist] = useAddToWishlistMutation();
  const userEmail = session?.user?.email;
  const { data: users } = useGetUserByEmailQuery(userEmail || "", {
    skip: !userEmail,
  });
  const user = users?.[0];
  const handleAddToWishlist = (itemNumber: string) => {
    if (!user || !user.id) {
      console.error("User not found!");
      return;
    }

    const currentWishlist = Array.isArray(user.wishlist) ? user.wishlist : [];

    if (currentWishlist.includes(itemNumber)) {
      console.log("ItemNumber already in wishlist!");
      window.alert("此書本已於願望清單");
      console.log(user.wishlist);
      return;
    }

    const updateWishlist = [...currentWishlist, itemNumber];
    try {
      addToWishlist({ userId: user.id, wishlist: updateWishlist }).unwrap();
      window.alert("加入成功");
      console.log(user.wishlist);
    } catch (error) {
      console.error("Erroe", error);
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev < Math.min(images.length, maxImages) - 1 ? prev + 1 : 0
    );
  }, [images.length, maxImages]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, autoplaySpeed);
    return () => {
      //這是一個 "cleanup" 函數。當組件卸載或 currentIndex 改變時，它會執行
      clearInterval(intervalId);
    };
  }, [autoplaySpeed, nextSlide]);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.min(images.length, maxImages) - 1);
    }
  };

  return (
    <div className=" relative w-full max-w-md ">
      <div className="overflow-hidden h-80 relative bg-blue-950 bg-opacity-80 shadow-2xl">
        <div
          className=" flex flex-nowrap transition-transform duration-500 ease-in-out "
          style={{ transform: ` translateX(-${currentIndex * 100}%)` }}
        >
          {images.slice(0, maxImages).map((image, index) => (
            <div
              key={image.itemNumber}
              className=" w-full relative flex-shrink-0 flex"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => {
                setShowMenu(null);
                setHoverIndex(null);
              }}
            >
              <div className=" w-1/2 flex-shrink-0 ">
                <a
                  href={image.itemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className=" w-full  object-cover"
                  />
                </a>
                {/* 條件渲染功能按鈕或圖標 */}
                {session && hoverIndex === index && (
                  <div className=" absolute top-1 left-1 z-10 ">
                    <FaRegCaretSquareDown
                      className=" cursor-pointer hover:text-sky-500"
                      size={20}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation(); //防止冒泡事件
                        e.preventDefault(); //防止外層預設事件

                        setShowMenu(showMenu === index ? null : index);
                      }}
                    />
                    {/* 條件渲染的選單 */}
                    {showMenu === index && (
                      <div className="bg-slate-300 w-28  flex flex-col space-y-1 p-1 rounded-md">
                        <button
                          className="text-left py-1 px-2 text-sky-900 bg-gray-400 rounded-md hover:bg-sky-500 hover:text-white"
                          onClick={() => {
                            handleAddToWishlist(image.itemNumber);
                            //window.open(image.itemUrl, "_blank");
                          }}
                        >
                          新增至願望清單
                        </button>
                        <button
                          className="text-left py-1 px-2 text-sky-900 bg-gray-400 rounded-lg hover:bg-sky-500 hover:text-white"
                          onClick={() => {}}
                        >
                          忽略
                        </button>
                        <button
                          className="text-left py-1 px-2 text-sky-900 bg-gray-400 rounded-lg hover:bg-sky-500 hover:text-white"
                          onClick={() => {}}
                        >
                          偏好方式
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {/* //---- */}
              </div>
              <div className=" w-1/2  p-5 flex flex-col justify-between">
                <div>
                  <h2 className=" text-white text-xl mb-2">{image.title}</h2>
                  <p className=" text-white">作者:{image.author}</p>
                </div>
                <div className=" text-white mb-10">${image.itemPrice}円</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" absolute mt-3 left-1/2 transform -translate-x-1/2 flex space-x-1 mb-3">
        {images.slice(0, maxImages).map((image, index) => (
          <span
            key={image.itemNumber}
            onClick={() => setCurrentIndex(index)}
            className={` cursor-pointer w-4 h-2 rounded-sm ${
              currentIndex === index ? "bg-slate-200" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -left-10 transform -translate-y-1/2 text-white p-3 bg-gradient-to-r from-gray-950 hover:from-slate-500 to-transparent "
      >
        <FaChevronLeft className=" w-4 h-16" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -right-10 transform -translate-y-1/2 text-white p-3 bg-gradient-to-l from-gray-950 hover:from-slate-500 to-transparent "
      >
        <FaChevronRight className=" w-4 h-16" />
      </button>
    </div>
  );
}

export default MainSlider;
