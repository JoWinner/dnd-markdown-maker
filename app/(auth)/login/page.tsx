import Image from "next/image";
import LoginForm from "@/components/forms/login-form"
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Logo } from "@/components/logo";

export default async function Login() {
  const session = await getServerSession(authOptions);
  return (
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl  bg-[#fffefe] dark:bg-[#141414] border border-border shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-3  px-4 py-4 text-center sm:px-16">
          <Logo />
          <h3 className="text-xl font-semibold">Sign In</h3>
        </div>
        <LoginForm session={session} />
      </div>
  );
}