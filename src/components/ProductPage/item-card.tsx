import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction
} from "@/components/ui/card"
import { DialogDemo } from "./Info-card"

export type props = {
  Price : string,
  Desc : string,
  Image : string,
  Time : string,
  Link : string,
  Title : string,
  User : user
}

export type user = {
  Name : string,
  Id : string,
  Year : string,
  contact : string
}


export function CardImage(meta : props) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={meta.Image}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          {meta.Time} ago
        </CardAction>
        <CardTitle className="font-bold text-xl">{meta.Price}</CardTitle>
        <CardDescription>
          {meta.Desc}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <DialogDemo {...meta}/>
      </CardFooter>
    </Card>
  )
}

