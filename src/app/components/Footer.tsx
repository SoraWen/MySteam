import React from "react";
import { IoLogoSteam, IoLogoFacebook } from "react-icons/io";

function Footer() {
  return (
    <footer className="bg-gray-900 text-slate-300 py-8 text-xs">
      <div className="container mx-auto px-4">
        <div className=" border-t border-b border-gray-400 py-1 flex justify-between">
          <div className=" space-x-4">
            <a className="text-gray-400 ">
              © 2023 Valve Corporation.
              版權所有。所有商標皆為各自所有權人在美國與其他國家 (地區) 之財產。
              所有價格均包含增值稅（如適用）。
            </a>
            <a href="/privacy-policy" className="hover:text-gray-50">
              隱私權政策
            </a>
            <span>|</span>
            <a href="/legal" className="hover:text-gray-50">
              法律聲明
            </a>
            <span>|</span>
            <a href="/subscriber-agreement" className="hover:text-gray-50">
              Steam 訂戶協議
            </a>
            <span>|</span>
            <a href="/refunds" className="hover:text-gray-50">
              退款
            </a>
            <span>|</span>
            <a href="/cookies" className="hover:text-gray-50">
              Cookie
            </a>
          </div>
          <div className=" ml-10">
            <IoLogoSteam className=" w-12 h-10" />
          </div>
        </div>
        <div className=" flex py-2 divide-x">
          <a href="/privacy-policy" className="hover:text-gray-50 px-3">
            關於 Valve
          </a>

          <a href="/legal" className="hover:text-gray-50 px-3">
            人才招募
          </a>

          <a href="/subscriber-agreement" className="hover:text-gray-50 px-3">
            Steamworks
          </a>

          <a href="/refunds" className="hover:text-gray-50 px-3">
            Steam 發行
          </a>

          <a href="/cookies" className="hover:text-gray-50 px-3">
            客服中心
          </a>

          <a href="/cookies" className="hover:text-gray-50 px-3">
            禮物卡
          </a>

          <a
            href="https://www.facebook.com/Steam"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-50 flex items-center px-3"
          >
            <IoLogoFacebook /> Steam
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
