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
import { Trash2, FileText } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";

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
  const [deleting, setDeleting] = useState(false);

  function closeDialog() {
    if (deleting) return;
    window.history.pushState(null, "", window.location.pathname);
  }

  async function handleDeleteNote(id: string | undefined) {
    if (!id) return;

    setDeleting(true);
    try {
      await deleteNote({ noteId: id as Id<"notes"> });
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
      <DialogContent
        className={cn(
          "sm:max-w-[625px] max-h-[80vh]",
          "bg-background/95 backdrop-blur-md",
          "border-border/50"
        )}
      >
        <DialogHeader className="space-y-3">
          <DialogTitle
            className={cn(
              "text-xl font-semibold flex items-center gap-2",
              "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
            )}
          >
            <FileText className="w-5 h-5 text-primary" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div
          className={cn(
            "mt-4 p-4 rounded-lg",
            "bg-muted/30 border border-border/30",
            "whitespace-pre-wrap leading-relaxed",
            "text-foreground/90",
            "max-h-[400px] overflow-y-auto"
          )}
        >
          {body || "No content available."}
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="destructive"
            className={cn(
              "gap-2 bg-destructive hover:bg-destructive/90",
              "shadow-md hover:shadow-lg transition-all duration-200",
              "hover:scale-105 transform"
            )}
            onClick={() => handleDeleteNote(id)}
            disabled={deleting}
          >
            <Trash2 size={16} />
            {deleting ? "Deleting..." : "Delete Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
