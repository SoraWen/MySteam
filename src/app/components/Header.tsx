"use client";
import SigninButton from "@/app/components/SigninButton";
import Link from "next/link";
import React, { useState } from "react";
import { BsSteam } from "react-icons/bs";
import { RiInstallLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import UserCard from "./UserCard"; //測試

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSocialHovered, setIsSocialHovered] = useState(false);
  const { data: session } = useSession();
  //console.log(session);

  return (
    <header className=" p-6 bg-gray-900 text-slate-300 ">
      {/* <p className=" font-bold text-white">I am Header</p> */}

      {/* <UserCard user={session?.user} /> */}
      <div className="mx-auto max-w-4xl flex justify-between items-center">
        <div className=" flex items-center">
          <Link href="/" className=" flex items-center">
            <BsSteam className=" mr-3 w-12 h-12"></BsSteam>
            <p className=" text-2xl font-bold">TSTEAM</p>
          </Link>

          <nav className=" ml-16 flex space-x-4">
            <div
              // onMouseEnter={() => setIsHovered(true)}
              // onMouseLeave={() => setIsHovered(false)}
              className=" relative group" //tailwin設置成group 以下可設置
            >
              <a className="hover:text-gray-50 cursor-pointer">商店</a>
              {/* {isHovered && ( */}
              <div className="group-hover:visible invisible absolute top-full left-0  w-20  bg-gray-700 text-xs  shadow-2xl z-10 ">
                <Link
                  href="/"
                  className=" block hover:bg-gray-300 hover:text-blue-950 p-2"
                >
                  首頁
                </Link>
                <Link
                  href="#"
                  className=" block hover:bg-gray-300 hover:text-blue-950 p-2 cursor-pointer"
                >
                  探索
                </Link>
                <Link
                  href="/gamehope"
                  className=" block hover:bg-gray-300 hover:text-blue-950 p-2"
                >
                  願望清單
                </Link>
                <Link
                  href="#"
                  className=" block hover:bg-gray-300 hover:text-blue-950 p-2 cursor-pointer"
                >
                  點數商店
                </Link>
              </div>
              {/* )} */}
            </div>
            <div
              // onMouseEnter={() => setIsSocialHovered(true)}
              // onMouseLeave={() => setIsSocialHovered(false)}
              className="relative group"
            >
              <a className="hover:text-gray-50 cursor-pointer">社群</a>
              {/* {isSocialHovered && ( */}
              <div className="group-hover:visible invisible absolute top-full left-0  w-20  bg-gray-700 text-xs  shadow-2xl z-10">
                <Link
                  href="/"
                  className=" block hover:bg-gray-300 hover:text-blue-950 p-2"
                >
                  首頁
                </Link>
                <Link
                  href="#"
                  className=" block hover:bg-gray-300 hover:text-blue-950 p-2 cursor-pointer"
                >
                  討論區
                </Link>
                <Link
                  href="#"
                  className=" block hover:bg-gray-300 hover:text-blue-950 p-2 cursor-pointer"
                >
                  工作坊
                </Link>
                <Link
                  href="#"
                  className=" block hover:bg-gray-300 hover:text-blue-950 p-2 cursor-pointer"
                >
                  市集
                </Link>
                <Link
                  href="#"
                  className=" block hover:bg-gray-300 hover:text-blue-950 p-2 cursor-pointer"
                >
                  實況集
                </Link>
              </div>
              {/* )} */}
            </div>
            <a className="hover:text-gray-50 cursor-pointer">關於</a>
            <a className="hover:text-gray-50 cursor-pointer">客服中心</a>
            <a className="hover:text-gray-50 cursor-pointer">
              {session?.user?.name}
            </a>
          </nav>
        </div>

        <div className=" mb-8 flex items-center space-x-2 whitespace-nowrap text-xs">
          <button className=" hover:text-gray-50 p-1 flex items-center bg-lime-700  min-w-[fit-content]">
            <RiInstallLine className=" mr-1 w-4 h-4" />
            <a className="font-bold ">安裝 Steam</a>
          </button>
          <SigninButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
