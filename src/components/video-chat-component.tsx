import { useState } from "react";
import {
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  LocalUser,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-react";

type VideoChatComponentType = {
  conversationId: string;
  localMicrophoneTrack: IMicrophoneAudioTrack;
  localCameraTrack: ICameraVideoTrack;
  cameraOn: boolean;
  microphoneOn: boolean;
};

const VideoChatComponent: React.FC<VideoChatComponentType> = ({
  conversationId,
  localCameraTrack,
  localMicrophoneTrack,
  cameraOn,
  microphoneOn,
}) => {
  return (
    <div className="bg-red-500 flex-1 h-full">
      <h1>Video component</h1>
      <div className="">
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={cameraOn}
          micOn={microphoneOn}
          playAudio={microphoneOn}
          playVideo={cameraOn}
        />
      </div>
    </div>
  );
};

export default VideoChatComponent;
