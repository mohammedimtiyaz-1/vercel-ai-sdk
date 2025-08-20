"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthFormValues, signinSchema } from "../schema";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FileText, LogIn, UserPlus } from "lucide-react";

export function SigninForm() {
  const [step, setStep] = useState<"signIn" | "signUp">("signIn");

  const { signIn } = useAuthActions();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AuthFormValues) {
    setLoading(true);
    try {
      await signIn("password", {
        email: values.email,
        password: values.password,
        flow: step,
      });
      setLoading(false);
      toast.success(
        step === "signIn"
          ? "Logged in successfully!"
          : "Account created successfully!"
      );
      router.push("/notes");
    } catch (error: Error | unknown) {
      setLoading(false);
      if (error instanceof Error) {
        form.setError("root", {
          type: "manual",
          message: error instanceof Error ? error.message : "An error occurred",
        });
        toast.error(
          step === "signIn"
            ? "Failed to log in. Please check your credentials."
            : "Failed to create account. Please try again."
        );
      } else {
        form.setError("root", {
          type: "manual",
          message: "An unexpected error occurred. Please try again.",
        });
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Authentication error:", error);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen",
        "bg-gradient-to-br from-background via-muted/20 to-background",
        "p-4"
      )}
    >
      <div
        className={cn(
          "w-full max-w-md p-8 space-y-8",
          "bg-background/95 backdrop-blur-md rounded-2xl",
          "border border-border/50 shadow-2xl",
          "transition-all duration-300"
        )}
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div
            className={cn(
              "w-16 h-16 mx-auto rounded-full",
              "bg-gradient-to-br from-primary to-primary/70",
              "flex items-center justify-center shadow-lg"
            )}
          >
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <h1
              className={cn(
                "text-3xl font-bold",
                "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
              )}
            >
              {step === "signIn" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {step === "signIn"
                ? "Sign in to access your Notes Memo"
                : "Create your account to get started"}
            </p>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      type="email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
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
            {form.formState.errors.root && (
              <div
                className={cn(
                  "text-sm text-destructive bg-destructive/10",
                  "border border-destructive/20 rounded-lg px-3 py-2"
                )}
              >
                {form.formState.errors.root.message}
              </div>
            )}
            <Button
              type="submit"
              className={cn(
                "w-full bg-primary hover:bg-primary/90 text-primary-foreground",
                "shadow-md hover:shadow-lg transition-all duration-200",
                "hover:scale-[1.02] transform font-medium py-3"
              )}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {step === "signIn" ? "Signing In..." : "Creating Account..."}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {step === "signIn" ? (
                    <>
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Create Account
                    </>
                  )}
                </div>
              )}
            </Button>
          </form>
        </Form>

        {/* Toggle Mode */}
        <Button
          variant="link"
          type="button"
          className={cn(
            "w-full text-sm text-muted-foreground hover:text-foreground",
            "transition-colors duration-200 cursor-pointer"
          )}
          onClick={() => {
            setStep(step === "signIn" ? "signUp" : "signIn");
            form.reset();
          }}
        >
          {step === "signIn"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Button>
      </div>
    </div>
  );
}
