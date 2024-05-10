"use client";

import ChatScreenComponent from "@/components/chat-screen";
import { useSearchParams } from "next/navigation";

const ChatPage = () => {
  const router = useSearchParams();
  const firstname = router.get("firstname")!;
  const username = router.get("username")!;
  const friend_id = router.get("friend_id")!;
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <ChatScreenComponent
        firstname={firstname}
        username={username}
        friend_id={friend_id}
      />
    </main>
  );
};

export default ChatPage;
