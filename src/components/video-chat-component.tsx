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
      <div className="absolute bg-white py-[15px] px-[30px] bottom-[10px] left-[50%] translate-x-[-50%] rounded-full">
        <Button variant={"ghost"}>
          <Video />
        </Button>
        <Button variant={"ghost"} className="p-[20px] bg-red-400 text-white">
          <Phone size={35} />
        </Button>
        <Button variant={"ghost"}>
          <Mic />
        </Button>
      </div>
    </div>
  );
};

export default VideoChatComponent;
