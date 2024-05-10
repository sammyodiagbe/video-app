"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const SideBarComponent = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return;
  const users = useQuery(api.userQuery.getActiveUsers, {});
  console.log(users);
  return (
    <div className="p-[30px] bg-white">
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
