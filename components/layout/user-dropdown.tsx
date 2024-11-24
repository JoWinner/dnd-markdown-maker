"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Icons } from "@/components/icons";
import Popover from "@/components/shared/popover";
import { Session } from "next-auth";
import Link from "next/link";
import { UserAvatar } from "../shared/user-avatar";
import { Button } from "../ui/button";

export default function UserDropdown({ session }: { session: Session }) {
  const { email, subscriptionId } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-popover p-2 sm:w-56">
            <div className="p-2">
              {session?.user?.name && (
                <p className="truncate text-sm font-medium text-popover-foreground">
                  {session?.user?.name}
                </p>
              )}
              <p className="truncate text-sm text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
            <button
                  className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-accent hover:text-accent-foreground"
                  disabled
                >
                  <Icons.dashboard className="h-4 w-4" />
                  <Link href="/dashboard" className="text-sm">
                    Dashboard
                  </Link>
                </button>
                <button
                  className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-accent hover:text-accent-foreground"
                  disabled
                >
                  <Icons.post className="h-4 w-4" />
                  <Link href="/editor" className="text-sm">
                    Editor
                  </Link>
                </button>

            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-accent hover:text-accent-foreground"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <Icons.logout className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
       <Button variant="outline" size="icon"
          onClick={() => setOpenPopover(!openPopover)}
        >
          <UserAvatar className="h-8 w-8" />
        </Button>
      </Popover>
    </div>
  );
}
