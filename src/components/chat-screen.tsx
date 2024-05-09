import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const ChatScreenComponent = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 "></div>
      <div className="flex items-center p-5 mx-2 bg-white rounded-lg">
        <Input
          placeholder="Type a message"
          className=" border-transparent outline-transparent bg-transparent flex-1 mr-2 resize-none focus:border-transparent focus:outline-none ring-0 focus:ring-0"
        />
        <Button className={"h-[55px] w-[55px]"}>
          <Send className="h-[30px] w-[30px]" />
        </Button>
      </div>
    </div>
  );
};

export default ChatScreenComponent;
