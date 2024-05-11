import { Id } from "../../convex/_generated/dataModel";

export type SignalType = {
  type: string;
  conversationId: string;
  data: string;
  sender: string;
  reciever: string;
  _id: Id<"signals">;
  _creationTime: number;
};
