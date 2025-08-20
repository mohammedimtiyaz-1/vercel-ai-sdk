"use client";

import Markdown from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { useAuthToken } from "@convex-dev/auth/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { Bot, Expand, Minimize, Send, Trash, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.replace(
  /.cloud$/,
  ".site"
);

export function AIChatButton() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setChatOpen(true)}
        variant="outline"
        className={cn(
          "bg-background/80 backdrop-blur-sm border-border/50",
          "hover:bg-background hover:border-border",
          "shadow-sm hover:shadow-md transition-all duration-200",
          "hover:scale-105 transform",
          "font-medium"
        )}
      >
        <Bot className="w-4 h-4 mr-2" />
        Ask AI
      </Button>
      <AIChatBox open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

const initialMessages: UIMessage[] = [
  {
    id: "welcome-message",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "I'm your notes assistant. I can find and summarize any information that you saved.",
      },
    ],
  },
];

function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const token = useAuthToken();

  const { messages, sendMessage, setMessages, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${convexSiteUrl}/api/chat`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    messages: initialMessages,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isProcessing = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      sendMessage({ text: input });
      setInput("");
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onSubmit(e);
    }
  };

  if (!open) return null;

  const lastMessageIsUser = messages[messages.length - 1].role === "user";

  return (
    <div
      className={cn(
        "animate-in slide-in-from-bottom-10 fixed right-4 bottom-4 z-50",
        "flex flex-col rounded-xl border shadow-2xl duration-300",
        "bg-background/95 backdrop-blur-md border-border/50",
        "2xl:right-16",
        isExpanded
          ? "h-[650px] max-h-[90vh] w-[550px]"
          : "h-[500px] max-h-[80vh] w-80 sm:w-96"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between rounded-t-xl border-b border-border/30",
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
          "p-3 shadow-sm"
        )}
      >
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-primary-foreground" />
          <h3 className="font-semibold text-sm">Notes Assistant</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "text-primary-foreground hover:bg-primary/90 h-8 w-8",
              "transition-all duration-200 hover:scale-105"
            )}
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? <Minimize size={16} /> : <Expand size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMessages(initialMessages)}
            className={cn(
              "text-primary-foreground hover:bg-primary/90 h-8 w-8",
              "transition-all duration-200 hover:scale-105"
            )}
            title="Clear chat"
            disabled={isProcessing}
          >
            <Trash size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={cn(
              "text-primary-foreground hover:bg-primary/90 h-8 w-8",
              "transition-all duration-200 hover:scale-105"
            )}
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-3">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {status === "submitted" && lastMessageIsUser && <Loader />}
        {status === "error" && <ErrorMessage />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        className={cn(
          "flex gap-2 border-t border-border/30 p-3",
          "bg-muted/20"
        )}
        onSubmit={onSubmit}
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className={cn(
            "max-h-[120px] min-h-[40px] resize-none overflow-y-auto",
            "border-border/50 focus:border-primary",
            "bg-background/50 focus:bg-background",
            "transition-colors duration-200"
          )}
          maxLength={1000}
          autoFocus
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isProcessing}
          className={cn(
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "shadow-md hover:shadow-lg transition-all duration-200",
            "hover:scale-105 transform",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}

interface ChatMessageProps {
  message: UIMessage;
}

function ChatMessage({ message }: ChatMessageProps) {
  const currentStep = message.parts[message.parts.length - 1];

  return (
    <div
      className={cn(
        "mb-2 flex max-w-[80%] flex-col prose dark:prose-invert",
        message.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-3 py-2 text-sm transition-all duration-200",
          message.role === "user"
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-muted/50 border border-border/30 shadow-sm"
        )}
      >
        {message.role === "assistant" && (
          <div
            className={cn(
              "mb-1 flex items-center gap-1 text-xs font-medium",
              "text-muted-foreground"
            )}
          >
            <Bot className="text-primary size-3" />
            AI Assistant
          </div>
        )}
        {currentStep?.type === "text" && (
          <Markdown>
            {currentStep.text?.trim() ||
              "No context found. Can you please be more specific?"}
          </Markdown>
        )}
        {currentStep.type === "tool-invocation" && (
          <div className="italic animate-pulse text-muted-foreground">
            Searching notes...
          </div>
        )}
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="ml-2 flex items-center gap-1 py-2">
      <div className="bg-primary size-1.5 animate-pulse rounded-full" />
      <div className="bg-primary size-1.5 animate-pulse rounded-full delay-150" />
      <div className="bg-primary size-1.5 animate-pulse rounded-full delay-300" />
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
      Something went wrong. Please try again.
    </div>
  );
}
