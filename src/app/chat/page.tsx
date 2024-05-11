"use client";
import { useRef, useState } from "react";
import ChatScreenComponent from "@/components/chat-screen";
import VideoChatComponent from "@/components/video-chat-component";
import { useSearchParams } from "next/navigation";
import { stunServers } from "@/utils/stunServers";

const ChatPage = () => {
  const router = useSearchParams();
  const firstname = router.get("firstname")!;
  const username = router.get("username")!;
  const friend_id = router.get("friend_id")!;
  let peerConnection: RTCPeerConnection | undefined;
  let localStream: MediaStream | undefined;
  let remoteStream: MediaStream | undefined;

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const initializeCall = async () => {
    peerConnection = new RTCPeerConnection(stunServers);
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    remoteStream = new MediaStream();
    remoteVideoRef.current!.srcObject = remoteStream;

    if (localVideoRef === null) return;
    localVideoRef.current!.srcObject = localStream;

    // add all tracks to the peerconnection
    localStream.getTracks().forEach((track) => {
      peerConnection?.addTrack(track, localStream!);
    });

    peerConnection?.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        console.log(event.candidate);
      }
    });

    peerConnection?.addEventListener("track", (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream!.addTrack(track);
      });
    });

    // so now we are gonna create an offer
    const localOffer = await peerConnection.createOffer();

    // set the localDescription for the connection
    await peerConnection.setLocalDescription(localOffer);

    // talk to the stun servers to give us our ice candidates
  };

  return (
    <main className=" h-screen w-screen flex  items-center">
      <VideoChatComponent name="" ref={localVideoRef} />
      <ChatScreenComponent
        firstname={firstname}
        username={username}
        friend_id={friend_id}
        initializeCall={initializeCall}
      />
      <div className="w-[300px]">
        <video ref={remoteVideoRef} className="w-full h-auto" autoPlay muted />
      </div>
    </main>
  );
};

export default ChatPage;
