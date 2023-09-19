import React from "react";

interface LeftSidebarProps {
  className?: string;
}

function LeftSidebar(props: LeftSidebarProps) {
  const { className } = props;
  return (
    <aside className={className}>
      <ul>
        <li className=" flex flex-col mb-2  p-2 rounded">
          <a className="mb-2 text-sm text-gray-500">推薦</a>
          <a href="#" className="mb-1 hover:text-sky-500	">
            好友
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            鑑賞家
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            標籤
          </a>
          <a href="/gamehope" className="mb-1 hover:text-sky-500">
            願望清單
          </a>
        </li>
        <li className=" flex flex-col mb-2  p-2 rounded">
          <a className="mb-2 text-sm text-gray-500">瀏覽分類</a>
          <a href="#" className="mb-1 hover:text-sky-500	">
            暢銷商品
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            新推出
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            特惠
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            VR 相關產品
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            支援控制器
          </a>
        </li>
        <li className=" flex flex-col mb-2  p-2 rounded">
          <a className="mb-2 text-sm text-gray-500">依類型瀏覽</a>
          <a href="#" className="mb-1 hover:text-sky-500	">
            免費遊玩
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            搶先體驗
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            休閒
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            冒險
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            動作
          </a>
          <a href="#" className="mb-1 hover:text-sky-500">
            大型多人
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default LeftSidebar;
