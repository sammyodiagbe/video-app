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
    <div className="relative flex-1 h-full max-h-full overflow-hidden">
      <div className="absolute w-[180px] h-[200px] r-[20px] t-[20px]">
        <video
          ref={localVideoRef}
          className=" w-full h-auto"
          autoPlay
          playsInline
        />
      </div>
      <div className="">
        <video
          ref={remoteVideoRef}
          className="w-full h-auto max-h-full"
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoChatComponent;
