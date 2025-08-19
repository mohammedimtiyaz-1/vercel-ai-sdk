import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  // Define your schema here
  ...authTables,
  notes: defineTable({
    title: v.string(),
    body: v.string(),
    userId: v.id("users"),
  }).index("by_userId", ["userId"]),

  notesEmbeddings: defineTable({
    content: v.string(),
    embedding: v.array(v.float64()),
    noteId: v.id("notes"),
    userId: v.id("users"),
  })
    .index("by_noteId", ["noteId"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536, // Adjust based on your embedding model
      filterFields: ["userId"],
    }),
});
export default schema;
