"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const SideBarComponent = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return;
  const users = useQuery(api.userQuery.getActiveUsers, {});

  return (
    <div className="p-[30px] bg-white">
      {user && <p>You are signed in as {user.username}</p>}
      <SignOutButton />
      <h1 className="">Active Users</h1>
      <div className="">
        {users?.map((user, index) => {
          return (
            <Link
              href={`/chat?friend_id=${user.userId}&username=${user.username}&firstname=${user.firstname}`}
              key={index}
            >
              <p className="font-bold mb-5">
                {user.firstname} {user.lastname}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBarComponent;
