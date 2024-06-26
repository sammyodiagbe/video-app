"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import ChatScreenComponent from "@/components/chat-screen";
import VideoChatComponent from "@/components/video-chat-component";
import { useSearchParams } from "next/navigation";
import { stunServers } from "@/utils/stunServers";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SignalType } from "@/utils/types";
import { decodeJson, encodeJson } from "@/utils/utils";
import PhoneRingingComponent from "@/components/phone_ringing";
import { toast } from "@/components/ui/use-toast";
import VideoCallWrapper from "../../components/videoCallWrapper";

const ChatPage = () => {
  const fetchOrCreateId = useAction(api.queryActions.createNewConversation);
  const searchParams = useSearchParams();
  const friendUsername = searchParams.get("username");
  const firtsname = searchParams.get("firstname");
  const [conversationId, setConversationId] = useState<string | null>();

  useEffect(() => {
    const getConversationId = async () => {
      const convoId = await fetchOrCreateId({
        friend_username: friendUsername!,
      });

      setConversationId(convoId);
    };

    getConversationId();
  }, []);
  // const router = useSearchParams();
  // const sendSignal = useAction(api.signalAction.sendSignal);
  // const initConversation = useAction(api.queryActions.createNewConversation);
  // const [inACall, setInACall] = useState(false);
  // const firstname = router.get("firstname")!;
  // const username = router.get("username")!;
  // const friend_id = router.get("friend_id")!;
  // const [incomingCall, setIncomingCall] = useState(false);
  // let [peerConnection, setPeerConnection] =
  //   useState<RTCPeerConnection | null>();
  // let [initialized, setInitialized] = useState(false);
  // const [calling, setCalling] = useState(false);
  // let localStream: MediaStream | undefined;
  // let remoteStream: MediaStream | undefined;
  // const localVideoRef = useRef<HTMLVideoElement>(null);
  // const remoteVideoRef = useRef<HTMLVideoElement>(null);
  // const [remoteAnswer, setRemoteAnswer] = useState<string | null>(null);
  // const signals = useQuery(
  //   api.querySignals.querySignals,
  //   conversationId
  //     ? {
  //         conversationId,
  //         username: username,
  //       }
  //     : "skip"
  // );

  // useEffect(() => {
  //   initializeCall();

  //   return () => {
  //     peerConnection?.close();
  //     setPeerConnection(null);
  //   };
  // }, [conversationId]);

  // useEffect(() => {
  //   handleConnection(signals!);
  //   return () => {};
  // }, [signals]);

  // const handleConnection = async (signals: SignalType[]) => {
  //   if (inACall || !signals) return;
  //   if (signals.length) {
  //     let temp = [...signals];
  //     if (!peerConnection) {
  //       initializeCall();
  //     }
  //     temp.forEach((signal) => {
  //       const { type, data } = signal;
  //       switch (type) {
  //         case "offer":
  //           // this is where the call comes in
  //           // setup and answer from the user
  //           setIncomingCall(true);
  //           setRemoteAnswer(data);
  //           break;
  //         case "candidate":
  //           // set up the candidate
  //           const decoded = decodeJson(data);
  //           addIceCandidate(decoded);
  //           break;
  //         case "answer":
  //           // so we are gonna connect the two users;
  //           connectConnections(data);
  //           break;

  //         case "call_rejected":
  //           setInitialized(false);
  //           setCalling(false);
  //           toast({
  //             description: "Call rejected",
  //           });
  //           break;
  //         default:
  //           break;
  //       }
  //     });
  //   }
  // };

  // const rejectCall = () => {
  //   setIncomingCall(false);
  //   setRemoteAnswer(null);
  //   setCalling(false);
  //   signal("call_rejected", conversationId!, username, "");
  // };

  // const answerCall = () => {
  //   setIncomingCall(false);
  //   setCalling(false);
  //   setInitialized(true);
  //   if (remoteAnswer) {
  //     createAnswer(remoteAnswer);
  //     setRemoteAnswer(null);
  //   }
  // };
  // const initializeCall = async () => {
  //   if (!conversationId) return;

  //   try {
  //     const pc = new RTCPeerConnection(stunServers);
  //     localStream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: false,
  //     });

  //     remoteStream = new MediaStream();

  //     remoteVideoRef.current!.srcObject = remoteStream;
  //     localVideoRef.current!.srcObject = localStream;

  //     // add all tracks to the peerconnection
  //     localStream.getTracks().forEach((track) => {
  //       pc.addTrack(track, localStream!);
  //     });

  //     pc.addEventListener("icecandidate", (event) => {
  //       if (event.candidate) {
  //         const encode = encodeJson(event.candidate);
  //         signal("candidate", conversationId!, username, encode);
  //       }
  //     });

  //     pc.addEventListener("track", (event) => {
  //       try {
  //         event.streams[0].getTracks().forEach((track) => {
  //           console.log(track);
  //           remoteStream!.addTrack(track);
  //         });
  //       } catch (error: any) {
  //         console.log(error);
  //       }
  //     });

  //     setPeerConnection(pc);
  //   } catch (error: any) {
  //     console.log(error);
  //   }

  //   // so now we are gonna create an offer
  //   // talk to the stun servers to give us our ice candidates
  // };

  // const initializeAndCreateOffer = async () => {
  //   const localOffer = await peerConnection?.createOffer();
  //   const jsonencode = encodeJson(localOffer);
  //   setCalling(true);
  //   // set the localDescription for the connection
  //   await peerConnection?.setLocalDescription(localOffer);
  //   signal("offer", conversationId!, username, jsonencode);
  // };

  // const createAnswer = async (data: string) => {
  //   const decoded: any = decodeJson(data);
  //   try {
  //     await peerConnection?.setRemoteDescription(decoded);
  //     const answer = await peerConnection?.createAnswer();
  //     await peerConnection?.setLocalDescription(answer);
  //     const codedAnswer = encodeJson(answer);
  //     signal("answer", conversationId!, username, codedAnswer);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  // const addIceCandidate = async (decoded: any) => {
  //   console.log(decoded);
  //   try {
  //     const iceCandidate = new RTCIceCandidate(decoded);
  //     await peerConnection?.addIceCandidate(iceCandidate);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  // const connectConnections = async (data: string) => {
  //   const json = decodeJson(data);
  //   try {
  //     if (!peerConnection?.currentRemoteDescription) {
  //       await peerConnection?.setRemoteDescription(json);
  //       setInitialized(true);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  //   // remoteVideoRef.current?.srcObject = remoteStream!;
  // };

  // // used to send signals
  // const signal = (
  //   type: string,
  //   conversationId: string,
  //   reciever: string,
  //   data: string
  // ) => {
  //   sendSignal({ type, conversationId, reciever, data });
  // };

  // if (!conversationId) return <h1>Hold your horses</h1>;

  // return (
  //   <main className=" h-screen w-screen flex  items-center">
  //     {incomingCall && (
  //       <PhoneRingingComponent
  //         rejectCall={rejectCall}
  //         answerCall={answerCall}
  //       />
  //     )}
  //     <VideoChatComponent
  //       name=""
  //       localVideoRef={localVideoRef}
  //       remoteVideoRef={remoteVideoRef}
  //       initialized={initialized}
  //       endCall={() => {}}
  //     />
  //     <ChatScreenComponent
  //       firstname={firstname}
  //       username={username}
  //       calling={calling}
  //       initialized={initialized}
  //       friend_id={friend_id}
  //       initializeCall={initializeAndCreateOffer}
  //       conversationId={conversationId}
  //     />
  //   </main>
  // )
  if (!conversationId) return <p>Loading hold on</p>;

  return (
    <VideoCallWrapper
      data={{
        username: friendUsername!,
        firstname: firtsname!,
        conversationId: conversationId!,
      }}
    />
  );
};

export default ChatPage;
