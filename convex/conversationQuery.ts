import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";

export const queryConversation = internalQuery({
  args: { friend_username: v.string() },
  handler: async (ctx, args) => {
    const { friend_username } = args;
    let user = await ctx.auth.getUserIdentity();
    try {
      if (!user) {
        throw new ConvexError("You are not authorized");
      }
      let conversation = await ctx.db
        .query("conversations")
        .filter((q) =>
          q.or(
            q.and(
              q.eq(q.field("user1"), friend_username),
              q.eq(q.field("user2"), user.subject!)
            ),
            q.and(
              q.eq(q.field("user1"), user.subject),
              q.eq(q.field("user2"), friend_username)
            )
          )
        )
        .first();

      return conversation;

      // create a new conversation
    } catch (error: any) {
      console.log(error);
    }
    return null;
  },
});

export const createNewConversation = internalMutation({
  args: { friend_username: v.string() },
  handler: async (ctx, args) => {
    const { friend_username } = args;
    const user = await ctx.auth.getUserIdentity();
    try {
      if (!user) {
        throw new ConvexError("You are not authorized");
      }
      let conversation = await ctx.db.insert("conversations", {
        user1: user.nickname!,
        user2: friend_username,
      });
      return conversation;
    } catch (error: any) {
      console.log(error);
    }
  },
});
