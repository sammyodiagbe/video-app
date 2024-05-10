"use client";

import { Phone, PhoneCall, Send, Video } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useSearchParams } from "next/navigation";
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
  const conversation = useAction(api.queryActions.createNewConversation);
  const send = useAction(api.messageActions.sendMessage);
  const search = useSearchParams();
  const [conversationId, setConversationId] = useState("");
  const [message, setMessage] = useState<string>("");
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const initializeConvo = useCallback(async () => {
    const convoId = await conversation({
      friend_username: search.get("username")!,
    });
    setConversationId(convoId!);
  }, []);

  const messages = useQuery(
    api.messageQuery.getMessages,
    conversationId ? { conversationId } : "skip"
  );

  const sendMessage = async () => {
    if (!conversationId || !message || message.trim() === "") return;
    await send({ conversationId, message });
    setMessage("");
  };
  useEffect(() => {
    return () => {
      initializeConvo();
      console.log("I should run once");
    };
  }, []);

  useEffect(() => {
    if (conversationId !== null) {
      const chatElement = conversationRef.current!;
      chatElement.scrollTo({
        top: chatElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
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
      <div ref={conversationRef} className="flex-1 overflow-y-auto">
        {!messages?.length ? (
          <p>No message</p>
        ) : (
          messages.map((entry, index) => {
            const { message } = entry;
            return <p key={index}>{message}</p>;
          })
        )}
      </div>
      <div className="flex items-center p-5 mx-2 bg-white rounded-lg">
        <Input
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=" border-transparent outline-transparent bg-transparent flex-1 mr-2 resize-none focus:border-transparent focus:outline-none ring-0 focus:ring-0"
        />
        <Button className={"h-[55px] w-[55px]"} onClick={() => sendMessage()}>
          <Send className="h-[30px] w-[30px]" />
        </Button>
      </div>
    </div>
  );
};

export default ChatScreenComponent;
