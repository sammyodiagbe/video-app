"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatScreenComponent from "@/components/chat-screen";
import VideoChatComponent from "@/components/video-chat-component";
import { useSearchParams } from "next/navigation";
import { stunServers } from "@/utils/stunServers";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SignalType } from "@/utils/types";
import { decodeJson, encodeJson } from "@/utils/utils";

const ChatPage = () => {
  const router = useSearchParams();
  const sendSignal = useAction(api.signalAction.sendSignal);
  const initConversation = useAction(api.queryActions.createNewConversation);
  const [inACall, setInACall] = useState(false);
  const firstname = router.get("firstname")!;
  const username = router.get("username")!;
  const friend_id = router.get("friend_id")!;
  let [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>();
  let [initialized, setInitialized] = useState(false);
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
    initializeCall();
    return () => {};
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

  const handleConnection = async (signals: SignalType[]) => {
    if (inACall) return;
    if (signals.length) {
      let temp = [...signals];
      if (!peerConnection) {
        initializeCall();
      }
      temp.forEach((signal) => {
        const { type, data } = signal;
        switch (type) {
          case "offer":
            // setup and answer from the user
            createAnswer(data);
            break;
          case "candidate":
            // set up the candidate
            const decoded = decodeJson(data);
            addIceCandidate(decoded);
            break;
          case "answer":
            // so we are gonna connect the two users;
            connectConnections(data);
            break;
          default:
            break;
        }
      });
    }
  };
  const initializeCall = async () => {
    const pc = new RTCPeerConnection(stunServers);
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    remoteStream = new MediaStream();
    remoteVideoRef.current!.srcObject = remoteStream;

    if (localVideoRef === null) return;
    localVideoRef.current!.srcObject = localStream;

    // add all tracks to the peerconnection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream!);
    });

    pc.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        const encode = encodeJson(event.candidate);
        signal("candidate", conversationId, username, encode);
      }
    });

    pc.addEventListener("track", (event) => {
      console.log(event);
      event.streams[0].getTracks().forEach((track) => {
        remoteStream!.addTrack(track);
      });
    });

    setPeerConnection(pc);
    // so now we are gonna create an offer
    // talk to the stun servers to give us our ice candidates
  };

  const initializeAndCreateOffer = async () => {
    const localOffer = await peerConnection?.createOffer();
    const jsonencode = encodeJson(localOffer);
    // set the localDescription for the connection
    await peerConnection?.setLocalDescription(localOffer);
    signal("offer", conversationId, username, jsonencode);
  };

  const createAnswer = async (data: string) => {
    const decoded = decodeJson(data);

    await peerConnection?.setRemoteDescription(decoded);
    const answer = await peerConnection?.createAnswer();
    await peerConnection?.setLocalDescription(answer);
    const codedAnswer = encodeJson(answer);
    signal("answer", conversationId, username, codedAnswer);
  };

  const addIceCandidate = async (decoded: any) => {
    await peerConnection?.addIceCandidate(decoded.candidate);
  };

  const connectConnections = async (data: string) => {
    const json = decodeJson(data);

    // remoteVideoRef.current?.srcObject = remoteStream!;
    if (!peerConnection?.currentRemoteDescription) {
      await peerConnection?.setRemoteDescription(json);
    }
  };

  // used to send signals
  const signal = (
    type: string,
    conversationId: string,
    reciever: string,
    data: string
  ) => {
    sendSignal({ type, conversationId, reciever, data });
  };

  return (
    <main className=" h-screen w-screen flex  items-center">
      <VideoChatComponent
        name=""
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
      />
      <ChatScreenComponent
        firstname={firstname}
        username={username}
        friend_id={friend_id}
        initializeCall={initializeAndCreateOffer}
        conversationId={conversationId}
      />
    </main>
  );
};

export default ChatPage;
