"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const noteFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title cannot be empty.",
  }),
  body: z.string().min(1, {
    message: "Body cannot be empty.",
  }),
});

export function CreateNoteButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        className={cn(
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "shadow-md hover:shadow-lg transition-all duration-200",
          "hover:scale-105 transform",
          "font-medium"
        )}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Note
      </Button>
      <CreateNoteDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}

interface CreateNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateNoteDialog({ open, onOpenChange }: CreateNoteDialogProps) {
  const createNote = useAction(api.notesActions.createNote);

  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof noteFormSchema>) {
    try {
      await createNote({
        title: values.title,
        body: values.body,
      });
      toast.success("Note created successfully!");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.log("Error creating note:", error);
      toast.error("Failed to create note. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-md",
          "bg-background/95 backdrop-blur-md",
          "border-border/50"
        )}
      >
        <DialogHeader className="space-y-3">
          <DialogTitle
            className={cn(
              "text-xl font-semibold",
              "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
            )}
          >
            Create New Note
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details for your new note. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter note title..."
                      {...field}
                      className={cn(
                        "border-border/50 focus:border-primary",
                        "bg-background/50 focus:bg-background",
                        "transition-colors duration-200"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Content
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your note content here..."
                      {...field}
                      className={cn(
                        "min-h-[120px] resize-none",
                        "border-border/50 focus:border-primary",
                        "bg-background/50 focus:bg-background",
                        "transition-colors duration-200"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive text-sm" />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "bg-primary hover:bg-primary/90 text-primary-foreground",
                  "shadow-md hover:shadow-lg transition-all duration-200",
                  "hover:scale-105 transform",
                  "font-medium px-6"
                )}
              >
                {isSubmitting ? "Creating..." : "Create Note"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
