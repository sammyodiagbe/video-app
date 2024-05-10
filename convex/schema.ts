import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  conversations: defineTable({
    user1: v.string(),
    user2: v.string(),
  }),
  users: defineTable({
    firstname: v.string(),
    lastname: v.string(),
    userId: v.string(),
    username: v.string(),
  }),
  messages: defineTable({
    sender: v.string(),
    conversationId: v.string(),
    message: v.string(),
    seen: v.boolean(),
  }),
});
