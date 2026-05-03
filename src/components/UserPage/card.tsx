import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { type Posts } from "#/data/types"
import { timeAgo } from "#/utils/utilityFn"
import { removepostFn } from "#/utils/db"
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"

export function UserPostCard(meta : Posts) {
  return (
    <Card className="relative mx-auto w-full max-w-3xs pt-0 gap-3">
      <div className="relative">
      <img
        src={meta.image_url}
        alt="Event cover"
        className="relative aspect-video w-full object-cover"
        />
      </div>
      <CardHeader className="px-2">
        <CardTitle className="flex-row justify-start gap-4 items-center text-sm">
          <div className="flex gap-1">
            Title:
            <p className="font-normal">
            {meta.title}
            </p>
          </div>
          <div className="flex gap-1">
            Price:<p className="font-normal">Rs. {meta.price}</p>
          </div>
        </CardTitle>
        <CardDescription className="text-xs text-left md:text-sm gap-2">
          <div>
            Description: {' '} {meta.description}
          </div>
          <div>
          {timeAgo(meta.created_at)}
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center flex">

        <Button variant='destructive' onClick={
          async()=>{
            await removepostFn({data : {id :meta.id}})
            toast.info('Deleting Post, refresh to see changes')
        }}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

