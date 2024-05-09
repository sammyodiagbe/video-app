"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const SideBarComponent = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return;

  console.log(user);

  const users = useQuery(api.userQuery.getActiveUsers, {
    username: user?.username!,
  });

  console.log(users);
  return (
    <div className="p-[30px] bg-white">
      <h1 className="">Active Users</h1>
      <div className="">
        {users?.map((user, index) => {
          return (
            <p className="font-bold mb-5" key={index}>
              {user.firstname} {user.lastname}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default SideBarComponent;
