import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { FaRegCaretSquareDown } from "react-icons/fa";
import {
  useAddToWishlistMutation,
  useGetUserByEmailQuery,
} from "@/store/api/bookApi";
import clsx from "clsx"; //使你的 CSS 類名邏輯變得更加乾淨

interface ListProps {
  bookdata: {
    src: string;
    alt: string;
    title?: string;
    itemNumber: string;
    itemPrice: number;
    itemUrl?: string;
    itemCaption?: string;
  }[];
  limit: number;
}
interface stringProps {
  str?: string;
  num: number;
}

//限制字數----------已不需要
function truncateString({ str, num }: stringProps) {
  if (!str) {
    return "";
  } else if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "......";
}
//限制字數----------

function BookMenu({ bookdata, limit }: ListProps) {
  const [addToWishlist] = useAddToWishlistMutation();
  const { data: session } = useSession();

  const [activeIndex, setActiveIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  //const [showIcon, setShowIcon] = useState(false);
  const activeItem = bookdata[activeIndex] || {};

  const userEmail = session?.user?.email;
  const { data: users } = useGetUserByEmailQuery(userEmail || "", {
    skip: !userEmail,
  });
  //{ skip: !userEmail }：這是一個配置對象，其中的skip屬性用於決定是否執行此查詢。如果userEmail為偽（比如為undefined或null），!userEmail會為true，所以查詢會被跳過，這確保了只有在有有效的userEmail時才會執行查詢。

  // 從數組中獲取第一個用戶
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

  //-----測試用
  const asd = () => {
    console.log(session);
  };
  //-----------
  return (
    <div className="flex w-[900px] ">
      {/* 左側的清單 */}
      <div className="w-3/5 bg-blue-950  space-y-2">
        {bookdata.slice(0, limit).map((item, index) => (
          <a
            key={item.itemNumber}
            href={item.itemUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              onMouseEnter={() => {
                setActiveIndex(index);
              }}
              //onMouseLeave={() => setActiveIndex(null)}
              className={clsx(
                "relative cursor-pointer  p-2 flex items-center space-x-2",
                activeIndex === index ? "bg-gray-700" : "bg-blue-950 opacity-70"
              )}
              // onClick={(e) => {
              //   e.stopPropagation(); //防止冒泡事件
              //   e.preventDefault(); //防止外層預設事件
              // }}
            >
              <img src={item.src} alt={item.alt} />
              <p className=" text-base font-bold">{item.title}</p>
              {/* 條件渲染功能按鈕或圖標 */}
              {session && activeIndex === index && (
                <div
                  className=" absolute top-1 left-1 z-10 "
                  onMouseLeave={() => setShowMenu(false)}
                >
                  <FaRegCaretSquareDown
                    className=" cursor-pointer hover:text-sky-500"
                    size={20}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation(); //防止冒泡事件
                      e.preventDefault(); //防止外層預設事件
                      setShowMenu(!showMenu);
                    }}
                  />
                  {/* 條件渲染的選單 */}
                  {showMenu && (
                    <div className="bg-slate-300 w-28  flex flex-col space-y-1 p-1 rounded-md">
                      <button
                        className="text-left py-1 px-2 text-sky-900 bg-gray-400 rounded-md hover:bg-sky-500 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation(); //防止冒泡事件
                          e.preventDefault(); //防止外層預設事件
                          handleAddToWishlist(item.itemNumber);
                        }}
                      >
                        新增至願望清單
                      </button>
                      <button
                        className="text-left py-1 px-2 text-sky-900 bg-gray-400 rounded-lg hover:bg-sky-500 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation(); //防止冒泡事件
                          e.preventDefault(); //防止外層預設事件
                          //window.open(item.itemUrl, "_blank");
                          asd();
                        }}
                      >
                        忽略
                      </button>
                      <button
                        className="text-left py-1 px-2 text-sky-900 bg-gray-400 rounded-lg hover:bg-sky-500 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation(); //防止冒泡事件
                          e.preventDefault(); //防止外層預設事件
                        }}
                      >
                        偏好方式
                      </button>
                    </div>
                  )}
                </div>
              )}
              {/* //---- */}
            </div>
          </a>
        ))}
      </div>

      {/* 右側的資訊 */}
      <div className="w-2/5 bg-gray-700 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">{activeItem.title}</h2>
        <p className="line-clamp-[10]">
          {/* 直接限制文字行數 */}
          {activeItem.itemCaption}
          {/* {truncateString({
            str: activeItem.itemCaption,
            num: 800,
          })} */}
        </p>
        <p className="mt-auto text-right text-2xl">${activeItem.itemPrice}円</p>
      </div>
    </div>
  );
}

export default BookMenu;
