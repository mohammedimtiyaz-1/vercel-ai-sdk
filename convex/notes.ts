import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createNote = mutation({
  args: {
    title: v.string(),
    body: v.string(),
  },
  returns: v.id("notes"),
  // @ts-ignore
  handler: async (ctx, args: { title: string; body: string }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated to create a note.");
    }

    return await ctx.db.insert("notes", {
      title: args.title,
      body: args.body,
      userId: userId,
    });
  },
});

export const getUserNotes = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("notes")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  returns: v.boolean(),
  handler: async (ctx, { noteId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated to delete a note.");
    }

    const note = await ctx.db.get(noteId);
    if (!note || note.userId !== userId) {
      throw new Error("Note not found or does not belong to the user.");
    }

    await ctx.db.delete(noteId);
    return true;
  },
});
