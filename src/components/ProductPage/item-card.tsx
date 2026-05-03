import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DialogDemo } from "./Info-card"
import { Button } from "../ui/button"
import { Bookmark, IndianRupee } from "lucide-react"
import { type Item } from "#/data/types"
import { timeAgo } from "#/utils/utilityFn"
import { Badge } from "../ui/badge"
import { useState } from "react"

export function CardImage(meta : Item) {
  const [fillheart,setFillheart] = useState<boolean>(true);
  return (
    <Card className="relative mx-auto w-full max-w-3xs pt-0 gap-3">
      <div className="relative">
      <img
        src={meta.image_url}
        alt="Event cover"
        className="relative aspect-video w-full object-cover"
        />
        <Badge variant='secondary' className="absolute top-2 left-2 capitalize">
          {meta.category}
        </Badge>
      </div>
      <CardHeader className="px-2">
        <CardTitle className="flex justify-between items-center">
          
          <div className="font-bold flex items-center">
          {meta.price===0 ? undefined : <IndianRupee size='15'/>}
          {meta.price=== 0 ? "Free" : meta.price}
          </div>

          <span className="text-xs md:text-sm text-muted-foreground text-right">
            {timeAgo(meta.created_at)}
          </span>

        </CardTitle>
        <CardDescription className="text-xs text-left md:text-sm">
          {meta.title}
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-between px-2">
        <DialogDemo title={meta.title} description={meta.description} image_url={meta.image_url} userid={meta.user_id}/>
        <Button variant='ghost' size='xs' onClick={()=>{
          setFillheart(!fillheart);
        }}>
          {
          fillheart ?
            <div className="flex justify-center items-center gap-1">
              Save
              <Bookmark/>
            </div>
             : 
             <div className="flex justify-center items-center gap-1">
                Unsave
               <Bookmark fill="red" color="red"/>
             </div>
          }
        </Button>
      </CardFooter>
    </Card>
  )
}

