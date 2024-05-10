import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const getActiveUsers = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    try {
      if (!user) {
        throw new ConvexError("You are not authorized ");
      }
      // get all other users except the current user

      console.log(user.nickname);
      const users = await ctx.db
        .query("users")
        .filter((q) => q.neq(q.field("username"), user.nickname))
        .collect();
      return users;
    } catch (error: any) {
      console.log(error);
    }
  },
});
