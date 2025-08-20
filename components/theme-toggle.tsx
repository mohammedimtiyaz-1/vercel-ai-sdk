"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-9 h-9 transition-all duration-200 hover:scale-105",
            "border-border/50 hover:border-border",
            "bg-background/80 backdrop-blur-sm",
            "hover:bg-background/90",
            "shadow-sm hover:shadow-md"
          )}
          aria-label="Toggle theme"
        >
          {getThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "w-40 p-2",
          "bg-popover/95 backdrop-blur-sm",
          "border-border/50",
          "shadow-lg"
        )}
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            "cursor-pointer transition-colors duration-150",
            "hover:bg-accent hover:text-accent-foreground",
            theme === "light" && "bg-accent text-accent-foreground"
          )}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === "light" && (
            <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            "cursor-pointer transition-colors duration-150",
            "hover:bg-accent hover:text-accent-foreground",
            theme === "dark" && "bg-accent text-accent-foreground"
          )}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && (
            <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            "cursor-pointer transition-colors duration-150",
            "hover:bg-accent hover:text-accent-foreground",
            theme === "system" && "bg-accent text-accent-foreground"
          )}
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === "system" && (
            <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Simple theme toggle for mobile or compact use
export function SimpleThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "w-9 h-9 transition-all duration-200 hover:scale-105",
        "border-border/50 hover:border-border",
        "bg-background/80 backdrop-blur-sm",
        "hover:bg-background/90"
      )}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
