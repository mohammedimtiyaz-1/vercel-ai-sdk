"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { AIChatButton } from "./ai-chat-button";
import { CreateNoteButton } from "./create-note-button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { NoteItem } from "./note-item";
import { cn } from "@/lib/utils";

export function NotesPage() {
  const notes = useQuery(api.notes.getUserNotes);

  return (
    <div className="container xl:max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1
            className={cn(
              "text-3xl sm:text-4xl font-bold",
              "bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent",
              "mb-2"
            )}
          >
            My Notes
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Organize your thoughts and ideas with AI-powered search
          </p>
        </div>
        <div className="flex gap-3">
          <AIChatButton />
          <CreateNoteButton />
        </div>
      </div>

      {notes === undefined ? (
        <LoadingSkeleton />
      ) : notes.length === 0 ? (
        <EmptyView />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notes.map((note) => (
            <NoteItem
              key={note._id}
              title={note.title}
              body={note.body}
              id={note._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyView() {
  return (
    <div
      className={cn(
        "text-center py-16 px-4",
        "bg-muted/30 rounded-2xl border border-border/50",
        "max-w-md mx-auto"
      )}
    >
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No notes yet
      </h3>
      <p className="text-muted-foreground mb-4">
        Create your first note to get started with Smart Notes
      </p>
      <CreateNoteButton />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
