"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function SignOutButton() {
  const { signOut } = useAuthActions();

  return (
    <Button
      variant="outline"
      onClick={() => {
        signOut();
      }}
      title="Sign out"
      className={cn(
        "bg-background/80 backdrop-blur-sm border-border/50",
        "hover:bg-background hover:border-border",
        "hover:text-destructive hover:border-destructive/50",
        "shadow-sm hover:shadow-md transition-all duration-200",
        "hover:scale-105 transform",
        "font-medium"
      )}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
    </Button>
  );
}
