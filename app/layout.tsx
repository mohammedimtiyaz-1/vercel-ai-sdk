import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Notes Memo with AI",
    default: "Notes Memo with AI",
  },
  description:
    "A note-taking app with AI chatbot integration built with Convex and the Vercel AI SDK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.className} antialiased`}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Toaster position="top-right" />
          {/* Footer */}
          <footer className="w-full bottom-0 fixed  mt-auto pt-8 pb-8 border-t border-gray-200">
            <div className="text-sm text-muted-foreground text-center">
              <p>&copy; {new Date().getFullYear()} Notes Memo with AI.</p>
              <p>Made with ❤️ by Imtiyaz </p>
            </div>
          </footer>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
