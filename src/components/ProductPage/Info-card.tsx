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
import {  MessageCircle, X } from "lucide-react"
import {  useState } from "react"
import { Spinner } from "../ui/spinner"

type usermeta = {
  name : string,
  year : string,
  contact : string,
  email : string
}

export function DialogDemo({title, description, image_url, userid} : {title :string, description :string,image_url:string, userid:string }) {
  const [meta,setMeta] = useState<usermeta | null>(null)
  const [loading,setLoading] = useState<boolean>(true);
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' size={'sm'} onClick={
            async()=>{
              const data =await getuserdata({data : { userid : userid}});
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
            Description: {description}
            </DialogDescription>

            <div>
              Posted by <b>{meta?.name}</b>
            </div>
            <div>
              Year {meta?.year}
            </div>
            <div>
              Contact : {meta?.contact}
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
              <Button variant="outline">
                Close
                <X/>
                </Button>
            </DialogClose>

          </DialogFooter>
        </>
        }
      </DialogContent>
    </Dialog>
  )
}
