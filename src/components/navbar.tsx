import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <>
      <nav className="fixed w-full bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="font-bold text-lg">
                Negotiation AI
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton>
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <Link href="#" className="flex items-center">
                        <span>Login</span>
                      </Link>
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                      size="sm"
                    >
                      <Link href="#" className="flex items-center gap-2">
                        <span>Sign Up</span>
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
