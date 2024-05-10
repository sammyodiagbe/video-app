import { Phone, PhoneCall, Send, Video } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
type ChatScreenComponentType = {
  username: string;
  firstname: string;
  lastname?: string;
  friend_id: string;
};

const ChatScreenComponent: React.FC<ChatScreenComponentType> = ({
  firstname,
  friend_id,
  username,
}) => {
  return (
    <div className="flex flex-col h-full w-[600px] py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-[50px] w-[50px] flex justify-center items-center font-bold bg-slate-600 text-white rounded-full">
            {firstname[0].toUpperCase()}
          </div>
          <div className="ml-[20px]">
            <h3>
              {firstname}@{username}
            </h3>
          </div>
        </div>

        <div className="videos">
          <Button variant={"link"}>
            <Phone />
          </Button>
          <Button variant={"link"}>
            <Video />
          </Button>
        </div>
      </div>
      <div className="flex-1 "></div>
      <div className="flex items-center p-5 mx-2 bg-white rounded-lg">
        <Input
          placeholder="Type a message"
          className=" border-transparent outline-transparent bg-transparent flex-1 mr-2 resize-none focus:border-transparent focus:outline-none ring-0 focus:ring-0"
        />
        <Button className={"h-[55px] w-[55px]"}>
          <Send className="h-[30px] w-[30px]" />
        </Button>
      </div>
    </div>
  );
};

export default ChatScreenComponent;
