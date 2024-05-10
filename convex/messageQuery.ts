import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const getMessages = query({
  args: { conversationId: v.string() },
  handler: async (ctx, args) => {
    const { conversationId } = args;
    console.log("=================");
    console.log(conversationId);
    const user = await ctx.auth.getUserIdentity();
    try {
      if (!user) throw new ConvexError("You are not authorized");
      const messages = await ctx.db
        .query("messages")
        .filter((e) => e.eq(e.field("conversationId"), conversationId))
        .collect();

      return messages;
    } catch (error: any) {
      console.log(error);
    }
  },
});
