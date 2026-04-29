import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type Item } from "#/data/types"
import {  MessageCircle } from "lucide-react"

export function DialogDemo(meta : Item) {
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>More Info</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
                  {meta.title}
            </DialogTitle>
            <DialogDescription>
              {meta.desc}
            </DialogDescription>
            <div>
              Listed for {meta.price}
            </div>
            <div>
              Posted by <b>{meta.user?.Name}</b>, {meta.user?.created_at} year
            </div>
            <div>
              Contact : {meta.user?.contact}
            </div>
          </DialogHeader>

          <DialogFooter>
            <Button variant='destructive'>
              Report Ad as Sold
            </Button>
            {/* <a href={meta.User.contact} target="_blank" rel="noopener noreferrer"> */}
              <Button onClick={()=>{
                window.open(meta.user?.contact,'_blank')
              }}>
                
                Chat on Whatsapp
                <MessageCircle/>
              </Button>
            {/* </a> */}
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>

          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
