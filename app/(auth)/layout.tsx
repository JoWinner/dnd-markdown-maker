import * as React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return (
    <>
      <div className="relative w-full bg-background">
        <div className="fixed inset-0 mx-0 max-w-none overflow-hidden">

        <div className="flex h-auto min-h-screen w-full items-center justify-center">
          {children}
        </div>
      </div>
      </div>
    </>
  );
}
