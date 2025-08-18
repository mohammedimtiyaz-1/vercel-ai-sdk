"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotePreviewDialog } from "./note-preview-dialog";

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
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={handlerOpenNote}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="line-clamp-3 text-sm text-muted-foreground whitespace-pre-line">
            {body || "No content available."}
          </div>
        </CardContent>
      </Card>
      <NotePreviewDialog title={title} body={body} id={id} />
    </>
  );
}
