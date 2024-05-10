import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

export const createNewConversation = action({
  args: { friend_username: v.string() },
  handler: async (ctx, args): Promise<Id<"conversations"> | null> => {
    const { friend_username } = args;
    const user = await ctx.auth.getUserIdentity();
    try {
      if (!user) {
        throw new ConvexError("You are not authorized");
      }

      const conversation: Doc<"conversations"> | null = await ctx.runQuery(
        internal.conversationQuery.queryConversation,
        { friend_username }
      );

      if (conversation !== null) {
        return conversation._id;
      } else {
        console.log("Creating new conversation");
        const newConversation = await ctx.runMutation(
          internal.conversationQuery.createNewConversation,
          { friend_username }
        );
        return newConversation;
      }
    } catch (error: any) {
      console.log(error);
    }
    return null;
  },
});
