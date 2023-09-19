"use client";
import React from "react";
import { Image } from "next/dist/client/image-component";
import { useSearchEbooksQuery } from "@/store/api/koboApi";
import { useSession } from "next-auth/react";
import { useGetUserByEmailQuery } from "@/store/api/bookApi";
import Wishlist from "../components/Wishlist";

function Gamehope() {
  const { data: session } = useSession();

  const userEmail = session?.user?.email;
  const { data: users } = useGetUserByEmailQuery(userEmail || "", {
    skip: !userEmail,
  });
  const user = users?.[0];
  //console.log(user);
  if (!user) {
    return (
      <div className="bg-gray-900 text-slate-300 text-3xl min-h-screen flex justify-center py-8">
        <h1>No user found</h1>
      </div>
    );
  }
  const currentWishlist = Array.isArray(user.wishlist) ? user.wishlist : [];

  return (
    <div className="bg-gray-900 text-slate-300 text-xs min-h-screen flex justify-center py-8">
      <div className="flex flex-col w-full max-w-screen-lg p-4">
        <div className="flex items-center space-x-4 mb-6 ">
          <Image
            src={session?.user?.image || ""} //!表示typeScript他議定有直
            alt="user image"
            width={50}
            height={50}
          />
          <h1 className="text-white text-3xl font-bold">
            {session?.user?.name} 的願望清單
          </h1>
        </div>
        <div className=" mx-auto mb-10 mt-5">
          <Wishlist wishlist={currentWishlist} />
        </div>
      </div>
    </div>
  );
}

export default Gamehope;
