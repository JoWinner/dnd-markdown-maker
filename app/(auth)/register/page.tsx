import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/forms/register-form";
import { Logo } from "@/components/logo";

export default function Register() {
  return (
    <div className="z-10 w-full max-w-md overflow-auto rounded-2xl my-32 bg-[#fffefe] dark:bg-[#141414] border border-border shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-3  px-4 py-4 text-center sm:px-16">
        <Logo />
          <h3 className="text-xl font-semibold">Create an account</h3>
        </div>
        <RegisterForm />
      </div>
  );
}