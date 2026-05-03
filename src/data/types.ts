export type User = {
  id : string,
  name : string,
  email : string,
  year: "1" | "2" | "3" | "4";
  contact : string,
  created_at : string
}


export type Item = {
  user_id : string,
  title : string,
  description : string,
  price : number,
  image_url : string,
  category : Category,
  created_at: string;
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

  
export type Filters = {
  categories: Category[];
  price: ('free' | 'priced')[];
}


export type Posts = {
  title: string,
  description: string,
  price: number,
  image_url: string,
  created_at: string,
  category: Category,
  id : string
}