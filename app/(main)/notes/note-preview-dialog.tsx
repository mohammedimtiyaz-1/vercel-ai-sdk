"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { set } from "zod";

export function NotePreviewDialog({
  title,
  body,
  id,
}: {
  title: string;
  body?: string;
  id?: string;
}) {
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("id") === id;
  const deleteNote = useMutation(api.notes.deleteNote);
  const [deleteing, setDeleting] = useState(false);

  function closeDialog() {
    if (deleteing) return;
    //router.push("/notes");
    window.history.pushState(null, "", window.location.pathname); // Navigate back to the notes list
    // Clear the search params to close the dialog
  }

  async function handleDeleteNote(id: any) {
    setDeleting(true);
    try {
      await deleteNote({ noteId: id });
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete note. Please try again later.");
    } finally {
      setDeleting(false);
      closeDialog();
    }
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 whitespace-pre-wrap">{body}</div>
        <DialogFooter className="mt-6">
          <Button
            variant="destructive"
            className="gap-2"
            onClick={() => handleDeleteNote(id)}
            disabled={deleteing}
          >
            <Trash2 size={16} />
            {deleteing ? "Deleting" : "Delete Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
