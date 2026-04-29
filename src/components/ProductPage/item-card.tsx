import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction
} from "@/components/ui/card"
import { DialogDemo } from "./Info-card"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { type Item } from "#/data/types"

export function CardImage(meta : Item) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={meta.image_url}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          {meta.created_at} ago
        </CardAction>
        <CardTitle className="font-bold text-xl">{meta.price}</CardTitle>
        <CardDescription>
          {meta.desc}
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
        <DialogDemo {...meta}/>
        <Button variant='ghost'>
          Save to List
          <ShoppingCart/>
        </Button>
      </CardFooter>
    </Card>
  )
}

