import { getuserdata } from "#/utils/db"
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
import {  IndianRupee, MessageCircle } from "lucide-react"
import { use, useState } from "react"
import { Spinner } from "../ui/spinner"

type usermeta = {
  name : string,
  year : string,
  contact : string,
  email : string
}

export function DialogDemo({title, description, image_url} : {title :string, description :string,image_url :string }) {
  const [meta,setMeta] = useState<usermeta | null>(null)
  const [loading,setLoading] = useState<boolean>(true);
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' size={'xs'} onClick={
            async()=>{
              const data =await getuserdata();
              setLoading(false);
              setMeta(data)
            }
          }>More Info</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          { loading ?
          <>
          <p className="text-sm text-muted-foreground">Loading...</p>
            <Spinner/>
          </> 
            : 
          <>
          <DialogHeader>
            <DialogTitle>
                {title}
            </DialogTitle>
            <img
            src={image_url}
            alt="Event cover"
            className="relative aspect-square w-full object-cover rounded-xl"
            />
            <DialogDescription>
              {description}
            </DialogDescription>

            <div>
              Posted by <b>{meta?.name}</b>
            </div>
            <div>
              <b>Year</b> {meta?.year}
            </div>
            <div>
              <b>Contact</b> : {meta?.contact}
            </div>
          </DialogHeader>

          <DialogFooter>
            <Button variant='destructive'>
              Report Ad as Sold
            </Button>
            <Button onClick={()=>{
                window.open(`https://wa.me/91${meta?.contact}`, "_blank")
              }}>
                Chat on Whatsapp
                <MessageCircle/>
              </Button>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>

          </DialogFooter>
        </>
        }
      </DialogContent>
    </Dialog>
  )
}
