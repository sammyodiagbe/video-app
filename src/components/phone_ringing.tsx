import { Phone, PhoneIncoming, PhoneOffIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type PhoneComponentType = {
  endCall: Function;
  answerCall: Function;
};

const PhoneRingingComponent: React.FC<PhoneComponentType> = ({
  endCall,
  answerCall,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -500 }}
        animate={{ y: [10, 0, -10], animationIterationCount: 5 }}
        exit={{ y: -500 }}
        className="absolute top-[20px] w-[380px] shadow-lg right-[10px] flex items-center justify-between  p-[20px] rounded-md bg-blue-600"
      >
        <audio src="/sounds/ring_effect.mp3" autoPlay={true} loop />
        <div className="flex items-center">
          <Phone size={15} className="text-white" />
          <p className="ml-[15px] text-white text-lg">Incoming call</p>
        </div>
        <div className="flex ">
          <button
            className="h-[45px] w-[45px] rounded-full bg-green-500 text-white mr-[10px] flex items-center justify-center"
            onClick={() => answerCall()}
          >
            <PhoneIncoming size={20} />
          </button>
          <button
            className="h-[45px] w-[45px] rounded-full bg-red-500 text-white flex items-center justify-center"
            onClick={() => endCall()}
          >
            <PhoneOffIcon size={20} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhoneRingingComponent;
