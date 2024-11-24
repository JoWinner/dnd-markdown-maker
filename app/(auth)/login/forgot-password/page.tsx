import Image from "next/image";
import Link from "next/link";
import ForgotPasswordForm from "@/components/forms/forgot-password-form";
import { Logo } from "@/components/logo";

export default function ForgotPassword() {
  return (
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl bg-[#fffefe] dark:bg-[#141414] border border-border shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-3 px-4 py-4 text-center sm:px-16">
          <Logo />
          <h3 className="text-xl font-semibold">Password Reset</h3>
          <p className="text-sm text-gray-500">
            Enter your email to receive a reset link
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
  );
}