"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Github, Loader2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [pendingGoogle, startGoogleTransition] = useTransition();
  const [pendingGithub, startGithubTransition] = useTransition();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 3) {
      toast.error("name should be at least 3 character");
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter valid email address");
      return;
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      toast.error("Password must be at least 8 character");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    setLoading(true);

    try {
      await authClient.signUp.email(
        {
          name: trimmedName,
          email: trimmedEmail,
          password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            toast.success("Account created successfully!");
            setOpen(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            window.location.href = "/";
          },
          onError: (ctx) => {
            if (
              ctx.error.message.includes("already exists") ||
              ctx.error.message.includes("email")
            ) {
              toast.error("Account already exists");
            } else {
              toast.error("Failed to create account");
            }
          },
        },
      );
    } catch (error) {
      console.log(error);
      toast.error("Signup Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    await authClient.signIn.email(
      {
        email: trimmedEmail,
        password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Welcome back! 🛍️");
          setOpen(false);
          setEmail("");
          setPassword("");
          setLoading(false);
          window.location.href = "/";
        },
        onError: (ctx) => {
          const errorMessage = ctx?.error?.message || "";
          if (
            errorMessage.toLowerCase().includes("invalid") ||
            errorMessage.toLowerCase().includes("credential")
          ) {
            toast.error("Invalid email or password");
          } else {
            toast.error(errorMessage || "Failed to sign in");
          }
          setLoading(false);
        },
      },
    );
  };

  const handleSocialSignIn = (provider: string) => {
    if (provider === "google") {
      startGoogleTransition(async () => {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
          fetchOptions: {
            onSuccess: () => {
              toast.success("Signed in with Google. Redirecting...");
            },
            onError: () => {
              toast.error("Internal server error");
            },
          },
        });
      });
    } else if (provider === "github") {
      startGithubTransition(async () => {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/",
          fetchOptions: {
            onSuccess: () => {
              toast.success("Signed in with github. Redirecting...");
            },
            onError: () => {
              toast.error("Internal server Error");
            },
          },
        });
      });
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="ml-2">
        <Button className="bg-gradient-to-r from-shop_dark_green to-shop_light_green hover:shadow-lg transition-all duration-300">
          Sign In
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md w-[95%] p-0 rounded-2xl border-0 shadow-2xl max-h-[90vh] flex flex-col">
        <div className=" px-6 py-6 sm:px-8">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-shop_dark_green to-shop_light_green bg-clip-text text-transparent">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              {isSignUp
                ? "Join us and start your shopping journey"
                : "Sign in to continue shopping"}
            </p>
          </div>

          <form
            onSubmit={isSignUp ? handleSignup : handleSignIn}
            className="space-y-3"
          >
            {isSignUp && (
              <div>
                <Label className="text-sm mb-1 block">Full Name</Label>
                <Input
                  type="text"
                  placeholder="Layek Miah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                  disabled={isLoading}
                  className="h-10 rounded-lg"
                />
              </div>
            )}

            <div>
              <Label className="text-sm mb-1 block">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-10 rounded-lg"
              />
            </div>

            <div>
              {isSignUp ? (
                <div className="flex items-center gap-2">
                  <div>
                    <Label className="text-sm mb-1 block">Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-10 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-10 rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <Label className="text-sm mb-1 block">Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-10 rounded-lg"
                  />
                </>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 rounded-lg bg-gradient-to-r from-shop_dark_green to-shop_light_green"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Loading...
                </>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative my-5">
            <div className="border-t"></div>
            <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-2 text-xs text-gray-400">
              Or continue
            </span>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => handleSocialSignIn("google")}
              className="w-full h-10 rounded-lg flex items-center justify-center gap-2"
            >
              {pendingGoogle ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Loading...
                </>
              ) : (
                <>
                  {/* Google SVG Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>

                  <span>Continue with Google</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSocialSignIn("github")}
              className="w-full h-10 rounded-lg flex items-center justify-center gap-2"
            >
              {pendingGithub ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Loading...
                </>
              ) : (
                <>
                  <Github className="w-5 h-5" />
                  <span>Continue with GitHub</span>
                </>
              )}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-5 text-center text-xs">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-1 text-shop_dark_green font-semibold"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
