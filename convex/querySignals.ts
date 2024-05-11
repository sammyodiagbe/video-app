import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const querySignals = query({
  args: { conversationoId: v.string(), username: v.string() },
  handler: async (ctx, args) => {
    const { conversationoId, username } = args;
    const user = await ctx.auth.getUserIdentity();
    try {
      if (!user) throw new ConvexError("You are not authorized");
      const signals = await ctx.db
        .query("signals")
        .filter((q) =>
          q.and(
            q.eq(q.field("reciever"), username),
            q.eq(q.field("conversationId"), conversationoId),
            q.eq(q.field("sender"), user.nickname)
          )
        );
      return signals;
    } catch (error: any) {
      console.log(error);
    }
    return [];
  },
});
