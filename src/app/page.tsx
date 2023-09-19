"use client";
import UserCard from "./components/UserCard";
//import { useGetGameDetailsQuery } from "@/store/api/steamApi";
import { useSearchEbooksQuery } from "@/store/api/koboApi";
import LeftSidebar from "./components/LeftSidebar";
import Image from "next/image";
import MainSlider from "./components/MainSlider";
import SecondSlider from "./components/SecondSlider";
import BookMenu from "./components/BookMenu";
import { useMemo } from "react";

function Home() {
  const { data, error, isLoading } = useSearchEbooksQuery("本");

  const {
    data: secondData,
    error: secondError,
    isLoading: secondIsLoading,
  } = useSearchEbooksQuery("PHP研究所");

  const {
    data: newBook,
    error: newBookError,
    isLoading: newBookIsLoading,
  } = useSearchEbooksQuery("2023年8月");
  // 這裡我們使用了 optional chaining 和 nullish coalescing 來確保資料存在
  const images =
    data?.Items.map((item) => ({
      src: item.Item.largeImageUrl,
      alt: item.Item.author,
      title: item.Item.title,
      author: item.Item.author,
      itemNumber: item.Item.itemNumber,
      itemPrice: item.Item.itemPrice,
      itemUrl: item.Item.itemUrl,
    })) ?? [];

  const images2 = useMemo(() => {
    return (
      secondData?.Items.map((item) => ({
        src: item.Item.largeImageUrl,
        alt: item.Item.author,
        itemNumber: item.Item.itemNumber,
        itemPrice: item.Item.itemPrice,
        itemUrl: item.Item.itemUrl,
      })) ?? []
    );
  }, [secondData?.Items]);

  const bookdata =
    newBook?.Items.map((item) => ({
      src: item.Item.mediumImageUrl,
      alt: item.Item.author,
      title: item.Item.title,
      itemNumber: item.Item.itemNumber,
      itemCaption: item.Item.itemCaption,
      itemPrice: item.Item.itemPrice,
      itemUrl: item.Item.itemUrl,
    })) ?? [];
  // let images;
  // if (isLoading) {
  //   images = <div>Loading...</div>;
  // } else if (error) {
  //   images = <div>Error</div>;
  // } else {
  //   images = (
  //     <div>
  //       {data?.Items.map((item) => (
  //         <div key={item.Item.itemNumber}>
  //           <img src={item.Item.mediumImageUrl} alt={item.Item.author} />
  //           <h2>{item.Item.author}</h2>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gray-900 text-slate-300 text-xs min-h-screen flex justify-center py-8">
      <LeftSidebar className="max-xl:hidden w-64 px-10 py-6 mr-1" />
      <div className="flex flex-col w-full max-w-screen-lg p-4">
        {/* Header: Featured & Specials */}
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">精選與推薦</h1>
        </div>

        {/* Game Carousel */}

        <div className=" mx-auto mb-10">
          <MainSlider images={images} maxImages={10} />
        </div>
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">PHP研究所出版</h1>
        </div>
        <div className=" mx-auto mb-20">
          <SecondSlider images={images2} maxPages={4} />
        </div>
        <div className=" mx-auto mb-10">
          <BookMenu bookdata={bookdata} limit={6} />
        </div>
      </div>
    </div>
  );
}

export default Home;
