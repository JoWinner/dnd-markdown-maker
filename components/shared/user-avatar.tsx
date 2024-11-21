import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

export function UserAvatar({ ...props }: AvatarProps) {
  return (
    <Avatar {...props}>
        <AvatarFallback>
          <Icons.user className="h-6 w-6" />
        </AvatarFallback>
    </Avatar>
  )
}
