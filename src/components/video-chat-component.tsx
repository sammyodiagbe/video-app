import { generateToken } from "@/app/chat/action";
import {
  StreamVideo,
  StreamVideoClient,
  Call,
  StreamCall,
  StreamTheme,
  CallControls,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

type VideoChatComponentType = {
  userId: string;
  conversationId: string;
};

const VideoChatComponent: React.FC<VideoChatComponentType> = ({
  userId,
  conversationId,
}) => {
  const [callClient, setCallClient] = useState<StreamVideoClient | null>(null);
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  useEffect(() => {
    if (!userId || !callClient) return;
    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: { id: userId },
      tokenProvider: () => generateToken(),
    });

    const call = client.call("default", conversationId);
    call.join({ create: true });
    setCallClient(client);
    setActiveCall(call);
    return () => {
      call.leave();
      client.disconnectUser();
    };
  }, [userId, conversationId]);

  if (!userId || !conversationId) return;

  return (
    <div className="w-[500px] bg-red-500">
      <StreamVideo client={callClient!}>
        <StreamCall call={activeCall!}>
          <StreamTheme>
            <CallControls />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default VideoChatComponent;
