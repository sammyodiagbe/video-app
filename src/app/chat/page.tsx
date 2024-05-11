"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatScreenComponent from "@/components/chat-screen";
import VideoChatComponent from "@/components/video-chat-component";
import { useSearchParams } from "next/navigation";
import { stunServers } from "@/utils/stunServers";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SignalType } from "@/utils/types";

const ChatPage = () => {
  const router = useSearchParams();
  const sendSignal = useAction(api.signalAction.sendSignal);
  const initConversation = useAction(api.queryActions.createNewConversation);

  const firstname = router.get("firstname")!;
  const username = router.get("username")!;
  const friend_id = router.get("friend_id")!;
  let peerConnection: RTCPeerConnection | undefined;
  let localStream: MediaStream | undefined;
  let remoteStream: MediaStream | undefined;
  const [conversationId, setConversationId] = useState("");
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const signals = useQuery(
    api.querySignals.querySignals,
    conversationId
      ? {
          conversationId,
          username: username,
        }
      : "skip"
  );

  const initializeConvo = useCallback(async () => {
    const convoId = await initConversation({
      friend_username: router.get("username")!,
    });
    setConversationId(convoId!);
  }, []);

  useEffect(() => {
    return () => {
      initializeConvo();
      console.log("I should run once");
    };
  }, []);

  useEffect(() => {
    handleConnection(signals!);
    return () => {};
  }, [signals]);

  const handleConnection = (signals: SignalType[]) => {
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection(stunServers);
    }
    signals.forEach((signal) => {
      const { type, data } = signal;
      const decodejson = JSON.parse(data);
      switch (type) {
        case "offer":
          // setup and answer from the user
          console.log("offer has been recieved");
          console.log(decodejson);
          break;
        case "candidate":
          // set up the candidate
          break;
        case "answer":
          // so we are gonna connect the two users;
          break;
        default:
          break;
      }
    });
  };
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
        const encode = JSON.stringify(event.candidate);
        sendSignal({
          type: "candidate",
          conversationId: conversationId,
          reciever: username,
          data: encode,
        });
      }
    });

    peerConnection?.addEventListener("track", (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream!.addTrack(track);
      });
    });

    // so now we are gonna create an offer
    const localOffer = await peerConnection.createOffer();
    const jsonencode = JSON.stringify(localOffer);
    // set the localDescription for the connection
    await peerConnection.setLocalDescription(localOffer);
    sendSignal({
      type: "offer",
      conversationId: conversationId,
      reciever: username,
      data: jsonencode,
    });
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
        conversationId={conversationId}
      />
      <div className="w-[300px]">
        <video ref={remoteVideoRef} className="w-full h-auto" autoPlay muted />
      </div>
    </main>
  );
};

export default ChatPage;
