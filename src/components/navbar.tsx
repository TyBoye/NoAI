import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import logo from '@/app/assets/NoAI.svg';

export default function Navbar() {
  return (
    <>
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
            <div className="">
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
                      className="bg-[#ff914d] hover:bg-orange-600 text-white transition-colors"
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
