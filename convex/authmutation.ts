import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUserData = mutation({
  args: {
    userId: v.string(),
    firstname: v.string(),
    lastname: v.string(),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, firstname, lastname, username } = args;
    try {
      const user = await ctx.auth.getUserIdentity();
      if (!user) {
        throw new ConvexError("Unauthorized");
      }

      await ctx.db.insert("users", {
        userId,
        firstname,
        lastname,
        username,
      });
    } catch (error) {
      console.log(error);
    }
  },
});
