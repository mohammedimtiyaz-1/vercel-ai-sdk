import logo from "@/assets/logo.png";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "./sign-out-button";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-background/80 backdrop-blur-md border-b border-border/50",
        "transition-all duration-200"
      )}
    >
      <div className="container xl:max-w-6xl flex items-center mx-auto justify-between px-4 py-3">
        <Link
          href="/notes"
          className={cn(
            "flex items-center gap-3 text-xl font-semibold",
            "text-foreground hover:text-primary transition-colors duration-200",
            "hover:scale-105 transform transition-transform duration-200"
          )}
        >
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Smart Notes
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <SignOutButton />
        </div>
      </div>
    </nav>
  );
}
