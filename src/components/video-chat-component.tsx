import { forwardRef, Ref } from "react";

type VideoChatComponentType = {
  name: string;
};

const VideoChatComponent = forwardRef<HTMLVideoElement, VideoChatComponentType>(
  ({ name }: VideoChatComponentType, ref) => {
    return (
      <div className="bg-red-500 flex-1 h-full">
        <h1>Video component</h1>
        <div className="">
          <video ref={ref} className=" w-full h-auto" autoPlay muted />
        </div>
      </div>
    );
  }
);

export default VideoChatComponent;
