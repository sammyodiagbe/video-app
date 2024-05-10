import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";

export const sendMessage = action({
  args: { message: v.string(), conversationId: v.string() },
  handler: async (ctx, args) => {
    const { message, conversationId } = args;
    const user = await ctx.auth.getUserIdentity();
    try {
      if (!user) {
        throw new ConvexError("You are not authorized");
      }

      await ctx.runMutation(internal.appInternals.saveMessage, {
        message,
        conversationId,
      });
    } catch (error: any) {
      console.log(error);
    }
  },
});
