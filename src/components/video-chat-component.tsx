import { FC, RefObject } from "react";
import { Button } from "./ui/button";
import { Mic, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";

type VideoChatComponentType = {
  name: string;
  localVideoRef: RefObject<HTMLVideoElement>;
  remoteVideoRef: RefObject<HTMLVideoElement>;
  initialized: boolean;
};

const VideoChatComponent: FC<VideoChatComponentType> = ({
  name,
  localVideoRef,
  remoteVideoRef,
  initialized,
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
      <div className="w-[250px] absolute bg-transparent py-[15px] px-[30px] bottom-[20px] left-[50%] bg-gray-200 translate-x-[-50%] rounded-full flex justify-between items-center bg-opacity-5">
        <button
          className={
            "h-[45px] w-[45px] flex items-center text-white justify-center"
          }
        >
          <Video size={25} />
        </button>
        <button
          className={cn(
            " text-white rounded-full h-[50px] w-[50px] flex items-center justify-center",
            initialized
              ? "bg-red-600 hover:bg-red-400"
              : "bg-blue-500 hover:bg-blue-700 "
          )}
        >
          <Phone size={24} />
        </button>
        <button
          className={
            "h-[45px] w-[45px] flex items-center text-white justify-center"
          }
        >
          <Mic size={25} />
        </button>
      </div>
    </div>
  );
};

export default VideoChatComponent;
