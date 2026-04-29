import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"

const data:string[] = [
    "LeBron James showed interest in your Order",
    "James Harden showed interest in your Order",
    "Your Item Electric Guitar is Posted",

    "LeBron James showed interest in your Order",
    "James Harden showed interest in your Order",
    "Your Item Electric Guitar is Posted",

    "LeBron James showed interest in your Order",
    "James Harden showed interest in your Order",
    "Your Item Electric Guitar is Posted"
]

export function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon-lg'>
          <Bell/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='overflow-scroll h-60 w-3xs md:w-xs'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {data.map((e)=>
          <div>
            <DropdownMenuItem>
              {e}
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
          </div>
          )}
        </DropdownMenuGroup>        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
