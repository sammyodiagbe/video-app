"use client";
import { stunServers } from "@/utils/stunServers";
import { decodeJson, encodeJson } from "@/utils/utils";
import { useAction, useQuery } from "convex/react";
import { FC, useEffect, useRef, useState } from "react";
import { api } from "../../convex/_generated/api";
import { toast } from "./ui/use-toast";
import ChatScreenComponent from "./chat-screen";
import VideoChatComponent from "./video-chat-component";
import PhoneRingingComponent from "./phone_ringing";
type VideoCallWrapperComponent = {
  data: DataType;
};

type DataType = {
  username: string;
  firstname: string;
  conversationId: string;
};

const VideoCallWrapper: FC<VideoCallWrapperComponent> = ({ data }) => {
  const { conversationId, username, firstname } = data;
  const [inCall, setInCall] = useState(false);
  const [attemptingCall, setAttemptingCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [remoteDescription, setRemoteDescription] = useState<string | null>(
    null
  );
  const sendSignal = useAction(api.signalAction.sendSignal);
  const [endsConnected, setEndsConnected] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  let remoteStream: MediaStream | null;

  const signals = useQuery(api.querySignals.querySignals, {
    conversationId: conversationId,
    username,
  });

  // handle signals when this signals variable changes
  useEffect(() => {
    handleSignal();
  }, [signals]);

  const call = async () => {
    try {
      setAttemptingCall(true);
      const pc = await createPeerConnection();
      createOffer(pc!);
    } catch (error: any) {
      console.log(error);
    }
  };

  const createPeerConnection = async (): Promise<RTCPeerConnection> => {
    let pc: RTCPeerConnection = new RTCPeerConnection(stunServers);
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    let remoteStream = new MediaStream();

    localVideoRef.current!.srcObject = localStream;
    remoteVideoRef.current!.srcObject = remoteStream;

    localStream.getTracks().map((track) => {
      pc.addTrack(track, localStream);
    });

    pc.addEventListener("track", (event) => {
      try {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream?.addTrack(track);
        });
      } catch (error: any) {
        console.log(error);
      }
    });

    pc.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        const encode = encodeJson(event.candidate);
        sendsignal("candidate", conversationId!, username!, encode);
      }
    });
    return pc;
  };

  // create offer and send it to the other user
  const createOffer = async (peerConnection: RTCPeerConnection) => {
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      // send a signal
      const encoded = encodeJson(offer);
      sendsignal("offer", conversationId, username, encoded);
      setPeerConnection(peerConnection);
    } catch (error: any) {
      console.log(error);
    }
  };

  // handles the signal we get from the signal server
  const handleSignal = () => {
    if (!signals) return;
    if (signals.length) {
      let temp = [...signals];
      temp.forEach((signal) => {
        const { type, data } = signal;

        switch (type) {
          case "offer":
            setIncomingCall(true);
            setRemoteDescription(data);
            break;
          case "answer":
            linkConnections(data);
            break;

          case "candidate":
            addIceCandidate(data);
            break;
          case "call_rejected":
            setAttemptingCall(false);
            setEndsConnected(false);
            setInCall(false);
            toast({
              description: "Call Rejected",
            });
            break;
        }
      });
    }
  };

  // connect the two end points
  const linkConnections = async (data: string) => {
    try {
      const remoteHandshake = decodeJson(data);
      if (peerConnection?.signalingState === "stable") {
      }
      await peerConnection?.setRemoteDescription(remoteHandshake);
      setEndsConnected(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  // add ice candidate to peerconnection
  const addIceCandidate = async (d: string) => {
    try {
      const data = decodeJson(d);
      const iceCandidate = new RTCIceCandidate(data);
      await peerConnection?.addIceCandidate(iceCandidate);
    } catch (error: any) {
      console.log(error);
    }
  };

  // pick up the call
  const pickUp = async () => {
    try {
      let pc: RTCPeerConnection;
      if (!remoteDescription) return;
      const data = decodeJson(remoteDescription);
      if (!peerConnection) {
        pc = await createPeerConnection();
      } else {
        pc = peerConnection;
      }

      const decoded = decodeJson(remoteDescription);
      console.log(decoded);
      await pc?.setRemoteDescription(decoded);
      const answer = await pc?.createAnswer();
      await pc?.setLocalDescription(answer);
      sendsignal("answer", conversationId, username, encodeJson(answer));
      setIncomingCall(false);
      setInCall(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  // reject the call
  const rejectCall = () => {
    setRemoteDescription(null);
    setAttemptingCall(false);
    setIncomingCall(false);
    sendsignal("call_rejected", conversationId, username, "");
  };
  const sendsignal = async (
    type: string,
    conversation: string,
    reciever: string,
    data: string
  ) => {
    await sendSignal({ type, conversationId: conversation, reciever, data });
  };
  return (
    <main className=" h-screen w-screen flex  items-center">
      {incomingCall && (
        <PhoneRingingComponent rejectCall={rejectCall} answerCall={pickUp} />
      )}
      <VideoChatComponent
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
        initialized={inCall}
        endCall={() => {}}
        name=""
      />
      <ChatScreenComponent
        firstname={firstname}
        username={username}
        calling={attemptingCall}
        initialized={endsConnected}
        friend_id={username}
        call={call}
        conversationId={conversationId}
      />
    </main>
  );
};

export default VideoCallWrapper;
