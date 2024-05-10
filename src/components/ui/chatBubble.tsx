import { cn } from "@/lib/utils";

import { motion } from "framer-motion";

interface ChatType {
  message: string;
  sender: string;
}

type ChatBubbleType = {
  chat: ChatType;
  authUserUsername: string;
};

const ChatBubbleComponent: React.FC<ChatBubbleType> = ({
  chat,
  authUserUsername,
}) => {
  const { message, sender } = chat;
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        "flex items-center py-[30px]",
        sender === authUserUsername ? " justify-end" : ""
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-[25px] py-[15px] rounded-[10px]",
          sender === authUserUsername ? "bg-gray-300" : "bg-blue-600 text-white"
        )}
      >
        <p className="leading-7">{message}</p>
      </div>
    </motion.div>
  );
};

export default ChatBubbleComponent;
