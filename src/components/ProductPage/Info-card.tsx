import { getuserdata, reportadFn } from "#/utils/db"
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
import {  X } from "lucide-react"
import {  useState } from "react"
import { Spinner } from "../ui/spinner"
import WhatsAppOrionIcon from "../Icons/whatsapp"
import { Separator } from "../ui/separator"
import { toast } from "sonner"

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
            <DialogTitle className="font-semibold">
                {title}
            </DialogTitle>
            <Separator/>
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
              Year: {yearformat(meta?.year)}
            </div>
            <div>
              Contact : {meta?.contact}
            </div>
          </DialogHeader>

          <DialogFooter>
            <Button variant='destructive' onClick={
              async()=>{
                const res = await reportadFn({data : {id : userid}})
                if(res.success){
                  toast.success("Reported ad, for more help contact us")
                }
                else{
                  toast.info("We're solving your issue")
                }
              }
            }>
              Report Ad
            </Button>
            <Button onClick={()=>{
                window.open(`https://wa.me/91${meta?.contact}`, "_blank")
              }}>
                Chat on Whatsapp
                <WhatsAppOrionIcon/>
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

function yearformat (year : string | undefined){
  const s = ["1st" , "2nd", "3rd", "4th"];
  return s[parseInt(year ?? "1")-1] ?? null;
}