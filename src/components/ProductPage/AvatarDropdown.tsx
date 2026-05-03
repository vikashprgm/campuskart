import {
  BadgeCheckIcon,
  icons,
  LogOutIcon,
  ShoppingCart,
  Upload,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "../ui/separator"
import { Link } from "@tanstack/react-router"
type userinfo = {
  name? : string | null,
  email? : string
}
export function DropdownMenuAvatar(meta : userinfo) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-3xs">
        <DropdownMenuGroup>
          <DropdownMenuItem>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <div>
                <div className='font-semibold'>
                  {meta.name}
                </div>
                <div className="text-muted-foreground">
                  {meta.email}
                </div>
              </div>
          </DropdownMenuItem>
          <Separator/>
          <DropdownMenuItem asChild>
            <Link to="/user/profile">
              <User/>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/upload">
              <Upload/>
              Post Ad
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/user/cart">
            <ShoppingCart/>
            Cart
             </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive' asChild>
          <Link to="/logout">
              <LogOutIcon />
              Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
