"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import logo from "@/app/assets/NoAI.svg";

export default function Navbar() {
  const [loading, setLoading] = useState<"signin" | "signup" | null>(null);

  return (
    <nav className="fixed w-full bg-white border-b z-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Image
              src={logo}
              alt="NoAI Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <Link href="/" className="font-bold text-lg">
              Negotiation.AI
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <Link
                href="/sign-in"
                onClick={() => setLoading("signin")}
                passHref
              >
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  {loading === "signin" ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setLoading("signup")}
                passHref
              >
                <Button
                  className="bg-[#ff914d] hover:bg-orange-400 text-white transition-colors"
                  size="sm"
                >
                  {loading === "signup" ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
