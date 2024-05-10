import { auth } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";

export async function generateToken() {
  const { sessionId, userId } = auth();
  if (!sessionId || !userId) throw new Error("Session not set");

  const serverClient = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    process.env.NEXT_PUBLIC_STREAM_SECRET_KEY!
  );
  const token = serverClient.createToken(userId);

  console.log("===========generating tokens ===============");
  console.log(token);
  return token;
}
