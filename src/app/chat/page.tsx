"use client";
import { useState } from "react";
import ChatScreenComponent from "@/components/chat-screen";
import VideoChatComponent from "@/components/video-chat-component";
import { useSearchParams } from "next/navigation";

const ChatPage = () => {
  const router = useSearchParams();
  const firstname = router.get("firstname")!;
  const username = router.get("username")!;
  const friend_id = router.get("friend_id")!;

  const initializeCall = () => {};

  return (
    <main className=" h-screen w-screen flex  items-center">
      {/* <VideoChatComponent
        conversationId=""
        microphoneOn={micOn}
        cameraOn={cameraOn}
        localCameraTrack={localCameraTrack!}
        localMicrophoneTrack={localMicrophoneTrack!}
      /> */}
      <ChatScreenComponent
        firstname={firstname}
        username={username}
        friend_id={friend_id}
        initializeCall={initializeCall}
      />
    </main>
  );
};

export default ChatPage;
