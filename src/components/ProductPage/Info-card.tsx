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
import { type props } from "./item-card"
import {  MessageCircle } from "lucide-react"
export function DialogDemo(meta : props) {
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">More Info</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
                  {meta.Title}
            </DialogTitle>
            <DialogDescription>
              {meta.Desc}
            </DialogDescription>
            <img src={meta.Image} className="aspect-square w-full object-cover"/>
            <div>
              Listed for {meta.Price}
            </div>
            <div>
              Posted by <b>{meta.User.Name}</b>, {meta.User.Year} year
            </div>
            <div>
              Contact : {meta.User.contact}
            </div>
          </DialogHeader>

          <DialogFooter>
            <Button variant='destructive'>
              Report Ad as Sold
            </Button>
            {/* <a href={meta.User.contact} target="_blank" rel="noopener noreferrer"> */}
              <Button onClick={()=>{
                window.open(meta.User.contact,'_blank')
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
