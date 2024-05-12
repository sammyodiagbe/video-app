import { FC, RefObject } from "react";
import { Button } from "./ui/button";
import { Mic, Phone, Video } from "lucide-react";

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
    <div className="relative bg-slate-600 flex-1 h-full max-h-full overflow-hidden">
      <div className="absolute  h-[200px] top-[20px] right-[20px] rounded-md">
        <video
          ref={localVideoRef}
          className="block w-[200px] h-full rounded-md"
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
      <div className="w-[250px] absolute bg-transparent py-[15px] px-[30px] bottom-[10px] left-[50%] bg-gray-200 translate-x-[-50%] rounded-full flex justify-between items-center">
        <button
          className={"h-[45px] w-[45px] flex items-center justify-center"}
        >
          <Video size={25} />
        </button>
        <button className="bg-red-500 text-white rounded-full h-[50px] w-[50px] hover:bg-red-700 flex items-center justify-center">
          <Phone size={24} />
        </button>
        <button
          className={"h-[45px] w-[45px] flex items-center justify-center"}
        >
          <Mic size={25} />
        </button>
      </div>
    </div>
  );
};

export default VideoChatComponent;
