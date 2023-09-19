"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

function SigninButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className=" flex items-center gap-3 ml-auto">
        <Image
          src={session.user.image || ""} //!表示typeScript他議定有直
          alt="user image"
          width={32}
          height={32}
        />
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>登出</button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn("google")} className=" ml-auto">
      {/* "google"跳過一個google葉面 */}
      登入
    </button>
  );
}

export default SigninButton;
