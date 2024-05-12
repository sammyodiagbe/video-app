import { FC, RefObject } from "react";

type VideoChatComponentType = {
  name: string;
  localVideoRef: RefObject<HTMLVideoElement>;
  remoteVideoRef: RefObject<HTMLVideoElement>;
};

const VideoChatComponent: FC<VideoChatComponentType> = ({
  name,
  localVideoRef,
  remoteVideoRef,
}) => {
  return (
    <div className="bg-red-500 flex-1 h-full">
      <h1>Video component</h1>
      <div className="">
        <video
          ref={localVideoRef}
          className=" w-full h-auto"
          autoPlay
          playsInline
        />
      </div>
      <div className="bg-blue-500">
        <video
          ref={remoteVideoRef}
          className="w-full h-auto"
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoChatComponent;
