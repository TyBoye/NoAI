import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/NoAI.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="w-full sticky bg-gray-200">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <Image
                src={Logo}
                alt="Neon.AI Logo"
                width={16}
                height={16}
                className="w-8 h-8"
              />
              <Link href="/" className="font-semibold text-md">
                Negotiation.AI
              </Link>
            </div>
          </div>
          <p className="opacity-70 text-md flex justify-center">
            Negotiation AI. &copy; {currentYear} All Rights Reserved.
          </p>
          <span className="font-sm flex justify-center gap-2 ">
            <Link href="#">Privacy Policy</Link>|<Link href="#"> Terms</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
