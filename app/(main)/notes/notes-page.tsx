"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { AIChatButton } from "./ai-chat-button";
import { CreateNoteButton } from "./create-note-button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function NotesPage() {
  const notes = useQuery(api.notes.getUserNotes);

  return (
    <div className="container xl:max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <div className="flex gap-2">
          <AIChatButton />
          <CreateNoteButton />
        </div>
      </div>

      {notes === undefined ? (
        <LoadingSkeleton />
      ) : notes.length === 0 ? (
        <EmptyView />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="flex flex-col space-y-3 bg-card p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-card-foreground">
                {note.title}
              </h2>
              <p className="text-muted-foreground line-clamp-3">{note.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyView() {
  return (
    <div className="text-center py-10">
      <p className="text-muted-foreground">
        No notes yet. Create your first note!
      </p>
    </div>
  );
}
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
