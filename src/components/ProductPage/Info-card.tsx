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
import {  IndianRupee, MessageCircle } from "lucide-react"

export function DialogDemo(meta : Item) {
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' size={'xs'}>More Info</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {meta.title}
            </DialogTitle>
            <DialogDescription>
              {meta.description}
            </DialogDescription>
              
              <div className="flex items-center gap-1">
                <div> Listed for </div>
                <IndianRupee size='12'/>
                {meta.price}
              </div>
            <div>
              Posted by <b>{meta.user_id}</b>
            </div>
            <div>
              Contact : {meta.user_id}
            </div>
          </DialogHeader>

          <DialogFooter>
            <Button variant='destructive'>
              Report Ad as Sold
            </Button>
            <Button onClick={()=>{
                window.open(meta.user_id,'_blank')
              }}>
                Chat on Whatsapp
                <MessageCircle/>
              </Button>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>

          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
