"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotePreviewDialog } from "./note-preview-dialog";
import { cn } from "@/lib/utils";

export function NoteItem({
  title,
  body,
  id,
}: {
  title: string;
  body?: string;
  id?: string;
}) {
  function handlerOpenNote() {
    window.history.pushState(null, "", `/notes?id=${id}`);
  }

  return (
    <>
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200",
          "hover:shadow-lg hover:scale-[1.02] transform",
          "border-border/50 hover:border-border",
          "bg-card/80 backdrop-blur-sm",
          "group"
        )}
        onClick={handlerOpenNote}
      >
        <CardHeader className="pb-3">
          <CardTitle
            className={cn(
              "text-lg font-semibold line-clamp-2",
              "text-foreground group-hover:text-primary",
              "transition-colors duration-200"
            )}
          >
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div
            className={cn(
              "line-clamp-3 text-sm text-muted-foreground",
              "whitespace-pre-line leading-relaxed",
              "group-hover:text-muted-foreground/80",
              "transition-colors duration-200"
            )}
          >
            {body || "No content available."}
          </div>
          <div
            className={cn(
              "mt-3 pt-3 border-t border-border/30",
              "flex items-center justify-between text-xs text-muted-foreground/60"
            )}
          >
            <span>Click to view</span>
            <div
              className={cn(
                "w-2 h-2 rounded-full bg-primary/40",
                "group-hover:bg-primary/60 transition-colors duration-200"
              )}
            />
          </div>
        </CardContent>
      </Card>
      <NotePreviewDialog title={title} body={body} id={id} />
    </>
  );
}
