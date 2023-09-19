"use client";
import React from "react";
import { useSearchEbooksQuery } from "@/store/api/koboApi";

interface WishlistProps {
  wishlist: string[];
}

const Wishlist: React.FC<WishlistProps> = ({ wishlist }) => {
  return (
    <div className="w-4/5 bg-blue-950  space-y-2">
      {wishlist.map((keyword) => (
        <WishlistItem key={keyword} keyword={keyword} />
      ))}
    </div>
  );
};

const WishlistItem: React.FC<{ keyword: string }> = ({ keyword }) => {
  const { data, error, isLoading } = useSearchEbooksQuery(keyword);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading item</div>;

  const book = data?.Items[0]?.Item;

  return (
    <div className="p-4 flex items-center">
      <img src={book?.mediumImageUrl} alt={book?.author} />
      <div className="ml-4 w-[700px]">
        <h3 className="text-xl font-bold">{book?.title}</h3>
        <p className="text-gray-600">作者: {book?.author}</p>
        <p className="text-gray-600">發售日期: {book?.salesDate}</p>
        <p className=" mt-2 text-right">${book?.itemPrice}円</p>
      </div>
    </div>
  );
};

export default Wishlist;
