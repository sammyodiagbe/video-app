import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";

export const sendSignal = action({
  args: {
    conversationId: v.string(),
    reciever: v.string(),
    type: v.string(),
    data: v.string(),
  },
  handler: async (ctx, args) => {
    const { conversationId, reciever, type, data } = args;
    const user = await ctx.auth.getUserIdentity();
    try {
      if (!user) {
        throw new ConvexError("You are not authorized");
      }
      // create a signal type of data
      const saveSignal = await ctx.runMutation(
        internal.appInternals.createSignal,
        {
          conversationId,
          reciever,
          type,
          data,
          sender: user.nickname!,
        }
      );
      await ctx.scheduler.runAfter(1500, internal.appInternals.deleteSignal, {
        signalId: saveSignal,
      });
    } catch (error: any) {
      console.log(error);
    }
  },
});

export const deleteSignal = action({
  args: { signalId: v.id("signals") },
  handler: async (ctx, args) => {
    const { signalId } = args;
    const user = await ctx.auth.getUserIdentity();
    console.log("deleting signal 1");
    await ctx.runMutation(internal.appInternals.deleteSignal, { signalId });
    try {
      if (!user) throw new ConvexError("you are not authorized");
    } catch (error: any) {
      console.log(error);
    }
  },
});
