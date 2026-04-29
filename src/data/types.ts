export type User = {
  id : string,
  name : string,
  email : string,
  year: "1" | "2" | "3" | "4";
  contact : string,
  created_at : string
}


export type Item = {
  id : string,
  user_id : string,
  title : string,
  desc : string,
  price : number | null,
  image_url : string,
  category : Category,
  is_available : boolean
  created_at: string;
  user? : User,
}

export type Category =
  | "electronics"
  | "accessories"
  | "fashion"
  | "decor"
  | "sports"
  | "books"
  | "health"
  | "other";