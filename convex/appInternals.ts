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
              q.eq(q.field("user2"), user.nickname!)
            ),
            q.and(
              q.eq(q.field("user1"), user.nickname),
              q.eq(q.field("user2"), friend_username)
            )
          )
        )
        .first();

      console.log("found conversation 11");
      console.log(conversation);

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

export const saveMessage = internalMutation({
  args: { conversationId: v.string(), message: v.string() },
  handler: async (ctx, args) => {
    const { conversationId, message } = args;
    const user = await ctx.auth.getUserIdentity();
    try {
      if (!user) throw new ConvexError("You are not authorized");
      await ctx.db.insert("messages", {
        message,
        conversationId,
        sender: user.nickname!,
        seen: false,
      });
    } catch (error: any) {
      console.log(error);
    }
  },
});

export const createSignal = internalMutation({
  args: {
    conversationId: v.string(),
    sender: v.string(),
    reciever: v.string(),
    data: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const { conversationId, sender, reciever, data, type } = args;
    await ctx.db.insert("signals", {
      conversationId,
      sender,
      reciever,
      data,
      type,
    });
  },
});

export const deleteSignal = internalMutation({
  args: { signalId: v.id("signals") },
  handler: async (ctx, args) => {
    const { signalId } = args;
    await ctx.db.delete(signalId);
  },
});
