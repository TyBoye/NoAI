import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen top-8 bg-gray-100">
      <SignUp />
    </div>
  );
}
