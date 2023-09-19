import React from "react";
import { DefaultSession } from "next-auth"; //預設給session的type

function UserCard({ user }: { user: DefaultSession["user"] }) {
  return (
    <div>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.image}</p>
    </div>
  );
}

export default UserCard;
